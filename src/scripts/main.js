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
