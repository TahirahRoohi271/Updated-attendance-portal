const firebaseConfig = {
    apiKey: "AIzaSyDisp6zGEeZxcleRiiBNTvmiPoJslANrT8",
    authDomain: "mini-hackthon-1b4f7.firebaseapp.com",
    projectId: "mini-hackthon-1b4f7",
    storageBucket: "mini-hackthon-1b4f7.appspot.com",
    messagingSenderId: "696214377099",
    appId: "1:696214377099:web:ffb837c760eca55f6cba8e"
  };


firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = auth()
  const storage = firebase.storage();



  function handleImageUpload() {
    const fileInput = document.getElementById("img");
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        // Generate a unique filename for the image (e.g., using a timestamp)
        const timestamp = new Date().getTime();
        const filename = `${timestamp}_${file.name}`;

        // Get a reference to the Firebase Storage location where you want to store the image
        const storageRef = storage.ref(`profile_photos/${filename}`);

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle progress (optional)
            },
            (error) => {
                console.error("Error uploading image:", error);
            },
            () => {
                // Handle successful upload
                console.log("Image uploaded successfully!");
            }
        );
    }
}


  


var selectedRow = null;


function onFormSubmit() {
    if (validateDetails()) { // Call the validateDetails function for the first form
        var formData = readFormData();
        if (selectedRow == null) {
            // Insert new record to Firebase Firestore
            db.collection("Class Details").add(formData)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    displayData(); // Update displayed data
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        } else {
            // Update an existing record in Firebase Firestore
            db.collection("Class Details").doc(selectedRow.id).update(formData)
                .then(function () {
                    console.log("Document updated");
                    displayData(); // Update displayed data
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        }
        resetForm();
    }
}


function readFormData() {
    var formData = {};
    formData["Timing"] = document.getElementById("Timing").value;
    formData["Schedule"] = document.getElementById("Schedule").value;
    formData["TeacherName"] = document.getElementById("TeacherName").value;
    formData["Section"] = document.getElementById("Section").value;
    formData["Course"] = document.getElementById("Course").value;
    formData["batch"] = document.getElementById("batch").value;

    return formData;
}

function resetForm() {
    document.getElementById("Timing").value = "";
    document.getElementById("Schedule").value = "";
    document.getElementById("TeacherName").value = "";
    document.getElementById("Section").value = "";
    document.getElementById("Course").value = "";
    document.getElementById("batch").value = "";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("Timing").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Schedule").value = selectedRow.cells[1].innerHTML;
    document.getElementById("TeacherName").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Section").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Course").value = selectedRow.cells[4].innerHTML;
    document.getElementById("batch").value = selectedRow.cells[5].innerHTML;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        var row = td.parentElement.parentElement;
        db.collection("Class Details").doc(row.id).delete()
            .then(function () {
                console.log("Document deleted");
                displayData(); // Update displayed data
            })
            .catch(function (error) {
                console.error("Error deleting document: ", error);
            });
        resetForm();
    }
}

function validateDetails() { 
    var isValid = true;
    if (document.getElementById("Timing").value === "" || document.getElementById("Schedule").value === "" || document.getElementById("TeacherName").value === "" || document.getElementById("Section").value === "" || document.getElementById("Course").value === "" || document.getElementById("batch").value === "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function displayData() {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // Clear existing table data

    db.collection("Class Details").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var newRow = table.insertRow(table.length);
            newRow.id = doc.id;
            newRow.insertCell(0).innerHTML = doc.data().Timing;
            newRow.insertCell(1).innerHTML = doc.data().Schedule;
            newRow.insertCell(2).innerHTML = doc.data().TeacherName;
            newRow.insertCell(3).innerHTML = doc.data().Section;
            newRow.insertCell(4).innerHTML = doc.data().Course;
            newRow.insertCell(5).innerHTML = doc.data().batch;
            newRow.insertCell(6).innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
        });
    }).catch(function (error) {
        console.error("Error getting documents: ", error);
    });
}

// Initial data retrieval
displayData();




var selectedRow2 = null;

function onFormSubmit2() {
    if (validateStudentDetails()) { // Call the validateStudentDetails function for the second form
        var formData = readFormData2();
        if (selectedRow2 == null) {
            // Insert new record to Firebase Firestore
            db.collection("Student Details").add(formData)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    displayData2(); // Update displayed data
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        } else {
            // Update an existing record in Firebase Firestore
            db.collection("Student Details").doc(selectedRow2.id).update(formData)
                .then(function () {
                    console.log("Document updated");
                    displayData2(); // Update displayed data
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        }
        resetForm2();
    }
}

function readFormData2() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["fName"] = document.getElementById("fName").value;
    formData["rollno"] = document.getElementById("rollno").value;
    formData["contact"] = document.getElementById("contact").value;
    formData["cnic"] = document.getElementById("cnic").value;

    return formData;
}

function resetForm2() {
    document.getElementById("name").value = "";
    document.getElementById("fName").value = "";
    document.getElementById("rollno").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("cnic").value = "";

    selectedRow2 = null;
}

function onEdit2(td) {
    selectedRow2 = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow2.cells[0].innerHTML;
    document.getElementById("fName").value = selectedRow2.cells[1].innerHTML;
    document.getElementById("rollno").value = selectedRow2.cells[2].innerHTML;
    document.getElementById("contact").value = selectedRow2.cells[3].innerHTML;
    document.getElementById("cnic").value = selectedRow2.cells[4].innerHTML;

}

function onDelete2(td) {
    if (confirm('Are you sure to delete this record?')) {
        var row = td.parentElement.parentElement;
        db.collection("Student Details").doc(row.id).delete()
            .then(function () {
                console.log("Document deleted");
                displayData2(); // Update displayed data
            })
            .catch(function (error) {
                console.error("Error deleting document: ", error);
            });
        resetForm2();
    }
}

function validateStudentDetails() { // Validation function for the second form
    var isValid = true;
    if (document.getElementById("name").value === "" || document.getElementById("fName").value === "" || document.getElementById("rollno").value === "" || document.getElementById("contact").value === "" || document.getElementById("cnic").value === "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}

function displayData2() {
    var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // Clear existing table data

    db.collection("Student Details").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log("hello")
            var newRow = table.insertRow(table.length);
            newRow.id = doc.id;
            newRow.insertCell(0).innerHTML = doc.data().name;
            newRow.insertCell(1).innerHTML = doc.data().fName;
            newRow.insertCell(2).innerHTML = doc.data().rollno;
            newRow.insertCell(3).innerHTML = doc.data().contact;
            newRow.insertCell(4).innerHTML = doc.data().cnic;
            newRow.insertCell(5).innerHTML = `<a onClick="onEdit2(this)">Edit</a>
                       <a onClick="onDelete2(this)">Delete</a>`;
        });
    }).catch(function (error) {
        console.error("Error getting documents: ", error);
    });
}

// Initial data retrieval
displayData2();


document.getElementById("subBtn").addEventListener("click", function () {
});



function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('User signed out');
        location.href = "../login/login.html"
        // You can redirect to a different page or update your UI as needed.
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
      });
  }