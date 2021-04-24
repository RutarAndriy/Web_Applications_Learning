// Необхідні змінні
let last_doctor_id = 0;
let doctors_list = new Array();

// Клас - лікар
class Doctor {

    constructor (name, age, hospital, id) {
    
        this.id = id;
        this.age = age;
        this.name = name;
        this.hospital = hospital;
        
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_doctor_id;  }
        if (age === "" ||
            typeof age      === 'undefined') { this.age      = "Не встановлено";  }
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідомий лікар"; }
        if (hospital === "" ||
            typeof hospital === 'undefined') { this.hospital = "Не встановлено";  }
    
    }
}

// ...............................................................................................

// Додавання нового лікаря
function add_doctor (name, age, hospital, id) {

    let doctor = new Doctor(name, age, hospital, id);
    doctors_list.push(doctor);

    return doctor;

}

// Видалити лікаря з колекції
function remove_doctor (id) {

    for (let z = 0; z < doctors_list.length; z++) {

        let doctor = doctors_list[z];
        if (doctor.id === id) { doctors_list.splice(z, 1);
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх лікарів
function get_doctors_list()
    { return doctors_list; }

// Задаємо список усіх лікарів
function set_doctors_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_doctor(element.name,
                   element.age,
                   element.hospital,
                   element.id);
    }
}

// Повертає лікаря по його id
function get_doctor_by_id (id) {

    for (let z = 0; z < doctors_list.length; z++) {

        let doctor = doctors_list[z];
        if (doctor.id === id) { return doctor; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати лікаря в колекції
function edit_doctor (id, new_name, new_age, new_hospital) {

    for (let z = 0; z < doctors_list.length; z++) {

        let doctor = doctors_list[z];

        if (doctor.id === id) { doctor.age = new_age;
                                doctor.name = new_name;
                                doctor.hospital = new_hospital;
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти лікаря в колекції
function find_doctors (search) {

    let result = [];
    search = search.toLowerCase();

    for (let doctor of doctors_list) {

        let attributes = [ doctor.name,
                           doctor.hospital ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(doctor);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список лікарів
function print_doctors_list() {

    console.log("\n" + "Список усіх лікарів:");

    for (let z = 0; z < doctors_list.length; z++) {

        let doctor = doctors_list[z];
        console.log("\t" + "П.І.Б. лікаря: " + doctor.name);
        console.log("\t" + "Вік лікаря: "    + doctor.age);
        console.log("\t" + "Лікарня: "       + doctor.hospital);
        console.log("\t" + "ID: "            + doctor.id);

    }
}