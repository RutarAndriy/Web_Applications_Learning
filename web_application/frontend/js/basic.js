// Необхідні змінні
let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

// Створення нового елемента
async function create_element() {

   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   if (target === "cured_patient") {
      modal_delete_cured_patients();
      return;
   }

   switch (target) {

      case "hospital": $("#hospital_title").text("Додавання нової лікарні");
                       $("#hospital_yes").text("Додати");
                       break;
      case "doctor":   $("#doctor_title").text("Додавання нового лікаря");
                       $("#doctor_yes").text("Додати");
                       prepare_hospitals_for_dropdown(target);
                       break;
      case "patient":  $("#patient_title").text("Додавання нового пацієнта");
                       $("#patient_yes").text("Додати");
                       prepare_hospitals_for_dropdown(target);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Редагування існуючого елемента
async function edit_element (element) {

   let item;
   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   let id = parseInt($(element).closest("tr").children().first().text());

   $(`#${target}_title`).text("Редагування даних");
   $(`#${target}_yes`).text("Оновити дані");

   switch (target) {

      case "hospital": item = get_hospital_by_id(id);
                       $("#hospital_name").val(item.name);
                       $("#hospital_address").val(item.address);
                       break;
      case "doctor":   item = get_doctor_by_id(id);
                       $("#doctor_age").val(item.age);
                       $("#doctor_name").val(item.name);
                       $("#doctor_hospital").text(item.hospital);
                       prepare_hospitals_for_dropdown(target);
                       break;
      case "patient":  item = get_patient_by_id(id);
                       $("#patient_age").val(item.age);
                       $("#patient_name").val(item.name);
                       $("#patient_doctor").text(item.doctor);
                       $("#patient_hospital").text(item.hospital);
                       prepare_hospitals_for_dropdown(target);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Пошук існуючого елемента
function find_element (element) {

   let search = $(element).val();
   let target = location.pathname.substring(1);
   let search_list = [];

   switch (target) {

      case "hospitals":      search_list = find_hospitals(search);      break;
      case "doctors":        search_list = find_doctors(search);        break;
      case "patients":       search_list = find_patients(search);       break;
      case "cured_patients": search_list = find_patients(search, true); break;

   }

   display_data(search_list);

}

// ...............................................................................................

// Видалення існуючого елемента
function delete_element (item) {

   let message;
   let target = location.pathname.substring(1);
   let id = parseInt($(item).closest("tr").children().first().text());

   switch (target) {

      case "hospitals":
         message = "Ви дійсно хочете видалити цю лікарню";
         break;

      case "doctors":
         message = "Ви дійсно хочете звільнити цього лікаря";
         break;

      case "patients":
         message = "Ви дійсно хочете виписати цього пацієнта";
         break;

      case "cured_patients":
         message = "Ви дійсно хочете видалити цього виписаного пацієнта";
         break;

   }
   
   modal_confirm_create("Повідомлення",
                        `${message}?`,
                        "Видалити",
                        "Відміна",
                        "delete", id);

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Відобразити дані у таблиці
function display_data (search_list) {

   let data;
   let additional_attr = "";
   let target = location.pathname.substring(1);

   switch (target) {

      case "hospitals":      data = get_hospitals_list();
                             break;
      case "doctors":        data = get_doctors_list();
                             break;
      case "patients":       data = get_patients_list();
                             additional_attr = "false, ";
                             break;
      case "cured_patients": data = get_patients_list(true);
                             additional_attr = "true, ";
                             break;
   }

   // Якщо поле пошуку не порожнє - відображаємо результат
   if (search_list) { data = search_list; }

   // Очищення таблиць
   clear_table(data.length === 0);

   // Відображення загальної кількості елементів
   $("#total_count").text(`Загальна кількість: ${data.length}`);

   // Для виписаних та невиписаниї пацієнтів таблиці однакові
   if (target === "cured_patients") { target = "patients"; }

   // Відобразити дані конкретної таблиці
   eval(`display_${target}_data(${additional_attr}data)`);

}

// ...............................................................................................

// Відобразити дані про усі лікарні
function display_hospitals_data (data) {

   for (let element of data) {
   
      let block = 
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${element.address}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх лікарів
function display_doctors_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td class="fit"> <span class="m-2">${element.age}</span> </td>
         <td>${element.hospital}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх пацієнтів
function display_patients_data (is_cured, data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td class="fit"> <span class="m-2">${element.age}</span> </td>
         <td>${element.doctor}</td>
         <td>${element.hospital}</td>
         <td>${get_icon_code(is_cured)}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// ...............................................................................................

// Вибрана позитивна відповідь у модальному вікні
function modal_confirm() {

   let page = location.pathname.substring(1);

   let target = $("#modal_confirm").attr("target");
   let src = $("#modal_confirm").attr("src");

   switch (target) {

      // Видалення даних
      case "delete":
         let id = parseInt(src);
         page = page.substr(0, page.length - 1);
         eval(`remove_${page}(${id})`);
         display_data();
         save_data();
         break;


      // Видалення усіх даних про виписаних пацієнтів
      case "delete_cured_patients":
         cured_patients_list = [];
         display_data();
         save_data();
         break;

   }
}

// Задання елементів модального вікна підтвердження
function modal_confirm_create (title, message, yes, no, target, src) {

   $(`#modal_confirm_title`).text(title);
   $(`#modal_confirm_message`).text(message);
   $(`#modal_confirm_yes`).text(yes);
   $(`#modal_confirm_no`).text(no);
   $("#modal_confirm").attr("target", target);
   $("#modal_confirm").attr("src", src);

}

// ...............................................................................................

// Додавання нової лікарні або редагування існуючої
function modal_update_hospitals (added_new, id) {

   let name    = $("#hospital_name").val();
   let address = $("#hospital_address").val();

   if (added_new) { add_hospital(name, address);      }
   else           { edit_hospital(id, name, address); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового лікаря або редагування існуючого
function modal_update_doctors (added_new, id) {

   let name     = $("#doctor_name").val();
   let age      = $("#doctor_age").val();
   let hospital = $("#doctor_hospital").text();

   hospital = hospital === "Виберіть лікарню" ? "Не встановлено" : hospital;

   if (added_new) { add_doctor(name, age, hospital);      }
   else           { edit_doctor(id, name, age, hospital); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового пацієнта або редагування існуючого
function modal_update_patients (added_new, id) {

   let name     = $("#patient_name").val();
   let age      = $("#patient_age").val();
   let doctor   = $("#patient_doctor").text();
   let hospital = $("#patient_hospital").text();

   doctor   = doctor   === "Виберіть лікаря"  ? "Не призначено"  : doctor;
   hospital = hospital === "Виберіть лікарню" ? "Не встановлено" : hospital;

   if (added_new) { add_patient(name, age, doctor, hospital);      }
   else           { edit_patient(id, name, age, doctor, hospital); }

   display_data();
   clear_input();
   save_data();

}

// ...............................................................................................

// Підтвердження видалення виписаних пацієнтів
function modal_delete_cured_patients() {

   modal_confirm_create("Видалення даних",
                        "Ви дійсно хочете видалити усі наявні дані про виписаних пацієнтів?",
                        "Очистити",
                        "Відміна",
                        "delete_cured_patients");

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Вибір лікарні у випадаючому списку
function set_hospital (element) {

   let hospital = $(element).text();
   let target = location.pathname.substring(1);

   hospital = hospital === ". . ." ? "Виберіть лікарню" : hospital;

   if (target === "doctors") { $("#doctor_hospital").text(hospital);  }
   else                      { $("#patient_hospital").text(hospital);
                               prepare_doctors_for_dropdown();        }

}

// Вибір лікаря у випадаючому списку
function set_doctor (element) {

   let doctor = $(element).text();

   doctor = doctor === ". . ." ? "Виберіть лікаря" : doctor;

   $("#patient_doctor").text(doctor);

}

// ...............................................................................................

// Підготовуємо список доступних лікарень у випадаючому меню
function prepare_hospitals_for_dropdown (target) {

   let list = $(`#${target}_hospitals_list`);

   // Отримуємо інформацію про усі лікарні
   get_data("hospitals").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();
         list.append(divider);

         for (let item of result) {
            list.append(`<li><span class="dropdown-item" ` +
                        `onclick="set_hospital(this)">${item.name}</span></li>`);
         }
      }

   });
}

// Підготовуємо список доступних лікарів у випадаючому меню
function prepare_doctors_for_dropdown() {

   $("#patient_doctor").text("Виберіть лікаря");

   let list = $(`#patient_doctors_list`);
   let hospital = $("#patient_hospital").text();
   let divider_is_added = false;

   // Отримуємо інформацію про усіх лікарів
   get_data("doctors").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();

         for (let item of result) {

            if (item.hospital === hospital) {

               if (!divider_is_added) { list.append(divider);
                                        divider_is_added = true; }

               list.append(`<li><span class="dropdown-item" ` +
                           `onclick="set_doctor(this)">${item.name}</span></li>`);
            }
         }
      }

   });
}

// ...............................................................................................

// Видалення усіх даних з таблиці 
// Додавання інформаційного повідомлення, якщо таблиця пуста
function clear_table (table_is_empty) {

   let target = location.pathname.substring(1);
   let span = (target === "hospitals") ? 4 :
              (target === "doctors") ? 5 : 6;

   $("#table tbody").empty();

   let block =
  `<tr class="text-center text-secondary" id="table_empty">
      <td colspan="${span}"> <span class="mx-5 fs-4">Немає даних для відображення</span> </td>
   </tr>`;

   if (table_is_empty) { $("#table tbody").append(block); }
   else                { $("#table_empty").remove();      }

}

// Очищення полів вводу
function clear_input() {

   let target = location.pathname.substring(1);

   switch (target) {
      
      case "hospitals": $("#hospital_name").val("");
                        $("#hospital_address").val("");
                        break;
      case "doctors":   $("#doctor_name").val("");
                        $("#doctor_age").val("");
                        $("#doctor_hospital").text("Виберіть лікарню");
                        break;
      case "patients":  $("#patient_name").val("");
                        $("#patient_age").val("");
                        $("#patient_doctor").text("Виберіть лікаря");
                        $("#patient_hospital").text("Виберіть лікарню");
                        break;
   }
}

// ...............................................................................................

// Метод повертає html код елементів керування таблицею
function get_icon_code (only_delete) {

   // Іконка редагування елемента
   const icon_edit = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
   </svg>`;

   // Іконка видалення елемента
   const icon_delete = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg>`;

   // Блок з іконками
   const icons =
  `<span class="d-flex mx-2">
      ${!only_delete ? icon_edit : ""}${icon_delete}
   </span>`;

   return icons;

}

// ...............................................................................................

// Обмеження вводу для поля "вік"
function set_age (element) {

   let value = $(element).val();
   value = value.substring(0, 3);
   value = (value > 120) ? 120 : value;
   $(element).val(value);

}

// Метод дозволяє реалізувати затримку
function delay (time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve();
      }, time);
   });
}

// ...............................................................................................

// Очищення даних після закриття модальних вікон
$(document).on("hidden.bs.modal", () => { clear_input(); });

// Виконання коду після завантаження сторінки
jQuery(async () => {

   await load_data();
   display_data();

});