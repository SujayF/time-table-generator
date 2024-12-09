

var courses = [];

function myFunction() {
  var tbl = document.getElementById("myTable");
  var row = tbl.insertRow();
  var cell1 = row.insertCell();
  cell1.id = "courseCell";
  cell1.innerHTML = document.getElementById("courseName").value;

  courses = []; // clear the array
  for (var i = 1; i < tbl.rows.length; i++) {
    var row = tbl.rows[i];
    var courseCell = row.cells.namedItem("courseCell");
    var course = courseCell.textContent.trim();
    courses.push(course);
  }

  localStorage.setItem("courses", JSON.stringify(courses));
}


function deleteRow() {
  var tbl = document.getElementById("myTable");
  var numRows = tbl.rows.length;
  if (numRows > 1) {
    // Delete the last row from the table
    tbl.deleteRow(numRows-1);
    
    // Delete the corresponding data from local storage
    courses = JSON.parse(localStorage.getItem("courses"));
    courses.pop();
    localStorage.setItem("courses", JSON.stringify(courses));
  }
}

function addLab() {
  var labTable = document.getElementById("labTable");
  var labInput = document.getElementById("labInput");

  // Insert a new row at the end of the table
  var newRow = labTable.insertRow(-1);

  // Insert a new cell in the new row
  var newCell = newRow.insertCell(0);

  // Create a text node with the value of the lab input
  var newText = document.createTextNode(labInput.value);

  // Add the text node to the new cell
  newCell.appendChild(newText);

  // Reset the lab input field
  labInput.value = "";

  // Get the existing labs array from session storage or create a new one if it doesn't exist
  var labs = JSON.parse(sessionStorage.getItem("labs")) || [];

  // Add the new lab name to the labs array
  labs.push(newText.textContent);

  // Save the updated labs array back to session storage
  sessionStorage.setItem("labs", JSON.stringify(labs));
  
}


function adCrs() {
  var tbl = document.getElementById("addCourse");
  var courseName = document.getElementById("adCourse").value;
  var row = tbl.insertRow();
  var cell = row.insertCell();
  cell.innerHTML = courseName;
  document.getElementById("adCourse").value = "";
   
  var adCOURSES = JSON.parse(sessionStorage.getItem("adCOURSES")) || []; // get existing courses or create a new array
  adCOURSES.push(courseName); // add the new course name to the array
  sessionStorage.setItem("adCOURSES", JSON.stringify(adCOURSES)); // save the updated courses array back to session storage

}


function populateLectures() {
  // Get the courses array from local storage
  var courses = JSON.parse(localStorage.getItem("courses")) || [];

  // Get the labs array from session storage
  var labs = JSON.parse(sessionStorage.getItem("labs")) || [];

  // Get the adCOURSES array from session storage
  var adCOURSES = JSON.parse(sessionStorage.getItem("adCOURSES")) || [];

  // Get all the cells with class "Lecture"
  var lectureCells = document.getElementsByClassName("lecture");

  // Loop through each Lecture cell and set its value to a random course
  for (var i = 0; i < lectureCells.length; i++) {
    var randomCourse = courses[Math.floor(Math.random() * courses.length)];
    lectureCells[i].innerHTML = randomCourse;
  }

  // Set the inner HTML of the L-Output cell to a random lab
  var lOutputCells = document.getElementsByClassName("L-Output");
  for (var i = 0; i < lOutputCells.length; i++) {
    var randomLab = labs[Math.floor(Math.random() * labs.length)];
    lOutputCells[i].innerHTML = randomLab;
  }

  // Set the inner HTML of the Output cell to a random ad course
  var outputCells = document.getElementsByClassName("Output");
  for (var i = 0; i < outputCells.length; i++) {
    var randomAdCourse = adCOURSES[Math.floor(Math.random() * adCOURSES.length)];
    outputCells[i].innerHTML = randomAdCourse;
  }
}

