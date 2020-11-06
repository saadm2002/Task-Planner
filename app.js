document.querySelector('#addbutton').addEventListener('click', function(){
    const inputName = document.querySelector('#nameInput').value;
    const inputAssignedTo = document.querySelector('#assignedInput').value;
    const inputDes = document.querySelector('#descriptionInput').value;
    const inputDueD = document.querySelector('#dateInput').value;
    const inputStatus = document.querySelector('#statusInput').value;

    let allChecksPassed = validateForm(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus);

    if(allChecksPassed == true){
        createTaskObject(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus, myTaskManager.allTasks);
        let taskIndex = myTaskManager.allTasks.length-1;
        //test
        console.log(myTaskManager.allTasks[taskIndex]);
        myTaskManager.addTask(myTaskManager.allTasks[taskIndex])
    }

})


document.addEventListener('click', function(event){
    const isButton = (event.target.nodeName == 'BUTTON');
    console.log(event.target);
    if(isButton) {
        const element = event.target;
        let buttonJob = element.attributes.job.value;
        if(buttonJob == 'delete') {
            myTaskManager.deleteTask(element);
        }  else if (buttonJob == 'update') {
            myTaskManager.updateTask(element);
        } 
    }
})


function validateForm(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus) {
    //return of this is the answer to 'is the info valid format?'
    let isAllValid = false;
    if((inputName.length >= 3) && (inputAssignedTo.length >= 3) && (inputDes.length >=10) && (inputDueD) && (inputStatus != 'Choose...')){
        isAllValid =true;
    }
    return isAllValid;  
}

function createTaskObject(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus, myTaskArray){
    myTaskManager.allTasks.push({
       "Name": inputName,
       "AssignedTo": inputAssignedTo,
       "Des": inputDes,
       "DueD": inputDueD,
       "Status": inputStatus,
       "ID": `${myTaskArray.length < 1 ? 1 : myTaskArray.length+1}`
    })
    localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
    return myTaskManager.allTasks ;
}


class TaskManager {
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

    getAllTasks(){
        console.log(this.allTasks);


    }

    addTask(taskObj){
         let cardHTML =   `<div class="col-md-4" taskID="${taskObj.ID}">
                        <div class="card cardStyle">
                            <div class="card-header">
                                Task
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name: ${taskObj.Name} </li>
                                <li class="list-group-item">Assigned To: ${taskObj.AssignedTo} </li>
                                <li class="list-group-item">Due Date: ${taskObj.DueD} </li>
                                <li class="list-group-item">Description : ${taskObj.Des} </li>
                                <li class="list-group-item">Status: ${taskObj.Status} </li>
                            </ul>
                            <button type="button" class="btn btn-dark" job="delete" deleteID="${taskObj.ID}">Delete</button>
                            <a href='#form'><button type="button" class="btn btn-dark" job="update" deleteID="${taskObj.ID}">Update</button><a>
                        </div>
                    </div>`

        let cardsHTMLrow = document.querySelector('#cardsArea');
        cardsHTMLrow.innerHTML += cardHTML;


        let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                            <small>Due Date: ${taskObj.DueD} </small>
                        </div>
                        <small>Status: ${taskObj.Status}</small>
                        </a>`

        let listHTMLrow = document.querySelector('#tasksList');
        listHTMLrow.innerHTML += listHTML;          

    }

    deleteTask(element){
            
    //this removes the item from the array perm
    let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
    for(let i=0; i < this.allTasks.length; i++){
        if(this.allTasks[i].ID == thistaskID){
            this.allTasks.splice(i,1);
            localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
        }
    }

    console.log(this.allTasks);

    //removes card 
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)

    //removes task
    let elementsA = document.querySelectorAll('a');
    for(let i=0; i < elementsA.length; i++){
        element = elementsA[i];
        if(element.attributes.taskID.value == thistaskID){
            element.parentNode.removeChild(element);
        }
    }

    }

    updateTask(element){
        let currentTask = {};
        let currentTaskID = element.parentNode.parentNode.parentNode.attributes.taskID.value;
        // console.log("TaskID", currentTaskID);
        for(let i = 0; i < this.allTasks.length; i++) {
            if(this.allTasks[i].ID == currentTaskID) {
                currentTask = this.allTasks[i];
                // console.log("current task", currentTask);
            }
        }       //set the values of the from with the exising task data 

        document.querySelector('#nameInput').value = currentTask.Name;
        document.querySelector('#descriptionInput').value = currentTask.Des;
        document.querySelector('#assignedInput').value = currentTask.AssignedTo;
        document.querySelector('#dateInput').value = currentTask.DueD;
        document.querySelector('#addbutton').outerHTML = `<button type="button" id="saveUpdate" class="btn btn-primary" job="saveUpdate">Save</button>`;

        // change the array when save button clicked
        document.querySelector('#saveUpdate').addEventListener('click', function () {

            const inputName = document.querySelector('#nameInput').value;
            const inputAssignedTo = document.querySelector('#assignedInput').value;
            const inputDes = document.querySelector('#descriptionInput').value;
            const inputDueD = document.querySelector('#dateInput').value;
            const inputStatus = document.querySelector('#statusInput').value;


            let allChecksPassed = validateForm(inputName, inputAssignedTo, inputDes, inputDueD, inputStatus);

            if(allChecksPassed == true){
                currentTask.Name = document.querySelector('#nameInput').value
                currentTask.Description = document.querySelector('#descriptionInput').value
                currentTask.AssignedTo = document.querySelector('#assignedInput').value;
                currentTask.DueDate = document.querySelector('#dateInput').value;
                currentTask.Status = document.querySelector('#statusInput').value;
                localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));

            // console.log(myTaskManager.allTasks);
                document.querySelector('#saveUpdate').innerHTML = `<button type="button" id="submitButton" job="addItem">Add Item</button>`;
                location.reload();
            }
        });
    }
}


let myTaskManager = new TaskManager("TaskyMcTask");

//this gets the data back from local storage
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
    myTaskManager.allTasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.allTasks)
} else {
    myTaskManager.taskArray = [];
}


function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}