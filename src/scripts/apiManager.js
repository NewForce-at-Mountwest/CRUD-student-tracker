const apiManager = {
  // Method to get all students
  getAllStudents: () => {
    return fetch("http://localhost:8088/students").then(response =>
      response.json()
    );
  },
  getOneStudent: studentId => {
    return fetch(`http://localhost:8088/students/${studentId}`).then(response =>
      response.json()
    );
  },
  // Method to post one student
  postOneStudent: singleStudentObject =>
    fetch("http://localhost:8088/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleStudentObject)
    }),
  deleteOneStudent: id =>
    fetch(`http://localhost:8088/students/${id}`, {
      method: "DELETE"
    }),
    editOneStudent: (id, studentObject) => {
        return  fetch(`http://localhost:8088/students/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(studentObject)
          })
    }
};

export default apiManager;
