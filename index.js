/* Your Code Here */

function createEmployeeRecord(employeeData) {
    const employeeObj = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeObj;
}

function createEmployeeRecords(arrOfEmployees) {
    let arrOfEmployeeObjs = arrOfEmployees.map(employee => {
        return createEmployeeRecord(employee);
    });

    return arrOfEmployeeObjs;
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    });

    return this;
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    });

    return this;
}

function hoursWorkedOnDate(dateStamp) {
    let matchingDateTimeInEvent = this.timeInEvents.find(timeInEvent => timeInEvent.date === dateStamp);
    let matchingDateTimeOutEvent = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateStamp);

    let hoursWorked = (matchingDateTimeOutEvent.hour - matchingDateTimeInEvent.hour) / 100;
    return hoursWorked;

}

function wagesEarnedOnDate(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    return hoursWorked * this.payPerHour;
}

function findEmployeeByFirstName(arrOfEmployeeObjs, firstName) {
    let match = arrOfEmployeeObjs.find(employeeObj => employeeObj.firstName === firstName);
    return match;
}

function calculatePayroll(arrOfEmployeeObjs) {
    let totalPayRoll = arrOfEmployeeObjs.reduce((runningTotal, employeeObj) => {
        return allWagesFor.call(employeeObj) + runningTotal
    }, 0);

    return totalPayRoll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

