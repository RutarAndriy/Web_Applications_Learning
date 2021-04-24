// Необхідні змінні
let last_patient_id = 0;
let patients_list = new Array();
let cured_patients_list = new Array();

// Клас - пацієнт
class Patient {

    // Конструктор класу
    constructor (name, age, doctor, hospital, id) {
    
        this.id = id;
        this.age = age;
        this.name = name;
        this.doctor = doctor;
        this.hospital = hospital;
        
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_patient_id;   }
        if (age === "" ||
            typeof age      === 'undefined') { this.age      = "Не встановлено";    }
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідомий пацієнт"; }
        if (doctor === "" ||
            typeof doctor   === 'undefined') { this.doctor   = "Не призначено";     }
        if (hospital === "" ||
            typeof hospital === 'undefined') { this.hospital = "Не встановлено";    }
    
    }
}

// ...............................................................................................

// Додавання нового пацієнта
function add_patient (name, age, doctor, hospital, id) {

    let patient = new Patient(name, age, doctor, hospital, id);
    patients_list.push(patient);

    return patient;

}

// Додавання нового виписаного пацієнта
function add_cured_patient (name, age, doctor, hospital, id) {

    let patient = new Patient(name, age, doctor, hospital, id);
    cured_patients_list.push(patient);

    return patient;

}

// Видалити пацієнта з колекції
function remove_patient (id) {

    for (let z = 0; z < patients_list.length; z++) {

        let patient = patients_list[z];
        if (patient.id === id) { cured_patients_list.push(patient);
                                 patients_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// Видалити виписаного пацієнта з колекції
function remove_cured_patient (id) {

    for (let z = 0; z < cured_patients_list.length; z++) {

        let patient = cured_patients_list[z];
        if (patient.id === id) { cured_patients_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх пацієнтів
function get_patients_list (cured) {

    if (cured) { return cured_patients_list; }
    else       { return patients_list; }

}

// Задаємо список усіх пацієнтів
function set_patients_list (data, cured) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {

        if (cured) {
            add_cured_patient(element.name,
                              element.age,
                              element.doctor,
                              element.hospital,
                              element.id);
        }

        else {
            add_patient(element.name,
                        element.age,
                        element.doctor,
                        element.hospital,
                        element.id);
        }
    }
}

// Повертає пацієнта по його id
function get_patient_by_id (id, cured) {

    let list = cured ? cured_patients_list : patients_list;

    for (let z = 0; z < list.length; z++) {

        let patient = list[z];
        if (patient.id === id) { return patient; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати лікаря в колекції
function edit_patient (id, new_name, new_age, new_doctor, new_hospital) {

    for (let z = 0; z < patients_list.length; z++) {

        let patient = patients_list[z];

        if (patient.id === id) { patient.age = new_age;
                                 patient.name = new_name;
                                 patient.doctor = new_doctor;
                                 patient.hospital = new_hospital;
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти лікаря в колекції
function find_patients (search, cured) {

    let result = [];
    let list = cured ? cured_patients_list : patients_list;

    search = search.toLowerCase();

    for (let patient of list) {

        let attributes = [ patient.name,
                           patient.doctor,
                           patient.hospital ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(patient);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список пацієнтів
function print_patients_list (cured) {

    let type = cured ? "виписаних " : "";
    let list = cured ? cured_patients_list : patients_list;

    console.log("\n" + "Список усіх " + type + "пацієнтів:");

    for (let z = 0; z < list.length; z++) {

        let item = list[z];
        console.log("\t" + "П.І.Б. пацієнта: " + item.name);
        console.log("\t" + "Вік пацієнта: "    + item.age);
        console.log("\t" + "Лікар: "           + item.doctor);
        console.log("\t" + "Лікарня: "         + item.hospital);
        console.log("\t" + "ID: "              + item.id);

    }
}