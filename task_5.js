// Функція повертає кількість днів, які пройшли від початку року
function get_Days_Passed_Count (year) {

    // Дата на теперішній момент
    let now = new Date();

    // Якщо рік не заданий, то задаємо теперішній рік
    if (typeof year === 'undefined') { year = now.getFullYear(); }

    // 1 січня n року, 00:00:00
    let date = new Date(year, 0, 1, 0, 0, 0, 0); 

    // Різниця між двома датами в мілісекундах
    let milliseconds_passed = now.getTime() - date.getTime();

    // Переводимо мілісекунди в дні
    let result = milliseconds_passed / 1000 / 60 / 60 / 24;

    // Отримуємо результат - чіле число днів
    return Math.floor(result);

}

console.log(`Від початку 2020 року минуло ${get_Days_Passed_Count(2020)} днів`);
console.log(`Від початку 1995 року минуло ${get_Days_Passed_Count(1995)} днів`);
console.log(`Від початку цього року минуло ${get_Days_Passed_Count()} днів`);