// Функція повертає найбільший спільний дільник двох додатних чисел
function get_Greatest_Common_Divisor (num_1, num_2) {
    
    let temp;
    let result = -1;

    while (num_2 != 0) {
        temp = num_2;
        num_2 = num_1 % num_2;
        num_1 = temp;
    }

    result = num_1;
    return result;
}

console.log(`НСД чисел 84 та 126 = ${get_Greatest_Common_Divisor(84, 126)}`);
console.log(`НСД чисел 37 та 16 = ${get_Greatest_Common_Divisor(37, 16)}`);
console.log(`НСД чисел 128 та 4096 = ${get_Greatest_Common_Divisor(128, 4096)}`);

// Посилання на алгоритм у вікіпедії
// https://uk.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%95%D0%B2%D0%BA%D0%BB%D1%96%D0%B4%D0%B0