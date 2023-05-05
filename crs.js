/*function myFunction(){
    var tbl = document.getElementById("myTable");
    var row = tbl.insertRow();
    var cell1= row.insertCell();
    var cell2= row.insertCell();
    cell1.innerHTML = document.getElementById("courseName").value;
    cell2.innerHTML = document.getElementById("facultyName").value;
 
    In the second implementation of myFunction(), the cells are created without IDs. This means that you cannot access them easily by ID later, but you can still manipulate their content or style using other methods, such as traversing the table structure or using the querySelector() method.

   In summary, adding IDs to elements can be useful for later manipulation, but it is not strictly necessary for basic table insertion.
 

}*/


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
  console.log(courses);
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

   console.log(courses)
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
  
  console.log(labs);
}
