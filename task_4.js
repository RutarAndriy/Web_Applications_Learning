// Функція видаляє усі продубльовані значення з масиву
function remove_Duplicate_Values (array) {

    let duplicates = new Array();
    let result = new Array();

    for (let z = 0; z < array.length; z++) {

        // Отримуємо значення для порівняння
        let value = array[z];

        // Перевіряємо, чи дане значення міститься у масиві дублів
        let not_contains = (duplicates.indexOf(value) === -1) ? true : false;

        // Якщо значення не дублюється, то додаємо його у масиви дублів та результату
        if (not_contains) { result.push(value);
                            duplicates.push(value); }

    }

    return result;

}

let data_1 = [ 1, 2, 3, 1, 4 ];
let data_2 = [ 1, 9, 1, 1, 1, 1, 7, 9];
let data_3 = [ 1, 2, 3, 1, 5, 9, 7, 4, 3, 9, 0];

let result_1 = remove_Duplicate_Values(data_1);
let result_2 = remove_Duplicate_Values(data_2);
let result_3 = remove_Duplicate_Values(data_3);

console.log(`(${data_1}) -> (${result_1})`);
console.log(`(${data_2}) -> (${result_2})`);
console.log(`(${data_3}) -> (${result_3})`);