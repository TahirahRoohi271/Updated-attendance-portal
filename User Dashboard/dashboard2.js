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
// const auth = auth()

// Event listener for the "Mark Attendance" button
document.getElementById("markAttendance").addEventListener("click", () => {
  const course = document.getElementById("courseStatus").value;
  const rollNumber = document.getElementById("rollNumber").value;
  const attendanceStatus = document.getElementById("attendanceStatus").value;

  // Check if the attendance already exists for the same course and roll number
  db.collection("attendance")
    .where("course", "==", course)
    .where("rollNumber", "==", rollNumber)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        // Attendance doesn't exist, add it to Firestore
        db.collection("attendance")
          .add({
            course,
            rollNumber,
            status: attendanceStatus,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            Swal.fire("Success!", "Attendance marked successfully!", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", "Error adding attendance: " + error.message, "error");
          });
      } else {
        // Attendance already exists
        Swal.fire("Error!", "Please select all fields.", "error");
      }
    })
    .catch((error) => {
      Swal.fire("Error!", "Error checking attendance: " + error.message, "error");
    });
});
