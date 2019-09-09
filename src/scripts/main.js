import apiManager from "./apiManager.js";
import domPrinter from "./domPrinter.js";

// When the page loads, fetch all the students from your json-server API
apiManager.getAllStudents().then(parsedStudents => {
  // When the response comes back, send them into the printToDOM function
  domPrinter.printStudentsToDOM(parsedStudents);
});

// ------ CLICK EVENT FOR SUBMIT BUTTON -----//

//  Get a reference to the submit button
const submitButton = document.querySelector("#save-student-button");
// Add an event listener to the submit button
submitButton.addEventListener("click", function() {
  // Inside the click event listener, use document.querySelector().value to capture what the user typed into the text input.
  const userInputValue = document.querySelector("#student-input").value;

  // Conver the input to an object that we'll send to json-server
  const studentObjectToPost = {
    name: userInputValue
  };

  // POST  the student object to json-server
  apiManager
    .postOneStudent(studentObjectToPost)
    .then(apiManager.getAllStudents)
    .then(parsedStudents => {
      domPrinter.printStudentsToDOM(parsedStudents);
    });
});


// ------- CLICK EVENT FOR DELETE BUTTONS ----------//
// Add an event listener to the body element because the delete buttons are loaded dynamically-- they don't exist on page load!
document.querySelector("body").addEventListener("click", () => {
  // If the user clicks on a delete button, do some stuff
  if (event.target.id.includes("delete-student")) {
    // get the unique id of the person you want to delete
    // remember that we gave our delete buttons id attributes of delete-student-uniqueId
    const wordArray = event.target.id.split("-");
    const idOfThingWeWantToDelete = wordArray[2];
    console.log(idOfThingWeWantToDelete);

    // Make a DELETE request to our json-server
    apiManager.deleteOneStudent(idOfThingWeWantToDelete).then(() => {
        // Once the delete is completed, get all the students-- we need to "refresh" the page (kind of)
      apiManager.getAllStudents()
      .then(parsedStudents => {
          // When the students come back, print them to the DOM again
        domPrinter.printStudentsToDOM(parsedStudents);
      });
    });
  }
});

// ------ EDIT EVENT LISTENERS ------//
// Event listener for edit button
document.querySelector("body").addEventListener("click", () => {
    if(event.target.id.includes("edit-student")){
        // Get the id of the thing we want to edit from the button's id attribute
        const wordArray = event.target.id.split("-");
        const idOfThingWeWantToEdit = wordArray[2];


        // Pass that id into our apiManager to bring back the student we want to edit
        apiManager.getOneStudent(idOfThingWeWantToEdit)
        .then(singleStudent => {
            domPrinter.printStudentEditForm(singleStudent)


        })

    }
})


// Event listener for submit button

document.querySelector("body").addEventListener("click", () => {
    if(event.target.id.includes("save-edit")){
        // Get the id of the thing we want to edit
        const wordArray = event.target.id.split("-");
        const idOfThingWeWantToEdit = wordArray[2];
        console.log(idOfThingWeWantToEdit);

        // Get the value of the input
        const editedInputValue = document.querySelector(`#edit-input-${idOfThingWeWantToEdit}`).value


        // Put the input value into an object
        const editedStudentObj = {
            name: editedInputValue
        }

        console.log("this is what we're going to send to the db", editedStudentObj)
        // Send to database w/ PUT method
        apiManager.editOneStudent(idOfThingWeWantToEdit, editedStudentObj)
        .then(() => {
            apiManager.getAllStudents()
            .then(allStudents => {
                domPrinter.printStudentsToDOM(allStudents)
            })
        })



        // Once the PUT is complete, GET all the students from the db
        // Once they students come back from the db, print them to the DOM

    }
})
