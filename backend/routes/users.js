//var express = require('express');
//var router = express.Router();


//const mongoose = require("mongoose");
//mongoose.connect(`mongodb://127.0.0.1:27017/Disastra_DB`);


const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");



const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username:{ type:String, required:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type:Number, required:true, default:0},
  level: { type: String, default:"Bronze" },
  completed:{ type:Number, required:true, default:0},
  isverified:{ type:Boolean, default:false},
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  otp: { type: String },

});

studentSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: {type: String},
  isverified:{type: Boolean, default:false},
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], 
});
parentSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: {type:String},
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
});

teacherSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }, 
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }]
});

const adminSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  super: { type: Boolean, default: false }, 
 
});

const Student = mongoose.model("Student", studentSchema);
const Parent = mongoose.model("Parent", parentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Institution = mongoose.model("Institution", institutionSchema);



module.exports = { Student, Parent, Teacher, Institution, Admin };



