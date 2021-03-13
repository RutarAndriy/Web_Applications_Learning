const mod = require('custom_module');

// Додавання лікарень
let h1 = mod.add_Hospital("Hospital_1", "Test address 1");
let h2 = mod.add_Hospital("Hospital_2", "Test address 2");
let h3 = mod.add_Hospital("Hospital_3", "Test address 3");

// Список лікарень
mod.get_Hospitals_List();

// Видалення лікарень
console.log("Видалення лікарні: Hospital_2");
mod.remove_Hospital("Hospital_2", "Test address 2");

// Список лікарень
mod.get_Hospitals_List();

// Зміна лікарень
console.log("Зміна лікарні: Hospital_3");
mod.edit_Hospital("Hospital_3", "Test address 3", "New hospital name", "New address");

// Список лікарень
mod.get_Hospitals_List();

// Пошук лікарень
let hosp1 = mod.find_Hospital("Hospital_1", "Test address 1");
console.log(`Пошук лікарні Hospital_1: ${hosp1 !== -1 ? "знайдено" : "не знайдено"}`);
let hosp2 = mod.find_Hospital("Hospital_7", "Test address 7");
console.log(`Пошук лікарні Hospital_7: ${hosp2 !== -1 ? "знайдено" : "не знайдено"}`);

////////////////////////////////////////////////////////////////////////////////////

// Додавання лікарів
mod.add_Doctor("Петро Іванович", 87, hosp1);
mod.add_Doctor("Андрій Богданович", 43, hosp1);
mod.add_Doctor("Оксана Петрівна", 19, hosp1);

// Список лікарів у лікарні Hospital_1
mod.get_Doctors_List(hosp1);

// Видалення лікарів
console.log("Видалення лікарів: Андрій Богданович");
mod.remove_Doctor("Андрій Богданович", 43, hosp1);

// Список лікарів у лікарні Hospital_1
mod.get_Doctors_List(hosp1);

// Редагування лікарів
console.log("Редагування лікарів: Петро Іванович");
mod.edit_Doctor("Петро Іванович", 87, hosp1, "Ігор Олегович", 37);

// Список лікарів у лікарні Hospital_1
mod.get_Doctors_List(hosp1);

// Пошук лікарів
let doc1 = mod.find_Doctor("Оксана Петрівна", 19, hosp1);
console.log(`Пошук лікаря - Оксана Петрівна: ${hosp1 !== -1 ? "знайдено" : "не знайдено"}`);
let doc2 = mod.find_Doctor("Ольга Михайлівна", 24, hosp1);
console.log(`Пошук лікаря - Ольга Михайлівна: ${hosp2 !== -1 ? "знайдено" : "не знайдено"}`);

////////////////////////////////////////////////////////////////////////////////////

// Додавання пацієнтів
mod.add_Patient("А. Фролов", 13, hosp1);
mod.add_Patient("Ю. Остапчук", 29, hosp1);
mod.add_Patient("Г. Сковорода", 103, hosp1);

// Список пацієнтів у лікарні Hospital_1
mod.get_Patients_List(hosp1);

// Виписування пацієнтів
console.log("Виписування пацієнтів: А. Фролов");
mod.remove_Patient("А. Фролов", 13, hosp1);

// Список пацієнтів у лікарні Hospital_1
mod.get_Patients_List(hosp1);

// Редагування пацієнтів
console.log("Редагування пацієнтів: Г. Сковорода");
mod.edit_Patient("Г. Сковорода", 103, hosp1, "О. Хітинська", 54);

// Список пацієнтів у лікарні Hospital_1
mod.get_Patients_List(hosp1);

// Пошук пацієнтів
let pat1 = mod.find_Patient("Ю. Остапчук", 29, hosp1);
console.log(`Пошук пацієнта - Ю. Остапчук: ${hosp1 !== -1 ? "знайдено" : "не знайдено"}`);
let pat2 = mod.find_Patient("О. Біда", 32, hosp1);
console.log(`Пошук пацієнта - О. Біда: ${hosp2 !== -1 ? "знайдено" : "не знайдено"}`);

// Інструкція написання власних модулів для node.js
// https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module-ru

// Використвуємо Node.js, Require та Exports
// https://habr.com/ru/post/217901/
