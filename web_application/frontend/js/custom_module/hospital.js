// Необхідні змінні
let last_hospital_id = 0;
let hospitals_list = new Array();

// Клас - лікарня
class Hospital {

    constructor (name, address, id) {
    
        this.id = id;
        this.name = name;
        this.address = address;
        
        if (id === "" ||
            typeof id      === 'undefined') { this.id      = ++last_hospital_id; }
        if (name === "" ||
            typeof name    === 'undefined') { this.name    = "Невідома лікарня"; }
        if (address === "" ||
            typeof address === 'undefined') { this.address = "Не встановлено";   }
   
    }
}

// ...............................................................................................

// Додавання нової лікарні
function add_hospital (name, address, id) {

    let hospital = new Hospital(name, address, id);
    hospitals_list.push(hospital);

    return hospital;

}

// Видалення лікарні з колекції
function remove_hospital (id) {

    for (let z = 0; z < hospitals_list.length; z++) {

        let hospital = hospitals_list[z];
        if (hospital.id === id) { hospitals_list.splice(z, 1);
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх лікарень
function get_hospitals_list()
    { return hospitals_list; }

// Задаємо список усіх лікарень
function set_hospitals_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_hospital(element.name,
                     element.address,
                     element.id);
    }
}

// Повертає лікарню по її id
function get_hospital_by_id (id) {

    for (let z = 0; z < hospitals_list.length; z++) {

        let hospital = hospitals_list[z];
        if (hospital.id === id) { return hospital; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати лікарню в колекції
function edit_hospital (id, new_name, new_address) {

    for (let z = 0; z < hospitals_list.length; z++) {

        let hospital = hospitals_list[z];

        if (hospital.id === id) { hospital.name = new_name;
                                  hospital.address = new_address;
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти лікарню в колекції
function find_hospitals (search) {

    let result = [];
    search = search.toLowerCase();

    for (let hospital of hospitals_list) {

        let attributes = [ hospital.name,
                           hospital.address ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(hospital);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список лікарень
function print_hospitals_list() {

    console.log("\n" + "Список усіх лікарень:");

    for (let z = 0; z < hospitals_list.length; z++) {

        let hospital = hospitals_list[z];
        console.log("\t" + "Назва лікарні: "  + hospital.name);
        console.log("\t" + "Адреса лікарні: " + hospital.address);
        console.log("\t" + "ID: "             + hospital.id);

    }
}