import employees from "./data.json" assert { type: "json" };
import createPrompt from "prompt-sync";
let prompt = createPrompt();

let employee = {};

//first name validation
let firstName = prompt("Enter first name: ");
if (!firstName) {
  console.log("First name is required.");
  process.exit(1);
}
employee.firstName = firstName;

//last name validation
let lastName = prompt("Enter last name: ");
if (!lastName) {
  console.log("Last name is required.");
  process.exit(1);
}
employee.lastName = lastName;

//year validation
let startDateYear = prompt("Enter start year (1990-2025): ");
startDateYear = Number(startDateYear);
if (!Number.isInteger(startDateYear)) {
  console.log("Start year must be an integer.");
  process.exit(1);
}

if (startDateYear < 1990 || startDateYear > 2025) {
  console.log("Start year must be between 1990 and 2025.");
  process.exit(1);
}

//month validation
let startDateMonth = prompt("Enter start month (1-12): ");
startDateMonth = Number(startDateMonth);

if (!Number.isInteger(startDateMonth)) {
  console.log("Start month must be an integer.");
  process.exit(1);
}

if (startDateMonth < 1 || startDateMonth > 12) {
  console.log("Start month must be between 1 and 12.");
  process.exit(1);
}

//day validation
let startDateDay = prompt("Enter start day (1-31): ");
startDateDay = Number(startDateDay);
if (!Number.isInteger(startDateDay)) {
  console.log("Start day must be an integer.");
  process.exit(1);
}
if (startDateDay < 1 || startDateDay > 31) {
  console.log("Start day must be between 1 and 31.");
  process.exit(1);
}
employee.startDate = new Date(startDateYear, startDateMonth - 1, startDateDay);

let isActive = prompt("Is the employee active? (yes/no): ").toLowerCase();
if (isActive !== "yes" && isActive !== "no") {
  console.log('Please enter "yes" or "no".');
  process.exit(1);
}
employee.isActive = isActive === "yes";

//output the employee object
const jsonOutput = JSON.stringify(employee, null, 2);
console.log("Employee object:", jsonOutput);
