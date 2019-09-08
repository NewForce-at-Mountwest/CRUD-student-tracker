const domPrinter = {
  // method that accepts an array of student objects and prints them to the DOM
  printStudentsToDOM: arrayOfStudentsParam => {
    // Grab a reference to the output container
    document.querySelector("#student-output-container").innerHTML = "";
    // Loop through the array of students
    arrayOfStudentsParam.forEach(singleStudent => {
      // For each student, print a p tag with their name to the DOM
      document.querySelector(
        "#student-output-container"
      ).innerHTML += `<div class="student-card" id="student-card-${singleStudent.id}">
        <p>${singleStudent.name}</p>
        <button id="delete-student-${singleStudent.id}">Delete</button>
        <button id="edit-student-${singleStudent.id}">Edit</button>
      </div>`;
    });
  },
  printEditForm: studentObject => {
    document.querySelector(`#student-card-${studentObject.id}`).innerHTML = `<div>
      <input type="text" id="edit-input-${studentObject.id}" value="${studentObject.name}">
      <button id="submit-edit-${studentObject.id}">Save</button>
    </div>`
  }
};

export default domPrinter;
