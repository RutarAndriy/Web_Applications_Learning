// Клас - лікарня
class Hospital {

    constructor (name, address) {
    
        this.name = name;
        this.address = address;
        this.doctors_list = [];
        this.patients_list = [];
    
        if (typeof name === 'undefined')    { this.name = "Невідома лікарня"; }
        if (typeof address === 'undefined') { this.address = "Невідомий адрес"; }
    
    }
    
}

// Список усіх лікарень
let global_hospitals_list = new Array();

// Знайти лікарню в колекції
function find_Hospital (name, address) {

    for (let hospital of global_hospitals_list) {

        if (name === hospital.name &&
            address === hospital.address) { return hospital; }

    }

    return -1;

}

// Додавання нової лікарні
function add_Hospital (name, address) {

    let hospital = new Hospital(name, address);
    global_hospitals_list.push(hospital);

    return hospital;

}

// Видалити лікарню з колекції
function remove_Hospital (name, address) {

    for (let id = 0; id < global_hospitals_list.length; id++) {

        let hospital = global_hospitals_list[id];

        if (hospital.name === name &&
            hospital.address === address) { global_hospitals_list.splice(id, 1);
                                            return 1; }

    }

    return -1;

}

// Редагувати лікарню в колекції
function edit_Hospital (name, address, new_name, new_address) {

    for (let id = 0; id < global_hospitals_list.length; id++) {

        let hospital = global_hospitals_list[id];

        if (hospital.name === name &&
            hospital.address === address) { global_hospitals_list[id].name = new_name;
                                            global_hospitals_list[id].address = new_address;
                                            return 1; }

    }

    return -1;

}

// Отримати список лікарень
function get_Hospitals_List() {

    console.log("\n" + "Список усіх лікарень:");

    for (let id = 0; id < global_hospitals_list.length; id++) {

        let hosp = global_hospitals_list[id];
        console.log(`Назва лікарні: ${hosp.name}, адреса лікарні: ${hosp.address}`);

    }

    console.log();
    
    return global_hospitals_list;

}

// Експортуємо функції
exports.find_Hospital      = find_Hospital;
exports.add_Hospital       = add_Hospital;
exports.remove_Hospital    = remove_Hospital;
exports.edit_Hospital      = edit_Hospital;
exports.get_Hospitals_List = get_Hospitals_List;
