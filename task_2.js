// Функція повертає кількість варіантів перестановки слів
function get_Word_Permutation_Count (data) {

    let count = data.length;
    let result = 1;

    // Кількість варіантів перестановки слів = !n
    for (let z = 2; z <= count; z++) {
        result *= z;
    }

    return result;
}

let data_1 = [ "Кіт", "Собака", "Кінь" ];
let data_2 = [ "Яблуко", "Груша", "Слива", "Вишня" ];
let data_3 = [ "Хліб", "Сир", "Йогурт", "Ковбаса", "Риба" ];

let result_1 = get_Word_Permutation_Count(data_1);
let result_2 = get_Word_Permutation_Count(data_2);
let result_3 = get_Word_Permutation_Count(data_3);

console.log(`Кількість варіантів перестановки для слів: <${data_1}> - ${result_1}`);
console.log(`Кількість варіантів перестановки для слів: <${data_2}> - ${result_2}`);
console.log(`Кількість варіантів перестановки для слів: <${data_3}> - ${result_3}`);