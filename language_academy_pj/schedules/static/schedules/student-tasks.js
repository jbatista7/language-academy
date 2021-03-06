const taskForm = document.getElementById("form-event");
const deleteForm = document.getElementById("delete-form");

const newBtn = document.getElementById("add-task");

const teacherSelect = document.getElementById("new-teacher");

const dateInput = document.getElementById("new-date");
const timeInput = document.getElementById("ctimepicker");

const csrf = document.getElementsByName("csrfmiddlewaretoken");

const alertBox = document.getElementById("alert-box");
const alertDeleteBox = document.getElementById("alert-delete-box");
const spinnerBox = document.getElementById("spinner-box");
const spinnerDeleteBox = document.getElementById("spinner-delete-box");

const user_idText = JSON.parse(document.getElementById("user_id").textContent);

const taskModalTitle = document.getElementById("task-modal-title");

const lessonContainer = document.getElementById("lesson-container");

const lessonLink = document.getElementById("lesson-link");

const lesson = document.getElementById("new-lesson");

const taskCount = document.getElementById("task-hours");

const updateUrl = window.location.href + "update/";
const deleteUrl = window.location.href + "delete/";

let selectedLanguage = "";
let taskId = "";
let taskStatus = "";
let totalLessonHours = 0;
let taskHours = taskCount !== null ? parseInt(taskCount.textContent) : 0;

let currentTeacher = "";
let teacherId = "";

var table;

function disableDatetimeInput(state) {
  if (state) {
    dateInput.setAttribute("disabled", true);
    timeInput.setAttribute("disabled", true);
  } else {
    dateInput.removeAttribute("disabled");
    timeInput.removeAttribute("disabled");
  }
}
function disableDateInput(state) {
  if (state) {
    dateInput.setAttribute("disabled", true);
  } else {
    dateInput.removeAttribute("disabled");
  }
}
function disableTimeInput(state) {
  //state = true or false, true disabled
  if (state) {
    timeInput.setAttribute("disabled", true);
  } else {
    timeInput.removeAttribute("disabled");
  }
}

function disabledWeekDays(enabledDays) {
  let week_days = enabledDays.toString().split(",").map(Number);
  let days = [0, 1, 2, 3, 4, 5, 6];
  let disabled_week_days = days.filter((day) => !week_days.includes(day));

  $(".datepicker").datepicker("setDaysOfWeekDisabled", disabled_week_days);
}

function hoursDisabled(enabledHours) {
  let hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  let h = enabledHours.toString().split(",").map(Number);
  let disabled_hours = hours.filter((hour) => !h.includes(hour));
  //   let hoursToString = disabled_hours.toString().split(",");
  let dH = [];
  let maxTm = null;
  let convert24To12 = disabled_hours.forEach((hour) => {
    let m = hour >= 12 ? "pm" : "am";
    let temp = "";

    hour %= 12;
    hour = hour ? hour : 12;
    maxTm = hour === 11 ? (m === "pm" ? "10pm" : null) : null;
    temp =
      hour +
      m +
      ", " +
      (hour === 12 ? "1" : hour + 1) +
      (hour === 11 ? (m === "am" ? "pm" : "am") : m);
    dH.push(temp.toString().split(","));
  });

  $("#ctimepicker").timepicker({
    step: 60,
    timeFormat: "h:i A",
    scrollDefault: "now",
    disableTimeRanges: dH,
    maxTime: maxTm,
  });
}

$(function () {
  $(".datepicker")
    .datepicker({
      format: "dd/mm/yyyy",
      startDate: "+2d",
    })
    .on("changeDate", function (e) {
      // `e` here contains the extra attributes
      if (e.target.value) {
        timeInput.value = "";
        disableTimeInput(true);
        let day = e.date.getDay(); // week day
        let hours = "";

        switch (day) {
          case 0:
            hours = teacherSelect.selectedOptions[0].dataset.sunday;
            break;

          case 1:
            hours = teacherSelect.selectedOptions[0].dataset.monday;
            break;

          case 2:
            hours = teacherSelect.selectedOptions[0].dataset.tuesday;
            break;

          case 3:
            hours = teacherSelect.selectedOptions[0].dataset.wednesday;
            break;

          case 4:
            hours = teacherSelect.selectedOptions[0].dataset.thursday;
            break;

          case 5:
            hours = teacherSelect.selectedOptions[0].dataset.friday;
            break;

          case 6:
            hours = teacherSelect.selectedOptions[0].dataset.saturday;
            break;
        }

        //   let hours = e.target.selectedOptions[0].dataset.hours;
        hoursDisabled(hours);
        disableTimeInput(false);
        // console.log(teacherSelect.dataset.monday);
      }
    });
});

teacherSelect.addEventListener("change", (e) => {
  $(".datepicker").datepicker("clearDates", true);
  timeInput.value = "";
  //   let hours = e.target.selectedOptions[0].dataset.hours;
  //   hoursDisabled(hours);

  let temp_week_days = "";

  if (e.target.selectedOptions[0].dataset.sunday) {
    temp_week_days += "," + "0";
  }
  if (e.target.selectedOptions[0].dataset.monday) {
    temp_week_days += "," + "1";
  }
  if (e.target.selectedOptions[0].dataset.tuesday) {
    temp_week_days += "," + "2";
  }
  if (e.target.selectedOptions[0].dataset.wednesday) {
    temp_week_days += "," + "3";
  }
  if (e.target.selectedOptions[0].dataset.thursday) {
    temp_week_days += "," + "4";
  }
  if (e.target.selectedOptions[0].dataset.friday) {
    temp_week_days += "," + "5";
  }
  if (e.target.selectedOptions[0].dataset.saturday) {
    temp_week_days += "," + "6";
  }

  temp_week_days = temp_week_days.slice(1);
  if (temp_week_days) {
    let week_days = temp_week_days.split(",").map(Number);

    let days = [0, 1, 2, 3, 4, 5, 6];
    let disabled_week_days = days.filter((day) => !week_days.includes(day));

    $(".datepicker").datepicker("setDaysOfWeekDisabled", disabled_week_days);
    disabledWeekDays(week_days);

    disableDateInput(false);
  }
});

$(document).ready(function () {
  ("use strict");
  table = $("#tasks-datatable").DataTable({
    language: {
      paginate: {
        previous: "<i class='mdi mdi-chevron-left'>",
        next: "<i class='mdi mdi-chevron-right'>",
      },
      info: "Showing bookings _START_ to _END_ of _TOTAL_",
      lengthMenu:
        'Display <select class=\'form-select form-select-sm ms-1 me-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> tasks',
    },
    pageLength: 10,
    columns: [
      {
        orderable: !1,
      },
      { orderable: !1 },
      { orderable: !1 },
      { orderable: !1 },
      {
        orderable: !1, //orderSequence: ["desc"],
      },
      { orderable: !1 },
      { orderable: !1 },
    ],
    order: [
      [5, "asc"],
      [4, "asc"],
    ],
    select: { style: "multi" },
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination-rounded"),
        $("#tasks-datatable_length label").addClass("form-label");
    },
  });
});

function open_edit_modal(id, lessonNumber, teacherName, teacherUserId) {
  taskId = id;
  taskModalTitle.textContent = "Edit booking";
  teacherSelect.innerHTML = "";
  timeInput.value = "";
  $(".datepicker").datepicker("clearDates", true);

  lesson.value = "";
  currentTeacher = teacherName;
  teacherId = teacherUserId;

  $.ajax({
    type: "GET",
    url: `/get-task/${id}/`,
    success: function (response) {
      const taskData = response.data;
      taskData.map((item) => {
        lesson.value = lessonNumber;
        selectedLanguage = item.language;
        taskStatus = item.status;
        $.ajax({
          type: "GET",
          url: `/teachers-json/${item.language}/`,
          success: function (response) {
            const teachersData = response.data;
            teachersData.map((itemT) => {
              const optionTeacher = document.createElement("OPTION");
              optionTeacher.text = itemT.name;
              optionTeacher.value = itemT.name;
              optionTeacher.setAttribute("data-user_id", itemT.user_id);

              optionTeacher.setAttribute("data-sunday", itemT.week_days.sunday);
              optionTeacher.setAttribute("data-monday", itemT.week_days.monday);
              optionTeacher.setAttribute(
                "data-tuesday",
                itemT.week_days.tuesday
              );
              optionTeacher.setAttribute(
                "data-wednesday",
                itemT.week_days.wednesday
              );
              optionTeacher.setAttribute(
                "data-thursday",
                itemT.week_days.thursday
              );
              optionTeacher.setAttribute("data-friday", itemT.week_days.friday);
              optionTeacher.setAttribute(
                "data-saturday",
                itemT.week_days.saturday
              );
              if (itemT.name === currentTeacher) {
                optionTeacher.setAttribute("selected", true);

                let temp_week_days = "";

                if (optionTeacher.dataset.sunday) {
                  temp_week_days += "," + "0";
                }
                if (optionTeacher.dataset.monday) {
                  temp_week_days += "," + "1";
                }
                if (optionTeacher.dataset.tuesday) {
                  temp_week_days += "," + "2";
                }
                if (optionTeacher.dataset.wednesday) {
                  temp_week_days += "," + "3";
                }
                if (optionTeacher.dataset.thursday) {
                  temp_week_days += "," + "4";
                }
                if (optionTeacher.dataset.friday) {
                  temp_week_days += "," + "5";
                }
                if (optionTeacher.dataset.saturday) {
                  temp_week_days += "," + "6";
                }

                temp_week_days = temp_week_days.slice(1);
                if (temp_week_days) {
                  let week_days = temp_week_days.split(",").map(Number);

                  let days = [0, 1, 2, 3, 4, 5, 6];
                  let disabled_week_days = days.filter(
                    (day) => !week_days.includes(day)
                  );

                  $(".datepicker").datepicker(
                    "setDaysOfWeekDisabled",
                    disabled_week_days
                  );
                  disabledWeekDays(week_days);

                  disableDateInput(false);
                }
                //     hoursDisabled(itemT.hours);
                let [pDate, pTime] = item.date.split(" ");
                let pHour = pTime.split(":")[0];
                let m = pHour >= 12 ? "PM" : "AM";
                pHour %= 12;
                pHour = (pHour ? pHour : 12) + ":00 ";
                let pDate1 = pDate.split("/");
                dateInput.value =
                  pDate1[0] + "/" + pDate1[1] + "/" + "20" + pDate1[2];
                timeInput.value = pHour + m;
                let formatDateOld =
                  pDate1[1] + "/" + pDate1[0] + "/" + "20" + pDate1[2];
                let d = new Date(formatDateOld);
                let day = d.getDay(); //week day

                let hours = "";

                // console.log(optionTeacher.dataset.monday);

                switch (day) {
                  case 0:
                    hours = optionTeacher.dataset.sunday;
                    break;

                  case 1:
                    hours = optionTeacher.dataset.monday;
                    break;

                  case 2:
                    hours = optionTeacher.dataset.tuesday;
                    break;

                  case 3:
                    hours = optionTeacher.dataset.wednesday;
                    break;

                  case 4:
                    hours = optionTeacher.dataset.thursday;
                    break;

                  case 5:
                    hours = optionTeacher.dataset.friday;
                    break;

                  case 6:
                    hours = optionTeacher.dataset.saturday;
                    break;
                }

                hoursDisabled(hours);
                disableTimeInput(false);
              }
              teacherSelect.appendChild(optionTeacher);
            });
          },
          error: function (error) {
            console.log(error);
          },
        });
      });
      $("#new-task-modal").modal("show");
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function show_lesson_link(link) {
  lessonLink.setAttribute("href", link);
  if (link !== "None") {
    lessonLink.innerHTML = `<span>${link}</span>`;
  } else {
    lessonLink.innerHTML = "";
  }

  $("#lesson-link-modal").modal("show");
}

function delete_modal(id, status) {
  taskId = id;
  taskStatus = status;
  $("#delete-task-modal").modal("show");
}

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:00.0`;
};

newBtn.addEventListener("click", (e) => {
  taskModalTitle.textContent = "New booking";
  //   taskForm.reset();
  teacherSelect.innerHTML = `<option value="" selected disabled hidden>Select a teacher</option>`;
  $(".datepicker").datepicker("clearDates", true);
  timeInput.value = "";
  disableDatetimeInput(true);
  lesson.value = "";
  totalLessonHours = 0;

  //adding new hour
  $.ajax({
    type: "GET",
    url: "/packs-json/",
    success: function (response) {
      const packsData = response.data;
      packsData.map((item) => {
        selectedLanguage = item.language;
        totalLessonHours += item.number_of_lessons;
      });
      if (totalLessonHours - taskHours > 0) {
        lesson.value = taskHours + 1;
        $.ajax({
          type: "GET",
          url: `/teachers-json/${selectedLanguage}/`,
          success: function (response) {
            const teachersData = response.data;
            teachersData.map((item) => {
              const option = document.createElement("OPTION");
              option.text = item.name;
              option.value = item.name;
              option.setAttribute("data-user_id", item.user_id);

              option.setAttribute("data-sunday", item.week_days.sunday);
              option.setAttribute("data-monday", item.week_days.monday);
              option.setAttribute("data-tuesday", item.week_days.tuesday);
              option.setAttribute("data-wednesday", item.week_days.wednesday);
              option.setAttribute("data-thursday", item.week_days.thursday);
              option.setAttribute("data-friday", item.week_days.friday);
              option.setAttribute("data-saturday", item.week_days.saturday);
              teacherSelect.appendChild(option);
            });
          },
          error: function (error) {
            console.log(error);
          },
        });
      } else {
        lesson.value = "You have no more class hours, go to support and sales";
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  spinnerBox.innerHTML = '<div class="spinner-border" role="status"></div>';

  if (taskModalTitle.textContent === "New booking") {
    if (totalLessonHours - taskHours <= 0) {
      $("#new-task-modal").modal("toggle");
      spinnerBox.innerHTML = "";
    } else {
      if (
        timeInput.value.length === 0 ||
        dateInput.value.length === 0 ||
        teacherSelect.value.length === 0
      ) {
        spinnerBox.innerHTML = "";
      } else {
        let dateStr = dateInput.value.split("/").reverse().join("-");
        let timeStr = convertTime12to24(timeInput.value);
        teacherId =
          teacherSelect[teacherSelect.options.selectedIndex].getAttribute(
            "data-user_id"
          );
        $.ajax({
          type: "POST",
          url: "/create-task/",
          data: {
            csrfmiddlewaretoken: csrf[0].value,
            // pack: packSelect.value,
            lesson: lesson.value,
            teacher: teacherSelect.value,
            teacher_user_id: teacherId,
            date: dateStr + " " + timeStr,
            language: selectedLanguage,
            user_id: user_idText,
          },
          success: function (response) {
            spinnerBox.innerHTML = "";
            // Task already exists, lesson, teacher and date are busy, please try again
            if (response.message === "exists") {
              alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                      <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>. Booking already exists. Teacher and date are busy.
                      </div>`;
              setTimeout(() => {
                $("#new-task-modal").modal("toggle");
                alertBox.innerHTML = "";
              }, 2000);
            } else if (response.message === "duplicated task") {
              alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                      <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>. Duplicated booking. You can only have one at a time on the same schedule.
                      </div>`;
              setTimeout(() => {
                $("#new-task-modal").modal("toggle");
                alertBox.innerHTML = "";
              }, 2000);
            } else {
              alertBox.innerHTML = `<div class="alert alert-success" role="alert">
                        <i class="dripicons-checkmark me-2"></i><strong>Success</strong>. Your booking has been created
                                                </div>`;
              setTimeout(() => {
                $("#new-task-modal").modal("toggle");
                alertBox.innerHTML = "";
                window.location.reload();
              }, 2000);
            }
          },
          error: function (error) {
            spinnerBox.innerHTML = "";
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                            <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>. Something went wrong.
                        </div>`;
            setTimeout(() => {
              $("#add-task-modal").modal("toggle");
              alertBox.innerHTML = "";
            }, 2000);
          },
        });
      }
    }
  } else if (taskModalTitle.textContent === "Edit booking") {
    if (
      timeInput.value.length === 0 ||
      dateInput.value.length === 0 ||
      teacherSelect.value.length === 0
    ) {
      spinnerBox.innerHTML = "";
    } else {
      let dateStr = dateInput.value.split("/").reverse().join("-");
      let timeStr = convertTime12to24(timeInput.value);
      const d = new Date();
      let taskTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      $.ajax({
        type: "POST",
        url: `/${taskId}/update/`,
        data: {
          csrfmiddlewaretoken: csrf[0].value,
          teacher: teacherSelect.value,
          teacher_user_id: teacherId,
          date: dateStr + " " + timeStr,
          language: selectedLanguage,
          user_id: user_idText,
          status: taskStatus,
          timezone: taskTimezone,
        },
        success: function (response) {
          spinnerBox.innerHTML = "";
          // Task already exists, lesson, teacher and date are busy, please try again
          if (response.message === "exists") {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                      <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>. Booking already exists. Teacher and date are busy.
                      </div>`;
            setTimeout(() => {
              $("#new-task-modal").modal("hide");
              alertBox.innerHTML = "";
            }, 2000);
          } else if (response.message === "duplicated task") {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                      <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>. Duplicated booking. You can only have one at a time on the same schedule.
                      </div>`;
            setTimeout(() => {
              $("#new-task-modal").modal("hide");
              alertBox.innerHTML = "";
            }, 2000);
          } else if (response.msg) {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                        <i class="dripicons-wrong me-2"></i> ${response.msg}
                        </div>`;
            console.log(response.msg);
            setTimeout(() => {
              $("#new-task-modal").modal("hide");
              alertBox.innerHTML = "";
              if (response.msg === "Booking expired") {
                window.location.reload();
              }
            }, 2000);
          } else {
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">
                        <i class="dripicons-checkmark me-2"></i><strong>Success</strong>. Your booking has been updated
                                                </div>`;
            setTimeout(() => {
              $("#new-task-modal").modal("toggle");
              alertBox.innerHTML = "";
              window.location.reload();
            }, 2000);
          }
        },
        error: function (error) {
          spinnerBox.innerHTML = "";
          alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                            <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>.Something went wrong.
                        </div>`;
          setTimeout(() => {
            $("#add-task-modal").modal("hide");
            alertBox.innerHTML = "";
          }, 2000);
        },
      });
    }
  }
});

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alertDeleteBox.innerHTML = "";
  spinnerDeleteBox.innerHTML =
    '<div class="spinner-border" role="status"></div>';
  $.ajax({
    type: "POST",
    url: `/${taskId}/delete/`,
    data: {
      csrfmiddlewaretoken: csrf[0].value,
      status: taskStatus,
    },
    success: function (response) {
      spinnerDeleteBox.innerHTML = "";
      if (response.msg) {
        alertDeleteBox.innerHTML = `<div class="alert alert-danger" role="alert">
                  <i class="dripicons-checkmark me-2"></i>${response.msg}
                                          </div>`;
        setTimeout(() => {
          $("#delete-task-modal").modal("hide");
          alertDeleteBox.innerHTML = "";
        }, 2000);
      } else {
        alertDeleteBox.innerHTML = `<div class="alert alert-success" role="alert">
                                    <i class="dripicons-checkmark me-2"></i><strong>Success</strong>. Your booking has been deleted
                                                            </div>`;
        setTimeout(() => {
          $("#delete-task-modal").modal("hide");
          alertDeleteBox.innerHTML = "";
          window.location.reload();
        }, 2000);
      }
    },
    error: function (error) {
      spinnerDeleteBox.innerHTML = "";
      alertDeleteBox.innerHTML = `<div class="alert alert-danger" role="alert">
                  <i class="dripicons-wrong me-2"></i> <strong>Ups</strong>. Something went wrong.
              </div>`;
      setTimeout(() => {
        $("#delete-task-modal").modal("hide");
        alertBox.innerHTML = "";
      }, 2000);
    },
  });
});
