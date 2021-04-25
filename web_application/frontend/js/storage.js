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
      case "/set_cured_patients": collection = 4; break;
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

// Зберігання даних
function save_data() {

   if (use_db === "true") { save_data_in_data_base();     }
   else                   { save_data_in_local_storage(); }

}

// Зберігання даних у localStorage
function save_data_in_local_storage() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "hospitals":
         localStorage.setItem('hospitals', JSON.stringify(get_hospitals_list()));
         break;

      case "doctors":
         localStorage.setItem('doctors', JSON.stringify(get_doctors_list()));
         break;

      case "patients":
         localStorage.setItem('patients', JSON.stringify(get_patients_list()));
         localStorage.setItem('cured_patients', JSON.stringify(get_patients_list(true)));
         break;

      case "cured_patients":
         localStorage.setItem('cured_patients', JSON.stringify(get_patients_list(true)));
         break;

   }

   let identificators = [{ "name":"last_hospital_id","value":last_hospital_id },
                         { "name":"last_doctor_id",  "value":last_doctor_id   },
                         { "name":"last_patient_id", "value":last_patient_id  }];

   localStorage.setItem('identificators', JSON.stringify(identificators));

}

// Зберігання даних у базу даних
function save_data_in_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "hospitals":
         server_PUT("/set_hospitals", get_hospitals_list());
         break;

      case "doctors":
         server_PUT("/set_doctors", get_doctors_list());
         break;

      case "patients":
         server_PUT("/set_patients", get_patients_list());
         server_PUT("/set_cured_patients", get_patients_list(true));
         break;

      case "cured_patients":
         server_PUT("/set_cured_patients", get_patients_list(true));
         break;

   }

   let identificators = [{ "name":"last_hospital_id","value":last_hospital_id },
                         { "name":"last_doctor_id",  "value":last_doctor_id   },
                         { "name":"last_patient_id", "value":last_patient_id  }];

   server_PUT("/set_identificators", identificators);

}

// ...............................................................................................

// Завантаження даних
async function load_data() {

   if (use_db === "true") { await load_data_from_data_base();     }
   else                   { await load_data_from_local_storage(); }

}

// Завантаження даних з localStorage
async function load_data_from_local_storage() {

   let item;
   let target = location.pathname.substring(1);

   switch (target) {

      case "hospitals":
         item = JSON.parse(localStorage.getItem("hospitals"));
         set_hospitals_list(item ? item : []);
         break;

      case "doctors":
         item = JSON.parse(localStorage.getItem("doctors"));
         set_doctors_list(item ? item : []);
         break;

      case "patients":
         item = JSON.parse(localStorage.getItem("patients"));
         set_patients_list(item ? item : []);
         item = JSON.parse(localStorage.getItem("cured_patients"));
         set_patients_list(item ? item : [], true);
         break;

      case "cured_patients":
         item = JSON.parse(localStorage.getItem("cured_patients"));
         set_patients_list(item ? item : [], true);
         break;

   }

   let identificators = JSON.parse(localStorage.getItem("identificators"));
   if (!identificators) { identificators = []; }

   for (let item of identificators) {
      if (item.name === "last_hospital_id") { last_hospital_id = item.value; }
      if (item.name === "last_doctor_id")   { last_doctor_id   = item.value; }
      if (item.name === "last_patient_id")  { last_patient_id  = item.value; }
   }
}

// Завантаження даних з бази даних
async function load_data_from_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "hospitals":
         await server_GET("/get_hospitals").then((res) =>
            { set_hospitals_list(res); });
         break;

      case "doctors":
         await server_GET("/get_doctors").then((res) =>
            { set_doctors_list(res); });
         break;

      case "patients":
         await server_GET("/get_patients").then((res) =>
            { set_patients_list(res); });
         await server_GET("/get_cured_patients").then((res) =>
            { set_patients_list(res, true); });
         break;

      case "cured_patients":
         await server_GET("/get_cured_patients").then((res) =>
            { set_patients_list(res, true); });
         break;

   }

   await server_GET("/get_last_hospital_id").then((res) =>
      { if (res && res.length > 0) { last_hospital_id = res[0].value; }});

   await server_GET("/get_last_doctor_id").then((res) =>
      { if (res && res.length > 0) { last_doctor_id = res[0].value; }});

   await server_GET("/get_last_patient_id").then((res) =>
      { if (res && res.length > 0) { last_patient_id = res[0].value; }});

}

// Отримання даних
async function get_data (data) {

   if (use_db === "true") { return await get_data_from_data_base(data);     }
   else                   { return await get_data_from_local_storage(data); }

}

// Отримання даних з localStorage
async function get_data_from_local_storage (data) {
   
   try           { return JSON.parse(localStorage.getItem(data)); }
   catch (error) { return [];                                     }

}


// Отримання даних з бази даних
async function get_data_from_data_base (data) {

   try           { return await server_GET(`/get_${data}`); }
   catch (error) { return [];                               }

}