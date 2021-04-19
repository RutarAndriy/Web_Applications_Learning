// Необхідні константи
const use_db = is_db_used();
const server_port = get_server_port();
const server_url = `http://localhost:${server_port}`;

// Перевірка, чи використовувати базу даних
// Якщо ні, то буде використовуватися localStorage
function is_db_used()
   { return $("head").attr("use_db"); }

// Метод повертає порт, який використовується для запуску сервера
function get_server_port()
   { return $("head").attr("server_port"); }

// ...............................................................................................

// Отримання даних із сервера
async function server_GET (req) {

   try {
      
   const res = await fetch(server_url + req,
                           { method: "GET",
                             headers: { "Accept": "application/json" } });

   if (res.ok) { return res.json(); }
   else { throw new Error(); }

   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося отримати інформацію з бази даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// Оновлення даних на сервері
async function server_PUT (req, array) {

   try {
   
   let collection;

   switch (req) {
      case "/set_hospitals":      collection = 1; break;
      case "/set_doctors":        collection = 2; break;
      case "/set_patients":       collection = 3; break;
      case "/set_discharged":     collection = 4; break;
      case "/set_identificators": collection = 5; break;
   }
   
   const res = await fetch(server_url + req,
                           { method: "PUT",
                             headers: { "Accept": "application/json",
                                        "Content-Type": "application/json" },
                             body: JSON.stringify({ array: array,
                                                    collection: collection }) }
                             );
   
   if (res.ok) { return res.json(); }
   else { throw new Error(); }
   
   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося оновити інформацію у базі даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// ...............................................................................................

let hosp = [{"id":1,"name":"АТБ",      "address":"Личаківська, 15"},
            {"id":2,"name":"Сільпо",   "address":"Замарстинівська, 33"},
            {"id":3,"name":"Рукавичка","address":"Лісна, 68"}];

let docs = [{"id":1,"name":"Завірюха П.В.","age":"45", "hospital":"H1"},
            {"id":2,"name":"Олійник М.О.", "age":"76", "hospital":"H3"},
            {"id":3,"name":"Качан Г.І.",   "age":"92", "hospital":"H2"}];

let pats = [{"id":1,"name":"Андрій А.О.","age":"15", "hospital":"H1", "doctor":"D2"},
            {"id":2,"name":"Богдан М.О.","age":"46", "hospital":"H2", "doctor":"D4"},
            {"id":3,"name":"Карась В.В.","age":"33", "hospital":"H3", "doctor":"D9"}];

let idis = [{"name":"last_hospital_id","value":"15"},
            {"name":"last_doctor_id",  "value":"24"},
            {"name":"last_patient_id", "value":"35"}];

async function set_data_to_db() {

   let res_1 = server_PUT("/set_hospitals", hosp);
   console.log(res_1);

   let res_2 = server_PUT("/set_doctors", docs);
   console.log(res_2);

   let res_3 = server_PUT("/set_patients", pats);
   console.log(res_3);

   let res_4 = server_PUT("/set_discharged", pats);
   console.log(res_4);

   let res_5 = server_PUT("/set_identificators", idis);
   console.log(res_5);

}

// Зберігання даних у localStorage
function save_data (collection) {

   console.log("save_data");

}

// Завантаження даних з localStorage
function load_data (collection) {

   console.log("load_data");

}