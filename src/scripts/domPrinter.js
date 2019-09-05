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
      ).innerHTML += `<div class="student-card">
        <p>${singleStudent.name}</p>
        <button id="delete-student-${singleStudent.id}">Delete</button>
      </div>`;
    });
  }
};

export default domPrinter;
