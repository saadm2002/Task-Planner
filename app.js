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
        let taskIndex = myTaskManager.tasks.length-1;
        console.log(myTaskManager.tasks[taskIndex]);
        myTaskManager.addTask(myTaskManager.tasks[taskIndex])
    }
})

// Delete Button

document.addEventListener('click', function(event){
    const task = event.target;
    myTaskManager.deleteTask(task);
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
    myTaskManager.tasks.push({
        "Name": inputName,
        "Description": inputDescription,
        "AssignedTo": inputAssignedTo,
        "DueDate": inputDueDate,
        "Status": inputStatus,
        "TaskID": `${taskArray.length < 1 ? 1: taskArray.length +1}`
    })
    return myTaskManager.tasks;
}

class TaskManager {
    constructor(array){
        this.tasks = array;
    }

    getAllTask(){

    }

    addTask(task){

    let HTML = `<div class="col-md-4" taskID="${task.TaskID}">
                    <div class="card">
                    <div class="card-header">Task</div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name: ${task.Name}</li>
                    <li class="list-group-item">Description: ${task.Description}</li>
                    <li class="list-group-item">Assigned To: ${task.AssignedTo}</li>
                    <li class="list-group-item">Due Date: ${task.DueDate}</li>
                    <li class="list-group-item">Status: ${task.Status}</li>
                    </ul>
                    <button type="button" class="btn btn-primary" deleteID="${task.TaskID}">Delete</button>
                    </div>
                    </div>`
    
    let HTMLRow = document.querySelector('#card');
    HTMLRow.innerHTML += HTML;

    let listHTML = `<a href="#" class="list-group-item list-group-item-action" taskID="${task.TaskID}">
    <div class="d-flex justify-content-between">
      <h5 class="mb-1">Assigned To: ${task.AssignedTo}</h5>
      <small>Due Date: ${task.DueDate}</small>
    </div>
    <small>Status: ${task.Status}</small>
  </a>`

    let listHTMLRow = document.querySelector('#taskList');
    listHTMLRow.innerHTML += listHTML;
    }

    deleteTask(task){
        let taskID = task.parentNode.parentNode.attributes.taskID.value;
        for(let i=0; i < this.tasks.length; i++){
            if(this.tasks[i].ID = taskID){
                this.tasks.splice(i,1)
            }
        }

        task.parentNode.parentNode.parentNode.removeChild(task.parentNode.parentNode)

        let taskList = document.querySelectorAll('a');
        for(let i=0; i < taskList.length; i++){
            task = taskList[i];
            if(task.attributes.taskID.value == taskID){
                task.parentNode.removeChild(task);
            }
        }
    }
}
let taskArray = [];

let myTaskManager = new TaskManager(taskArray);