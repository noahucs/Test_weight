/*
Name: [Your name and group members]
Date: September 28, 2026
Program: Weight converter for the measurement website.
The user enters one weight or a comma-separated list of weights.
The user chooses kilograms to pounds or pounds to kilograms.
The program checks the input and converts each weight using the chosen formula.
It displays each original weight with its converted result or an error message.
*/

// Return an arrow function that converts one value or an array of values.
function getWeightConverter(fromUnit, toUnit) {
  let convertOne;

  if (fromUnit === "kg" && toUnit === "lb") {
    convertOne = value => value / 0.45359237;
  } else if (fromUnit === "lb" && toUnit === "kg") {
    convertOne = value => value * 0.45359237;
  } else {
    throw new Error("Unsupported units.");
  }

  return values => Array.isArray(values)
    ? values.map(convertOne)
    : convertOne(values);
}

// Read one number or a comma-separated list of numbers.
function readValues(text) {
  const parts = text.split(",").map(part => part.trim());

  if (parts.some(part => part === "" || !Number.isFinite(Number(part)))) {
    throw new Error("Enter a number or a list such as 5, 10, 20.");
  }

  const numbers = parts.map(part => Number(part));
  return numbers.length === 1 ? numbers[0] : numbers;
}

// Convert when the form is submitted and display the result.
document.getElementById("weight-form").addEventListener("submit", event => {
  event.preventDefault();

  const result = document.getElementById("result");
  const resultBox = document.getElementById("result-box");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";
  resultBox.classList.add("hidden");

  try {
    const direction = document.getElementById("direction").value.split("-");
    const input = readValues(document.getElementById("values").value);
    const converted = getWeightConverter(direction[0], direction[1])(input);
    const format = value => Number(value.toFixed(4));

    const originalValues = Array.isArray(input) ? input : [input];
    const convertedValues = Array.isArray(converted) ? converted : [converted];

    result.textContent = originalValues
      .map((value, index) =>
        `${value} ${direction[0]} = ${format(convertedValues[index])} ${direction[1]}`
      )
      .join("\n");

    resultBox.classList.remove("hidden");
  } catch (problem) {
    error.textContent = problem.message;
  }
});