// Create Tasks

document.querySelector('#create').addEventListener('click', function(){
    const inputName = document.querySelector('#inputName').value;
    const inputDescription = document.querySelector('#inputDescription').value;
    const inputAssignedTo = document.querySelector('#inputAssignedTo').value;
    const inputDueDate = document.querySelector('#inputDueDate').value;
    const inputStatus = document.querySelector('#selectStatus').value;

    let allValidations = validateTaskForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus);
    if(allValidations == true){
        createTask(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus, taskArray);
    }
    console.log(taskArray)
})

// Validate Inputs

function validateTaskForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus){
    let validation = false;
    
    if((inputName.length >= 3) && (inputDescription.length >= 10) && (inputAssignedTo.length >= 3) && (inputDueDate) && (inputStatus != 'Select:')){
        validation =true;
    }
    return validation;
}

// Store Tasks Into An Array

function createTask(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus, taskArray) {
    taskArray.push({
        "Name": inputName,
        "Description": inputDescription,
        "AssignedTo": inputAssignedTo,
        "DueDate": inputDueDate,
        "Status": inputStatus,
        "TaskID": `${taskArray.length < 1 ? 1: taskArray.length +1}`
    })
    return taskArray;
}

class TaskManager {
    constructor(){
        this.tasks = array;
    }

    getAllTask(){

    }

    addTask(){

    }

    deleteTask(){

    }
}

let taskArray = [];

let myTaskManager = new TaskManager(taskArray);