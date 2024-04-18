// Problem 1: Create JSON for each employee
const employees = [
    { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
    { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
    { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false }
];

console.log("Problem 1 - Employee JSON:");
console.log(employees);

// Problem 2: Create JSON for the company
const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};

console.log("Problem 2 - Company JSON:");
console.log(company);

// Problem 3: Adding a new employee
company.employees.push({ firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false });

console.log("Problem 3 - Updated Company JSON:");
console.log(company);

// Problem 4: Calculate total salary
const totalSalary = company.employees.reduce((total, employee) => total + employee.salary, 0);

console.log("Problem 4 - Total Salary:");
console.log(totalSalary);

// Problem 5: Raise time
company.employees = company.employees.map(employee => {
    if (employee.raiseEligible) {
        employee.salary *= 1.1; // Increase by 10%
        employee.raiseEligible = false;
    }
    return employee;
});

console.log("Problem 5 - Updated Salaries and Eligibility:");
console.log(company);

// Problem 6: Working from home status
const wfhEmployees = ["Anna", "Sam"];
company.employees = company.employees.map(employee => {
    employee.wfh = wfhEmployees.includes(employee.firstName);
    return employee;
});

console.log("Problem 6 - Employees with WFH Status:");
console.log(company);
