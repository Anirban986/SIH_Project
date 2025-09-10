const express =require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const { Student, Parent, Teacher, Institution, Admin } = require("./users");



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const { Verification_Email_Template } = require("../emails/varification");
const { Welcome_Email_Template } = require("../emails/welcome");


   const sendverificationcode=async(email,verificationcode)=>{
    try{
    const response = await transporter.sendMail({
    from: `"Disastra verification service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Disastraverification",
    text: "Disastra verification", 
    html:  Verification_Email_Template(verificationcode)
  });

  console.log("Message sent sucessfully");
} 
catch(err){
  console.log(err);
}}

const sendWelcomeEmail = async (email, name) => {
  await transporter.sendMail({
    from: `"Disastra Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Disastra",
    html: Welcome_Email_Template(name)
  });
};

const verifyemailstudent=async(email , otp)=>{
  try{
  //const{email, code}=req.body;
  const student=await Student.findOne({
    email
  })


if(student.otp!==otp){
return { success: false, message: "Email not found" };}

 student.isverified=true;
 student.otp=undefined
 await student.save();

 await sendWelcomeEmail(student.email, student.name || "User");
// return res.status(200).json({ error: "Email registered successfully" });
return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
}




const verifyemailparent=async(email , otp)=>{
  try{
  //const{email, code}=req.body;
  const parent=await Parent.findOne({
    email
  })


if(parent.otp!==otp){
return { success: false, message: "Email not found" };}

 parent.isverified=true;
 parent.otp=undefined
 await parent.save();

 await sendWelcomeEmail(parent.email, parent.name || "User");
// return res.status(200).json({ error: "Email registered successfully" });
return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
}


const verifyemailteacher = async (email, otp) => {
  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return { success: false, message: "Email not registered" };
    }

    
    if (teacher.otp.toString().trim() !== otp.toString().trim()) {
      console.log("OTP mismatch:", { dbOtp: teacher.otp, enteredOtp: otp });
      return { success: false, message: "OTP does not match" };
    }

    teacher.isverified = true;
    teacher.otp = undefined;
    await teacher.save();

    await sendWelcomeEmail(teacher.email, teacher.name || "User");

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};






module.exports={ sendverificationcode, verifyemailstudent,verifyemailparent,verifyemailteacher };



