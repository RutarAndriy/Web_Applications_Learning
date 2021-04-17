// Необхідні змінні
let use_db = is_db_used();

// Зберігання даних у localStorage
function save_data (collection) {

   console.log("save_data");

}

// Завантаження даних з localStorage
function load_data (collection) {

   console.log("load_data");

}

// Перевірка, чи використовувати базу даних
// Якщо ні, то буде використовуватися localStorage
function is_db_used()
   { return $("head").attr("use_db"); }