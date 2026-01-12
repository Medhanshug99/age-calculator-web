const { DateTime } = luxon;

const birthInput = document.getElementById("birthdate");
const dateField = birthInput.parentElement;
const form = document.getElementById("ageForm");
const resultDiv = document.getElementById("result");

flatpickr(birthInput, {
  dateFormat: "d-m-Y",
  maxDate: "today",
  allowInput: true,

  onChange: function (selectedDates) {
    if (selectedDates.length) {
      dateField.classList.add("active");
    }
  },

  onClose: function () {
    if (!birthInput.value) {
      dateField.classList.remove("active");
    }
  }
});

birthInput.addEventListener("input", () => {
  if (birthInput.value) {
    dateField.classList.add("active");
  } else {
    dateField.classList.remove("active");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = birthInput.value;

  if (!value) {
    resultDiv.textContent = "❌ Please select your birthdate.";
    return;
  }

  const birthDate = DateTime.fromFormat(value, "d-MM-yyyy");
  const today = DateTime.now();

  if (!birthDate.isValid || birthDate > today) {
    resultDiv.textContent = "❌ Invalid birthdate.";
    return;
  }

  const diff = today.diff(birthDate, ["years", "months", "days"]).toObject();

  resultDiv.textContent =
    `You are ${Math.floor(diff.years)} years, ${Math.floor(diff.months)} months, and ${Math.floor(diff.days)} days old.`;
});
