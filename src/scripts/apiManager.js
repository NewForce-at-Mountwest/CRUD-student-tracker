const apiManager = {
  // Method to get all students for the logged in user
  getAllStudents: () => {
    return fetch(`http://localhost:8088/students?userId=${localStorage.getItem("userId")}`).then(response =>
      response.json()
    );
  },
  getOneStudent: studentId => {
    return fetch(`http://localhost:8088/students/${studentId}`).then(response =>
      response.json()
    );
  },
  // Method to post one student
  postOneStudent: singleStudentObject => {
    debugger;
    return fetch("http://localhost:8088/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleStudentObject)
    })
  },
  deleteOneStudent: id =>
    fetch(`http://localhost:8088/students/${id}`, {
      method: "DELETE"
    }),
  editOneStudent: (id, studentObject) => {
    return fetch(`http://localhost:8088/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentObject)
    });
  },
  getOneUserByUsername: username => {
    return fetch(`http://localhost:8088/users?name=${username}`).then(response =>
      response.json()
    );
  }
};

export default apiManager;
