

// Function that accepts an array of student objects and prints them to the DOM
const printStudentsToDOM = (arrayOfStudentsParam) => {
    // Grab a reference to the output container
    document.querySelector("#student-output-container").innerHTML = ""
    // Loop through the array of students
    arrayOfStudentsParam.forEach(singleStudent => {
        // For each student, print a p tag with their name to the DOM
        document.querySelector("#student-output-container").innerHTML += `<p>${singleStudent.name}</p>`
    })
}


// When the page loads, fetch all the students from your json-server API
fetch("http://localhost:8088/students")
.then(response => response.json())
.then(parsedStudents => {
    // When the response comes back, send them into the printToDOM function
    printStudentsToDOM(parsedStudents)
})


//  Get a reference to the submit button
const submitButton = document.querySelector("#save-student-button");
// Add an event listener to the submit button
submitButton.addEventListener("click", function() {
  // Inside the click event listener, use document.querySelector().value to capture what the user typed into the text input.
  const userInputValue = document.querySelector("#student-input").value;


    // Conver the input to an object that we'll send to json-server
    const studentObjectToPost = {
        name: userInputValue
    }

    // POST  the student object to json-server
  fetch("http://localhost:8088/students", {
    // Replace "url" with your API's URL
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentObjectToPost)
  }).then(() => {
    // When the POST is complete, we need to refresh the page. GET all of the students, including the new one.
    fetch("http://localhost:8088/students")
    .then(response => response.json())
    .then(parsedStudents => {
        // Once the students have come back, print them to the DOM
        printStudentsToDOM(parsedStudents)
    })
  });
});
