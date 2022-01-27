let overlay = document.getElementById("overlay");
let submitBtn = document.getElementById("submit-btn");
let customTip = document.getElementById("custom-tip");
let myBill = document.getElementById("bill");
let numOfPeople = document.getElementById("num-ppl");
let five = document.getElementById("five");
let ten = document.getElementById("ten");
let fifteen = document.getElementById("fifteen");
let twentyFive = document.getElementById("twenty-five");
let fifty = document.getElementById("fifty");
let custom = document.getElementById("custom");
let tipPer = document.getElementById("tip-amount");
let totalPlusTip = document.getElementById("total-plus-tip");
let resetBtn = document.getElementById("reset-btn");

let billTotal = 0;
let totalPeople = 0;
let customTipEntered = 0;

// Handles the bill input field and removes the inactive class from the reset
// button when there is a value present
function handleInput(event) {
  if (event.target.value != "") {
    resetBtn.classList.remove("inactive");
  } else {
    resetBtn.classList.add("inactive");
  }
  billTotal = event.target.value;
}

// Handles the number of people splitting the bill input field and removes the inactive
// class from the reset button when there is a value present
function handlePeople(event) {
  if (event.target.value != "") {
    resetBtn.classList.remove("inactive");
  } else {
    resetBtn.classList.add("inactive");
  }
  totalPeople = event.target.value;
}

myBill.addEventListener("input", handleInput);
numOfPeople.addEventListener("input", handlePeople);

// Main logic to calculate the results. Tip parameter is based on which tip % button was
// pressed. Uses turnary to display outputs and prevent NaN from appearing.
function calculateTotals(tip) {
  let tipTotal = (billTotal / totalPeople) * tip;
  tipPer.textContent =
    tipTotal.toFixed(2) === "NaN" ? "$0.00" : "$" + tipTotal.toFixed(2);
  totalPlusTip.textContent =
    tipTotal.toFixed(2) === "NaN"
      ? "$0.00"
      : "$" + (billTotal / totalPeople + tipTotal).toFixed(2);
}

// Handles the custom tip % input value and assigns it to a variable
function handleCustomTip(event) {
  customTipEntered = event.target.value;
}

customTip.addEventListener("input", handleCustomTip);

// Applies custom tip value and removes modal overlay
function handleTip() {
  calculateTotals(customTipEntered * 0.01);
  overlay.style.display = "none";
}

// Custom tip submit button
submitBtn.addEventListener("click", handleTip);

// Resets all values to original states and prepares for new calculation
function resetFeilds() {
  tipPer.textContent = "$0.00";
  totalPlusTip.textContent = "$0.00";
  myBill.value = "";
  numOfPeople.value = "";
  billTotal = 0;
  totalPeople = 0;
  customTipEntered = 0;
  customTip.value = "";
  resetBtn.classList.add("inactive");
}

// displays modal for custom tip %
function customModal() {
  overlay.style.display = "flex";
}

// tip % buttons using a callback with the appropriate tip values as paramaters
five.addEventListener("click", () => calculateTotals(0.05));
ten.addEventListener("click", () => calculateTotals(0.1));
fifteen.addEventListener("click", () => calculateTotals(0.15));
twentyFive.addEventListener("click", () => calculateTotals(0.25));
fifty.addEventListener("click", () => calculateTotals(0.5));
custom.addEventListener("click", customModal);

// reset button
resetBtn.addEventListener("click", resetFeilds);
