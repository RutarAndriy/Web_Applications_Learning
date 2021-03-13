// Клас - пацієнт
class Patient {

    // Конструктор класу
    constructor (name, age) {
    
        this.name = name;
        this.age = age;
    
        if (typeof name === 'undefined') { this.name = "Невідомий пацієнт"; }
    
    }
    
}

// Знайти пацієнта в лікарні
function find_Patient (name, age, hospital) {

    for (let id = 0; id < hospital.patients_list.length; id++) {

        let patient = hospital.patients_list[id];

        if (name === patient.name &&
            age === patient.age) { return patient; }

    }

    return -1;

}

// Додавання нового пацієнта
function add_Patient (name, age, hospital) {

    let patient = new Patient(name, age);
    hospital.patients_list.push(patient);

    return patient;

}

// Виписування пацієнта з лікарні
function remove_Patient (name, age, hospital) {

    let patient = find_Patient(name, age, hospital);

    if (patient === -1) { return -1; }

    let id = hospital.patients_list.indexOf(patient);
    hospital.patients_list.splice(id, 1);

    return 1;

}

// Редагувати пацієнта в лікарні
function edit_Patient (name, age, hospital, new_name, new_age) {

    let patient = find_Patient(name, age, hospital);

    if (patient === -1) { return -1; }

    let id = hospital.patients_list.indexOf(patient);
    
    hospital.patients_list[id].name = new_name;
    hospital.patients_list[id].age = new_age;

    return 1;

}

// Отримати список пацієнтів у конкретній лікарні
function get_Patients_List (hospital) {

    console.log("\n" + `Список усіх пацієнтів у лікарні ${hospital.name}:`);

    for (let id = 0; id < hospital.patients_list.length; id++) {

        let patient = hospital.patients_list[id];
        console.log(`\tІм'я пацієнта: ${patient.name}, вік: ${patient.age}`);

    }

    console.log();
    
    return hospital.patients_list;

}

// Експортуємо функції
exports.find_Patient      = find_Patient;
exports.add_Patient       = add_Patient;
exports.remove_Patient    = remove_Patient;
exports.edit_Patient      = edit_Patient;
exports.get_Patients_List = get_Patients_List;
