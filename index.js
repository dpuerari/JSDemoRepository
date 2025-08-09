import employees from "./data.json" with { type: "json" };
import createPrompt from "prompt-sync";
let prompt = createPrompt();

function getInput(promptText, validator, transformer) {
  let value = prompt(promptText);
  if (validator && !validator(value)) {
    console.error(`Invalid input: ${value}`);
    process.exit(1);
  }
  return value;
}

// Validation functions ---------------------------------------------------------------------

const isStringInputValid = function (input) {
  return input ? true : false;
};

const isBooleanInputValid = function (input) {
  return input === "yes" || input === "no";
};

const isStartYearInputValid = function (input) {
  const year = Number(input);
  if (!Number.isInteger(year) || year < 1990 || year > 2025) {
    return false;
  }
  return true;
};

const isStartMonthInputValid = function (input) {
  const month = Number(input);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return false;
  }
  return true;
};

const isStartDayInputValid = function (input) {
  const day = Number(input);
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return false;
  }
  return true;
};

// Application commands ---------------------------------------------------------------------

function listEmployees() {
  console.log("Listing all employees:");
  console.log("");

  for (let emp of employees) {
    for (let property in emp) {
      console.log(`${property}: ${emp[property]}`);
    }
    console.log(""); // Add a blank line between employees
    prompt('press "Enter" to continue');
  }
  console.log("End of employee list.");
}

function addEmployee() {
  console.log("Add employee -------------------------");
  console.log("");

  let employee = {};

  employee.firstName = getInput("First name: ", isStringInputValid);
  employee.lastName = getInput("Last name: ", isStringInputValid);
  let startDateYear = getInput(
    "Start year (1990-2025): ",
    isStartYearInputValid
  );
  let startDateMonth = getInput("Start month (1-12): ", isStartMonthInputValid);
  let startDateDay = getInput("Start day (1-31): ", isStartDayInputValid);
  employee.startDate = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );
  employee.isActive = getInput("Is active (yes/no): ", isBooleanInputValid);
  //output the employee object
  const jsonOutput = JSON.stringify(employee, null, 2);
  console.log("Employee object:", jsonOutput);
}

// Get the command the user wants to execute ------------------------------------------------

const command = process.argv[2].toLowerCase();

switch (command) {
  case "list":
    listEmployees();
    break;

  case "add":
    addEmployee();
    break;

  default:
    console.log("Unknown command. Please use 'list' or 'add'.");
    process.exit(1);
}
