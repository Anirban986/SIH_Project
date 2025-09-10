var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
 
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user; 
    next();
  });
}



const { Student, Parent, Teacher, Institution, Admin } = require("./users");
const { sendverificationcode, verifyemailstudent, verifyemailparent,verifyemailteacher } = require("./mailer");



router.get('/', function(req, res) {
  res.render('index',{title:"Debasish"}) ;
});


function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}


//----------------------------------------register student--------------------------------------------------------

router.get("/register/student",async(req,res)=>{
  res.render("RegisterStudent");
})


router.post("/register/student", async (req, res) => {
  try {
    
    const { name, username, email, password,institutionName } = req.body;

    
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Email already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();


    let institution = await Institution.findOne({ name: institutionName });
    if (!institution) {
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      institution = new Institution({
        name: institutionName,
        code: randomCode
      });
      await institution.save();
    }
   
    const newStudent = new Student({
      name,
      username,
      email,
      password: hashedPassword,
      institution: institution._id,
      points: 0,
      Level: "Bronze",
      completed: 0,
      otp
    });

   
      await newStudent.save();

   institution.students.push(newStudent._id);
    await institution.save();

   
    await sendverificationcode(email, otp);
   
    res.render("verifyotp", { email , userType:"student" });
 

    //res.redirect("/verify-otp");
  /*res.status(201).json({ 
  message: "Student registered successfully! Verification code sent to email.",
  redirect: "/verify-otp"
});
 */
    //res.status(201).json({ message: "Student registered successfully! Verification code sent to email." });
    
  } catch (err) {
    console.error("Registration error:", err);
    res.render("registerstudent", { error: "Something went wrong during registration" });;
  }
});

router.post("/verify-otp/student", async (req, res) => {
  try {
    const{email,otp}=req.body;
    const result=await verifyemailstudent(email,otp); // pass req & res directly

    if (result.success) {
    res.send("Email verified successfully! You can now login.");
  } else {
    res.render("verifyotp", {email,userType:"student",error: result.message });
  }
  }
   catch (err) {
    res.render("verifyotp", {email: req.body.email, error:"Internal server error"});
  }
});



//-----------------------------------log in student----------------------------


router.get("/login/student", (req, res) => {
  res.render("login", { error: null, userType:"student" });
});


router.post("/login/student", async (req, res) => {
  try {
    const { email, password } = req.body;

     const student = await Student.findOne({ email }).populate("institution");
    if (!student) {
      return res.render("login", { error: "Email not registered", userType:"student" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password",userType:"student" });
    }

    
 const token = jwt.sign(
      {
        id: student._id,
        role: "student",
        name: student.name,
        institute: student.institute ? student.institute.name : null
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile/student");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
});


router.get("/profile/student",authenticateToken, (req, res) => {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).send("Access Denied");
  }

  res.render("profile", {
    name: req.user.name,
    institute: req.user.institute,
    userType: "student"
  });
});
// ---------- LOGOUT ---------------------------------------------------


router.get("/logout/student", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/student");
});




//------------------------------------Parent Registration-----------------------------------------------------------


router.get("/register/parent",async(req,res)=>{
  res.render("registerparent");
})



router.post("/register/parent", async (req, res) => {
  try {
    const { name, email, password, studentEmail } = req.body;

  
    let existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).send("Parent already registered");
    }


    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).send("Student not found");
    }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();


   const parent = new Parent({
      name,
      email,
      password: hashedPassword,
      children: [student._id],
      otp
    });

    await parent.save();


     await sendverificationcode(email, otp);
   
      res.render("verifyotp", { email, userType:"parent" });
 
    } catch (err) {
    console.error("Registration error:", err);
    res.render("registerparent", { error: "Something went wrong during registration" });;
  }
});

router.post("/verify-otp/parent", async (req, res) => {
  try {
    const{email,otp}=req.body;
    const result=await verifyemailparent(email,otp); 

    if (result.success) {
    res.send("Email verified successfully! You can now login.");
  } else {
    res.render("verifyotp", {email,userType:"parent",error: result.message });
  }
  }
   catch (err) {
    res.render("verifyotp", {email: req.body.email, error:"Internal server error"});
  }
});





//-------------------------------------------parent login--------------------------------------------

router.get("/login/parent", (req, res) => {
  res.render("login", { error: null, userType:"parent" });
});

router.post("/login/parent", async (req, res) => {
  try {
    const { email, password } = req.body;

    const parent = await Parent.findOne({ email }).populate("children");
    if (!parent) {
      return res.render("login", { error: "Email not registered", userType:"parent"});
    }

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType:"parent"});
    }

    
      const token = jwt.sign(
      {
        id: parent._id,
        role: "parent",
        name: parent.name,
        email: parent.email,
        student: parent.children.length ? parent.children[0].name : null,

      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile/parent");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
});



router.get("/profile/parent", authenticateToken, (req, res) => {
  if (req.user.role !== "parent") return res.status(403).send("Access Denied");
  res.render("profile", { 
    name: req.user.name, 
    student: req.user.student, 
    userType: "parent" 
  });
});

//-------------------------------------logout---------------------------------------
router.get("/logout/parent", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/parent");
});






//------------------------------------Teacher Registration-------------------------------------------

router.get("/register/teacher", (req, res) => {
  res.render("registerteacher");
});


router.post("/register/teacher", async (req, res) => {
  try {
    const { name, email, password, institutionName, institutionCode } = req.body;

    // Check if teacher already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.render("registerteacher", { error: "Email already registered" });
    }


     const institution = await Institution.findOne({ name: institutionName });
    if (!institution) {
      return res.render("registerteacher", { error: "Institution not found. Ask admin to register it first." });
    }

      if (institution.code !== institutionCode) {
      return res.render("registerteacher", { error: "Institution code does not match" });
    }
  

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save teacher
    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      institution: institution._id,
      otp
    });
   

    await teacher.save();

    institution.teachers = institution.teachers || [];
    institution.teachers.push(teacher._id);
    await institution.save();



      await sendverificationcode(email, otp);
   
      res.render("verifyotp", { email, userType:"teacher" });
 
    } catch (err) {
    console.error("Registration error:", err);
    res.render("registerteacher", { error: "Something went wrong during registration" });;
  }
});

router.post("/verify-otp/teacher", async (req, res) => {
  try {
    const{email,otp}=req.body;
    const result=await verifyemailteacher(email,otp); 

    if (result.success) {
    res.send("Email verified successfully! You can now login.");
  } else {
    res.render("verifyotp", {email,userType:"teacher",error: result.message });
  }
  }
   catch (err) {
    res.render("verifyotp", {email: req.body.email, error:"Internal server error",userType:"teacher"});
  }
});

//----------------------------------------------login teacher------------------------------------

router.get("/login/teacher", (req, res) => {
  res.render("login", { error: null, userType:"teacher" });
});


router.post("/login/teacher", async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email }).populate("institution");
    if (!teacher) {
      return res.render("login", { error: "Email not registered", userType:"teacher"});
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType:"teacher"});
    }


      const token = jwt.sign(
      {
        id: teacher._id,
        role: "teacher",
        name: teacher.name,
        email: teacher.email,
        institution: teacher.institution ? teacher.institution.name : null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });
    
    res.redirect("/profile/teacher");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
});


router.get("/profile/teacher", authenticateToken, (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).send("Access Denied");
  res.render("profile", { 
    name: req.user.name, 
    institute: req.user.institution, 
    userType: "teacher" 
  });
});

//---------------------------------logout teacher------------------

router.get("/logout/teacher", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/teacher");
});


//------------------------------register admin------------------

router.get("/register/admin", (req, res) => {
  res.render("registeradmin");
});



router.post("/register/admin", async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    console.log("Entered secret:", `"${secret}"`);
    console.log("Env secret:", `"${process.env.ADMIN_SECRET}"`);

    if (secret.trim() !== process.env.ADMIN_SECRET.trim()) {
      return res.status(403).send("Unauthorized: Invalid secret key");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.send("Admin registered successfully");
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).send("Error registering admin");
  }
});




//-------------------------------------------login admin-------------------------------



router.get("/login/admin", (req, res) => {
  res.render("login", { error: null, userType: "admin" });
});

router.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.render("login", { error: "Email not registered", userType: "admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType: "admin" });
    }

       const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
        name: admin.name,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile/admin");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong", userType: "admin" });
  }
});


router.get("/profile/admin", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Access Denied");
  res.render("profile", { 
    name: req.user.name, 
    userType: "admin" 
  });
});


//---------------------------------logout admin------------------

router.get("/logout/admin", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/admin");
});



//------------------------------------all admins------------------------------------------------




router.get("/all-admins", authenticateToken, isAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).send("Error fetching admins");
  }
});




// -----------------------------------------------allstudents -----------------------------------
router.get("/all-students", async (req, res) => {
  try {
    const students = await Student.find().populate("institution"); // populate institution if needed
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).send("Error fetching students");
  }
});




//-------------------------------------------------allparents---------------------
//--------------------------------------------------------------------------------
router.get("/all-parents", async (req, res) => {
  try {
    const parents = await Parent.find().populate("children"); 
   
    res.json(parents);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching parents");
  }
});




// ------------------ Get all teachers ------------------
router.get("/all-teachers", async (req, res) => {
  try {
    // Fetch all teachers and populate their institution
    const teachers = await Teacher.find().populate("institution"); 
    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).send("Error fetching teachers");
  }
});


//-------------------------------allinstitutions----------------------------------
// ---------------- ALL INSTITUTIONS -----------------
router.get("/all-institutions", async (req, res) => {
  try {
    const allinstitutions = await Institution.find().populate("students"); 
    
   
    
    res.json(allinstitutions);
  } catch (err) {
    console.error("Error fetching institutions:", err);
    res.status(500).send("Error fetching institutions");
  }
});



//---------------------------------------------empty-database----------------------------
router.get("/delete-all", async (req, res) => {
  try {
    await Student.deleteMany({});
    await Parent.deleteMany({});
    await Teacher.deleteMany({});
    await Institution.deleteMany({});
    await Admin.deleteMany({});

    res.send("All users (students, parents, teachers, institutions, admins) deleted successfully.");
  } catch (err) {
    console.error("Error deleting all users:", err);
    res.status(500).send("Error deleting all users");
  }
});


module.exports = router;
