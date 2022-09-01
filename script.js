"use strict";
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
let countdownValue = Date;
let countdownActive;
let saved;
let digits = [...document.querySelectorAll(".digit")];
let cards = [...document.querySelectorAll(".card")];
let cardFacesS = document.querySelectorAll(".card-face-seconds");
let cardFaceAS = cardFacesS[0];
let cardFaceBS = cardFacesS[1];
let cardFacesM = document.querySelectorAll(".card-face-minutes");
let cardFaceAM = cardFacesM[0];
let cardFaceBM = cardFacesM[1];
let cardFacesH = document.querySelectorAll(".card-face-hours");
let cardFaceAH = cardFacesH[0];
let cardFaceBH = cardFacesH[1];
let digitD = document.querySelector(".digit-days");
let cardD = document.querySelector(".card-days");
let cardFacesD = document.querySelectorAll(".card-face-days");
let cardFaceAD = cardFacesD[0];
let cardFaceBD = cardFacesD[1];
let currentSeconds;
let secondsDigitAfter;
let currentMinutes;
let minutesDigitAfter;
let currentHours;
let hoursDigitAfter;
let currentDays;
let daysDigitAfter;
const cardFaces = document.querySelectorAll(".card-face");
function init() {
  cardFaces.forEach((cardFace) => {
    cardFace.textContent = `00`;
  });
  digits.forEach((digit) => {
    digit.setAttribute("data-before", `00`);
    digit.setAttribute("data-after", `00`);
  });
}
init();
/******************************/
const today = new Date();
const numberOfDaysToAdd = 14;
const result = today.setDate(today.getDate() + numberOfDaysToAdd);
let dt = new Date(result).toISOString();
let countdownDate = `${dt}`;
/******************************/
getSaved();
//local Storage
function getSaved() {
  if (localStorage.getItem("countdown")) {
    saved = JSON.parse(localStorage.getItem("countdown"));
    console.log(saved.date);
  } else {
    countdownDate = `${dt}`;
  }
}
function updateSaved() {
  localStorage.setItem("countdown", JSON.stringify(saved));
}
//***********************TIMER *******************/
countdownTimer();

function countdownTimer() {
  if (localStorage.getItem("countdown")) {
    saved = JSON.parse(localStorage.getItem("countdown"));
    countdownDate = saved.date;
  } else {
    saved = {
      date: countdownDate,
    };
    getSaved();
    updateSaved();
  }
  countdownValue = new Date(countdownDate).getTime();
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
      //seconds
      currentSeconds = Number(`${numberConverter(seconds)}`);
      currentSeconds > 0
        ? (secondsDigitAfter = currentSeconds - 1)
        : (secondsDigitAfter = "59");

      if (currentSeconds > 9) {
        cardFaceAS.textContent = `${currentSeconds}`;
        digits[3].setAttribute("data-before", `${currentSeconds}`);
      } else {
        cardFaceAS.textContent = `0${currentSeconds}`;
        digits[3].setAttribute("data-before", `0${currentSeconds}`);
      }

      if (secondsDigitAfter > 9) {
        cardFaceBS.textContent = `${secondsDigitAfter}`;
        digits[3].setAttribute("data-after", `${secondsDigitAfter}`);
      } else {
        cardFaceBS.textContent = `0${secondsDigitAfter}`;
        digits[3].setAttribute("data-after", `0${secondsDigitAfter}`);
      }

      transitionTr(currentSeconds, secondsDigitAfter, "seconds");
      if (!cards[3].classList.contains("flipped")) {
        cards[3].classList.add("flipped");
      }
      //minutes
      currentMinutes = Number(`${numberConverter(minutes)}`);
      currentMinutes > 0
        ? (minutesDigitAfter = currentMinutes - 1)
        : (minutesDigitAfter = "59");

      if (currentMinutes > 9) {
        cardFaceAM.textContent = `${currentMinutes}`;
        digits[2].setAttribute("data-before", `${currentMinutes}`);
      } else {
        cardFaceAM.textContent = `0${currentMinutes}`;
        digits[2].setAttribute("data-before", `0${currentMinutes}`);
      }
      if (minutesDigitAfter > 9) {
        cardFaceBM.textContent = `${minutesDigitAfter}`;
        digits[2].setAttribute("data-after", `${minutesDigitAfter}`);
      } else {
        cardFaceBM.textContent = `0${minutesDigitAfter}`;
        digits[2].setAttribute("data-after", `0${minutesDigitAfter}`);
      }

      if (currentSeconds == "0" && currentMinutes != 0) {
        transitionTrM(currentMinutes, minutesDigitAfter, "minutes");
        if (!cards[2].classList.contains("flipped")) {
          cards[2].classList.add("flipped");
        }
      }
      //hours
      currentHours = Number(`${numberConverter(hours)}`);
      currentHours > 0
        ? (hoursDigitAfter = currentHours - 1)
        : (hoursDigitAfter = "23");
      if (currentHours > 9) {
        cardFaceAH.textContent = `${currentHours}`;
        digits[1].setAttribute("data-before", `${currentHours}`);
      } else {
        cardFaceAH.textContent = `0${currentHours}`;
        digits[1].setAttribute("data-before", `0${currentHours}`);
      }
      if (hoursDigitAfter > 9) {
        cardFaceBH.textContent = `${hoursDigitAfter}`;
        digits[1].setAttribute("data-after", `${hoursDigitAfter}`);
      } else {
        cardFaceBH.textContent = `0${hoursDigitAfter}`;
        digits[1].setAttribute("data-after", `0${hoursDigitAfter}`);
      }

      if (currentSeconds == "0" && currentMinutes == "0" && currentHours != 0) {
        transitionTrH(currentHours, hoursDigitAfter, "hours");
        if (!cards[1].classList.contains("flipped")) {
          cards[1].classList.add("flipped");
        }
      }
      //days
      currentDays = Number(`${numberConverter(days)}`);
      currentDays > 0
        ? (daysDigitAfter = currentDays - 1)
        : (daysDigitAfter = "0");
      if (currentDays > 9) {
        cardFaceAD.textContent = `${currentDays}`;
        digitD.setAttribute("data-before", `${currentDays}`);
      } else {
        cardFaceAD.textContent = `0${currentDays}`;
        digitD.setAttribute("data-before", `0${currentDays}`);
      }
      if (daysDigitAfter > 9) {
        cardFaceBD.textContent = `${daysDigitAfter}`;
        digitD.setAttribute("data-after", `${daysDigitAfter}`);
      } else {
        cardFaceBD.textContent = `0${daysDigitAfter}`;
        digitD.setAttribute("data-after", `0${daysDigitAfter}`);
      }

      if (
        currentSeconds == "0" &&
        currentMinutes == "0" &&
        currentHours == "0" &&
        currentDays != 0
      ) {
        transitionTrD(currentDays, daysDigitAfter, "days");
        if (!cardD.classList.contains("flipped")) {
          cardD.classList.add("flipped");
        }
      }
    }
    //counter value becomes zero
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(countdownActive);
      init();
    }
  }, 1000);
}

//*********************** FLIP DIGITS *******************/
function transitionTr(before, after, cl) {
  cards[3].addEventListener(
    "transitionend",
    function () {
      if (before == 0) {
        digits[3].dataset.before = `${59}`;
      } else if (before > 10) {
        digits[3].dataset.before = `${before - 1}`;
      } else {
        digits[3].dataset.before = `0${before - 1}`;
      }

      cardFaceAS.textContent = digits[3].dataset.before;
      const cardClone = cards[3].cloneNode(true);
      cardClone.classList.remove("flipped");
      digits[3].replaceChild(cardClone, cards[3]);
      cards[3] = cardClone;
      cardFacesS = cards[3].querySelectorAll(`.card-face-${cl}`);
      cardFaceAS = cardFacesS[0];
      cardFaceBS = cardFacesS[1];

      digits[3].dataset.after = `${after - 1}`;
      if (Number(digits[3].dataset.after) > 9) {
        cardFaceBS.textContent = digits[3].dataset.after;
      } else {
        cardFaceBS.textContent = `0${digits[3].dataset.after}`;
      }
    },
    { once: true }
  );
}
function transitionTrM(before, after, cl) {
  cards[2].addEventListener(
    "transitionend",
    function () {
      if (before == 0) {
        digits[2].dataset.before = `${59}`;
      } else if (before > 10) {
        digits[2].dataset.before = `${before - 1}`;
      } else {
        digits[2].dataset.before = `0${before - 1}`;
      }
      cardFaceAM.textContent = digits[2].dataset.before;
      const cardClone = cards[2].cloneNode(true);
      cardClone.classList.remove("flipped");
      digits[2].replaceChild(cardClone, cards[2]);
      cards[2] = cardClone;
      cardFacesM = cards[2].querySelectorAll(`.card-face-${cl}`);
      cardFaceAM = cardFacesM[0];
      cardFaceBM = cardFacesM[1];
      digits[2].dataset.after = `${after - 1}`;
      if (Number(digits[2].dataset.after) > 9) {
        cardFaceBM.textContent = digits[2].dataset.after;
      } else {
        cardFaceBM.textContent = `0${digits[2].dataset.after}`;
      }
    },
    { once: true }
  );
}
function transitionTrH(before, after, cl) {
  cards[1].addEventListener(
    "transitionend",
    function () {
      if (before == 0) {
        digits[1].dataset.before = `${23}`;
      } else if (before > 10) {
        digits[1].dataset.before = `${before - 1}`;
      } else {
        digits[1].dataset.before = `0${before - 1}`;
      }
      cardFaceAH.textContent = digits[1].dataset.before;
      const cardClone = cards[1].cloneNode(true);
      cardClone.classList.remove("flipped");
      digits[1].replaceChild(cardClone, cards[1]);
      cards[1] = cardClone;
      cardFacesH = cards[1].querySelectorAll(`.card-face-${cl}`);
      cardFaceAH = cardFacesH[0];
      cardFaceBH = cardFacesH[1];
      digits[1].dataset.after = `${after - 1}`;
      if (Number(digits[1].dataset.after) > 9) {
        cardFaceBH.textContent = digits[1].dataset.after;
      } else {
        cardFaceBH.textContent = `0${digits[1].dataset.after}`;
      }
    },
    { once: true }
  );
}
function transitionTrD(before, after, cl) {
  cards[1].addEventListener(
    "transitionend",
    function () {
      digits[1].dataset.before = `${before - 1}`;
      cardFaceAH.textContent = digits[1].dataset.before;
      const cardClone = cards[1].cloneNode(true);
      cardClone.classList.remove("flipped");
      digits[1].replaceChild(cardClone, cards[1]);
      cards[1] = cardClone;
      cardFacesH = cards[1].querySelectorAll(`.card-face-${cl}`);
      cardFaceAH = cardFacesH[0];
      cardFaceBH = cardFacesH[1];
      digits[1].dataset.after = `${after - 1}`;
      cardFaceBH.textContent = digits[1].dataset.after;
    },
    { once: true }
  );
}

//*****HELPER FUNCTIONS*****/
function numberConverter(number) {
  return (number < 10 ? "0" : "") + number;
}
