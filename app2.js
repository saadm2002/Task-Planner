// Create Tasks

// document.querySelector('#create').addEventListener('click', function(){



function addButton(){
    const inputName = document.querySelector('#inputName').value;
    const inputDescription = document.querySelector('#inputDescription').value;
    const inputAssignedTo = document.querySelector('#inputAssignedTo').value;
    const inputDueDate = document.querySelector('#inputDueDate').value;
    const inputStatus = document.querySelector('#selectStatus').value;


    let allValidations = validateTaskForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus);
    if(allValidations == true){
        createTask(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus);
        let taskIndex = myTaskManager.tasks.length-1;
        let task = myTaskManager.tasks[taskIndex];
        // console.log(myTaskManager.tasks[taskIndex]);
        myTaskManager.addTask(task);
    }

    console.log("done");
};


// Delete Button

document.addEventListener('click', function(event){
    
    const isButton = (event.target.nodeName == 'BUTTON');
    
    let button = event.target;
    if(isButton == true){
        console.log("button pressed!");
        if(button.getAttribute('id') == "create"){
            addButton();
            
        } else if (button.getAttribute('role') == "delete") {
            const task = event.target;
            myTaskManager.deleteTask(task);
        }
    }
    
    
});
    
    
function validateTaskForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus){
    let validation = false;
    
    if((inputName.length >= 3) && (inputDescription.length >= 10) && (inputAssignedTo.length >= 3) && (inputDueDate) && (inputStatus != 'Select:')){
        validation =true;
    }
    return validation;
}
    
    // Store Tasks Into An Array
    
function createTask(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus) {
    myTaskManager.tasks.push({
        "Name": inputName,
        "Description": inputDescription,
        "AssignedTo": inputAssignedTo,
        "DueDate": inputDueDate,
        "Status": inputStatus,
        "TaskID": `${myTaskManager.tasks.length < 1 ? 1: myTaskManager.tasks.length +1}`
    })

    console.log(myTaskManager.tasks);
    localStorage.setItem("allTasks", JSON.stringify(myTaskManager.tasks));
    return myTaskManager.tasks;
    
}
    
class TaskManager {
    constructor(){
        this.tasks = [];
    }

    getAllTask(){
        console.log(this.tasks);
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
                        <button type="button" role="delete" class="btn btn-primary" deleteID="${task.TaskID}">Delete</button>
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
            if(this.tasks[i].TaskID == taskID){
                this.tasks.splice(i,1)
                localStorage.setItem("allTasks", JSON.stringify(myTaskManager.tasks));
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
    

    
let myTaskManager = new TaskManager();


let dataReturned = localStorage.getItem("allTasks");

if(dataReturned){
    myTaskManager.tasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.tasks)
} else {
    myTaskManager.tasks = [];
}


function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}