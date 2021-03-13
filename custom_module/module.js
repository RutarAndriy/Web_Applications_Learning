// Підключаємо необхідні файли
const hospital = require("./hospital");
const doctor   = require("./doctor");
const patient  = require("./patient");

// Доступні операції з лікарнями
exports.find_Hospital      = hospital.find_Hospital;
exports.add_Hospital       = hospital.add_Hospital;
exports.remove_Hospital    = hospital.remove_Hospital;
exports.edit_Hospital      = hospital.edit_Hospital;
exports.get_Hospitals_List = hospital.get_Hospitals_List;

// Доступні операції з лікарями
exports.find_Doctor        = doctor.find_Doctor;
exports.add_Doctor         = doctor.add_Doctor;
exports.remove_Doctor      = doctor.remove_Doctor;
exports.edit_Doctor        = doctor.edit_Doctor;
exports.get_Doctors_List   = doctor.get_Doctors_List;

// Доступні операції з пацієнтами
exports.find_Patient       = patient.find_Patient;
exports.add_Patient        = patient.add_Patient;
exports.remove_Patient     = patient.remove_Patient;
exports.edit_Patient       = patient.edit_Patient;
exports.get_Patients_List  = patient.get_Patients_List;
