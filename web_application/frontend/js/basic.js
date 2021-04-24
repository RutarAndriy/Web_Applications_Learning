// Створення нового елемента
function create_element() {

   let target = location.pathname.substring(1);

   if (target === "cured_patients") {
      modal_delete_cured_patients();
      return;
   }

   switch (target) {
      case "hospitals": $("#hospital_title").text("Додавання нової лікарні");
                        $("#hospital_yes").text("Додати");
                        break;
      case "doctors":   $("#doctor_title").text("Додавання нового лікаря");
                        $("#doctor_yes").text("Додати");
                        break;
      case "patients":  $("#patient_title").text("Додавання нового пацієнта");
                        $("#patient_yes").text("Додати");
                        break;
   }

   $(`#modal_${target}`).modal('show');

}

// Редагування існуючого елемента
function edit_element() {

   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   $(`#${target}_title`).text("Редагування даних");
   $(`#${target}_yes`).text("Оновити дані");
   $(`#modal_${target}s`).modal('show');

}

// Пошук існуючого елемента
function find_element() {

   console.log(`Find: ${location.pathname}`);

}

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

// Вибрана позитивна відповідь у модальному вікні
function modal_confirm() {

   let page = location.pathname.substring(1);

   let target = $("#modal_confirm").attr("target");
   let src = $("#modal_confirm").attr("src");

   switch (target) {

      // Видалення даних
      case "delete": let id = parseInt(src);
                     page = page.substr(0, page.length - 1);
                     eval(`remove_${page}(${id})`);
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

// Додавання нової лікарні
function modal_add_hospitals() {

   let name    = $("#hospital_name").val();
   let address = $("#hospital_address").val();

   add_hospital(name, address);
   display_data();
   clear_input();
   save_data();

}

// Додавання нового лікаря
function modal_add_doctors() {

   let name     = $("#doctor_name").val();
   let age      = $("#doctor_age").val();
   let hospital = $("#doctor_hospital").text();

   add_doctor(name, age, hospital);
   display_data();
   clear_input();
   save_data();

}

// Додавання нового пацієнта
function modal_add_patients() {

   let name     = $("#patient_name").val();
   let age      = $("#patient_age").val();
   let doctor   = $("#patient_doctor").text();
   let hospital = $("#patient_hospital").text();

   add_patient(name, age, doctor, hospital);
   display_data();
   clear_input();
   save_data();

}

// Підтвердження видалення виписаних пацієнтів
function modal_delete_cured_patients() {

   modal_confirm_create("Видалення даних",
                        "Ви дійсно хочете видалити усі наявні дані про виписаних пацієнтів?",
                        "Очистити",
                        "Відміна");

   $(`#modal_confirm`).modal('show');

}

// Вибір лікарні у випадаючому списку
function set_hospital() {

   console.log("set_hospital");

}

// Вибір лікаря у випадаючому списку
function set_doctor() {

   console.log("set_doctor");

}

// Відобразити дані у таблиці
function display_data() {

   let data;
   let target = location.pathname.substring(1);

   switch (target) {

      case "hospitals":      data = get_hospitals_list();    break;
      case "doctors":        data = get_doctors_list();      break;
      case "patients":       data = get_patients_list();     break;
      case "cured_patients": data = get_patients_list(true); break;

   }

   // Очищення таблиць
   clear_table(data.length === 0);

   // Відображення загальної кількості елементів
   $("#total_count").text(`Загальна кількість: ${data.length}`);

   // Для виписаних та невиписаниї пацієнтів таблиці однакові
   if (target === "cured_patients") { target = "patients"; }

   // Відобразити дані конкретної таблиці
   eval(`display_${target}_data(data)`);

}

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

// <li><hr class="dropdown-divider"></li>

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
function display_patients_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td class="fit"> <span class="m-2">${element.age}</span> </td>
         <td>${element.doctor}</td>
         <td>${element.hospital}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

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

// Обмеження вводу для поля "вік"
function set_age (element) {

   let value = $(element).val();
   value = value.substring(0, 3);
   value = (value > 120) ? 120 : value;
   $(element).val(value);

}

// Очищення даних після закриття модальних вікон
$(document).on("hidden.bs.modal", () => { clear_input(); });

// Виконання коду після завантаження сторінки
jQuery(async () => {

   await load_data();
   display_data();

});