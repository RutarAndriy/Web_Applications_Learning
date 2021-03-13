// Клас - лікар
class Doctor {

    constructor (name, age) {
    
        this.name = name;
        this.age = age;
    
        if (typeof name === 'undefined') { this.name = "Невідомий лікар"; }
    
    }
    
}

// Знайти лікаря в лікарні
function find_Doctor (name, age, hospital) {

    for (let id = 0; id < hospital.doctors_list.length; id++) {

        let doctor = hospital.doctors_list[id];

        if (name === doctor.name &&
            age === doctor.age) { return doctor; }

    }

    return -1;

}

// Додавання нового лікаря
function add_Doctor (name, age, hospital) {

    let doctor = new Doctor(name, age);
    hospital.doctors_list.push(doctor);

    return doctor;

}

// Видалення лікаря з лікарні
function remove_Doctor (name, age, hospital) {

    let doctor = find_Doctor(name, age, hospital);

    if (doctor === -1) { return -1; }

    let id = hospital.doctors_list.indexOf(doctor);
    hospital.doctors_list.splice(id, 1);

    return 1;

}

// Редагувати лікаря в лікарні
function edit_Doctor (name, age, hospital, new_name, new_age) {

    let doctor = find_Doctor(name, age, hospital);

    if (doctor === -1) { return -1; }

    let id = hospital.doctors_list.indexOf(doctor);
    
    hospital.doctors_list[id].name = new_name;
    hospital.doctors_list[id].age = new_age;

    return 1;

}

// Отримати список лікарів у конкретній лікарні
function get_Doctors_List (hospital) {

    console.log("\n" + `Список усіх лікарів у лікарні ${hospital.name}:`);

    for (let id = 0; id < hospital.doctors_list.length; id++) {

        let doctor = hospital.doctors_list[id];
        console.log(`\tІм'я лікаря: ${doctor.name}, вік: ${doctor.age}`);

    }

    console.log();
    
    return hospital.doctors_list;

}

// Експортуємо функції
exports.find_Doctor      = find_Doctor;
exports.add_Doctor       = add_Doctor;
exports.remove_Doctor    = remove_Doctor;
exports.edit_Doctor      = edit_Doctor;
exports.get_Doctors_List = get_Doctors_List;
