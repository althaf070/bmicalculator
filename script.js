const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const tipsText = document.getElementById("tips");
const form = document.querySelector("form");

form.addEventListener("submit", onFormSubmit);
form.addEventListener("reset", onFormReset);

function onFormReset() {
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
  tipsText.textContent = "N/A";
}

function onFormSubmit(e) {
  e.preventDefault();
  calculateBMI();
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const heightInMeters = height / 100; // cm -> m
  const bmi = weight / Math.pow(heightInMeters, 2);
  const desc = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;
  tipsText.innerHTML = getHealthTips(desc);
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}

function getHealthTips(bmiCategory) {
  switch (bmiCategory) {
    case "underweight":
      return "Consider consulting a healthcare provider to determine possible underlying causes and to develop a plan to reach a healthier weight.";
    case "healthy":
      return "Maintain a balanced diet and regular physical activity to keep your BMI in the healthy range.";
    case "overweight":
      return "Incorporate healthy eating and physical activity into your routine to help lower your BMI to a healthier range.";
    case "obese":
      return "Consult with a healthcare provider for personalized advice. Focus on gradual weight loss through a balanced diet and regular exercise.";
    default:
      return "N/A";
  }
}
