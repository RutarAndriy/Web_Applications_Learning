// Функція генерує випадковий код паспорта України
// Формат коду: ЛЛЧЧЧЧЧЧ
function generate_Random_Passport_Code() {
    
    // Масив випадкових літер
    let letter_array = [ '\u0413', // Г
                         '\u0414', // Д
                         '\u0417', // З
                         '\u041A', // К
                         '\u041B', // Л
                         '\u041D', // Н
                         '\u0420'  // Р
                       ];
    
    // Готовий результат
    let code = '';
    
    // Цикл генерування коду паспорта
    for (let z = 0; z < 8; z++) {

        // Генеруємо частину коду, залежно від позиції символа
        switch (z) {

            // Генеруємо літери
            case 0:
            case 1:  let random_letter = Math.floor(Math.random() * letter_array.length);
                     code = code + letter_array[random_letter];
                     break;

            // Генеруємо цифри
            default: let random_number = Math.floor(Math.random() * 10);
                     code += random_number;
                     break;
        }

    }

    // Повертаємо результат
    return code;
}

let code = generate_Random_Passport_Code();
console.log('Випадковий код паспорта України: ' + code);

code = generate_Random_Passport_Code();
console.log("Випадковий код паспорта України: " + code);

code = generate_Random_Passport_Code();
console.log(`Випадковий код паспорта України: ${code}`);