// Create Tasks
document.querySelector('#create').addEventListener('click', function(){
    const inputName = document.querySelector('#inputName').value;
    const inputDescription = document.querySelector('#inputDescription').value;
    const inputAssignedTo = document.querySelector('#inputAssignedTo').value;
    const inputDueDate = document.querySelector('#inputDueDate').value;
    const inputStatus = document.querySelector('#selectStatus').value;

    let allValidations = validateTaskForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus);

    console.log(allValidations);
})

// Validate Inputs

function validateTaskForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus){
    let validation = false;
    
    if((inputName.length >= 3) && (inputDescription.length >= 10) && (inputAssignedTo.length >= 3) && (inputDueDate) && (inputStatus != 'Select:')){
        validation =true;
    }
    return validation;
}