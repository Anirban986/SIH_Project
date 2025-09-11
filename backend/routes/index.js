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
const { sendverificationcode, verifyemailstudent, verifyemailparent, verifyemailteacher } = require("./mailer");



/*router.get('/', function (req, res) {
  res.render('index', { title: "Debasish" });
});
*/

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}


//----------------------------------------register student--------------------------------------------------------




router.post("/register/student", async (req, res) => {
  try {

    const { name, username, email, password, institutionName } = req.body;


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

    res.status(201).json({
      message: "Student registered successfully! Check your email for OTP.",
      email,
      userType: "student"
    });



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
    const { email, otp } = req.body;
    const result = await verifyemailstudent(email, otp); // pass req & res directly

    if (result.success) {
      res.send("Email verified successfully! You can now login.");
    } else {
      res.render("verifyotp", { email, userType: "student", error: result.message });
    }
  }
  catch (err) {
    res.render("verifyotp", { email: req.body.email, error: "Internal server error" });
  }
});



//-----------------------------------log in student----------------------------




// POST /login/student
router.post("/login/student", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email }).populate("institution");
    if (!student) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
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

    // send token as JSON
    res.json({ message: "Login successful", token, name: student.name,  role: "student" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



router.get("/profile/student", authenticateToken, (req, res) => {
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





router.post("/register/parent", async (req, res) => {
  try {
    const { name, email, password, studentEmail } = req.body;

    // Check if parent already exists
    let existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ error: "Parent already registered" });
    }

    // Check if student exists
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Hash password and generate OTP
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

    // Return JSON instead of rendering
    res.status(200).json({ message: "Parent registered successfully. Please verify OTP.", email });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Something went wrong during registration" });
  }
});





//-------------------------------------------parent login--------------------------------------------



// ---------------- Parent Login ----------------
router.post("/login/parent", async (req, res) => {
  try {
    const { email, password } = req.body;

    const parent = await Parent.findOne({ email }).populate("children");
    if (!parent) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
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

    // Send JSON instead of redirect
    res.json({
      message: "Login successful",
      token,
      name: parent.name,
      role: "parent",
      student: parent.children.length ? parent.children[0].name : null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------------- Parent Profile ----------------
router.get("/profile/parent", authenticateToken, (req, res) => {
  if (req.user.role !== "parent") {
    return res.status(403).json({ error: "Access Denied" });
  }

  res.json({
    name: req.user.name,
    student: req.user.student,
    role: "parent"
  });
});


//-------------------------------------logout---------------------------------------
router.get("/logout/parent", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/parent");
});






//------------------------------------Teacher Registration-------------------------------------------



router.post("/register/teacher", async (req, res) => {
  try {
    const { name, email, password, institutionName, institutionCode } = req.body;

    // Check if teacher already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const institution = await Institution.findOne({ name: institutionName });
    if (!institution) {
      return res.status(404).json({ error: "Institution not found. Ask admin to register it first." });
    }

    if (institution.code !== institutionCode) {
      return res.status(400).json({ error: "Institution code does not match" });
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

    // ✅ Send JSON response
    res.status(201).json({
      message: "Teacher registered successfully! Check your email for OTP.",
      email,
      userType: "teacher"
    });

  } catch (err) {
    console.error("Teacher registration error:", err);
    res.status(500).json({ error: "Something went wrong during registration" });
  }
});


//----------------------------------------------login teacher------------------------------------

/*router.get("/login/teacher", (req, res) => {
  res.render("login", { error: null, userType: "teacher" });
});*/


router.post("/login/teacher", async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email }).populate("institution");
    if (!teacher) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
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

    // Send JSON instead of redirect
    res.json({
      message: "Login successful",
      token,
      name: teacher.name,
      role: "teacher",
      institution: teacher.institution ? teacher.institution.name : null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



router.get("/profile/teacher", authenticateToken, (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).json({ error: "Access Denied" });

  res.json({
    name: req.user.name,
    institution: req.user.institution,
    role: "teacher"
  });
});


//---------------------------------logout teacher------------------

router.get("/logout/teacher", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/teacher");
});


// ------------------------------ Register Admin ------------------
router.post("/register/admin", async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    if (!secret || secret.trim() !== process.env.ADMIN_SECRET.trim()) {
      return res.status(403).json({ error: "Unauthorized: Invalid secret key" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).json({ error: "Error registering admin" });
  }
});


// ------------------------------ Login Admin ------------------
router.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
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

    res.status(200).json({
      message: "Login successful",
      token,
      name: admin.name,
      email: admin.email,
       role: "admin"
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Something went wrong during login" });
  }
});


// ------------------------------ Admin Profile ------------------
router.get("/profile/admin", authenticateToken, (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied" });
  }

  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});


// ------------------------------ Get All Admins ------------------
router.get("/all-admins", authenticateToken, isAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // hide password
    res.status(200).json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ error: "Error fetching admins" });
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
