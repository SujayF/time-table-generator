
// helper function for Entry
const handleEntry = ( inputId, tableId, storageKey ) => {
    const value = document.getElementById( inputId ).value.trim();
    if( !value ) return;

    addRowToTable( tableId, value );
    updateStorageArray( storageKey, value ); 

    document.getElementById(inputId).value = ""; //Reset Input
}

// function to take input for Courses
function myFunction() {
  handleEntry("courseName", "myTable", "courses");
}

// function to take input for Labs
function addLab() {
  handleEntry("labInput", "labTable", "labs");
}

// function to take input for additional-Courses
function adCrs() {
  handleEntry("adCourse", "addCourse", "adCOURSES");
}


const addRowToTable = ( tableId, value ) => {

     const tbl = document.getElementById ( tableId ); 
     if( !tbl ) return;

     const row = tbl.insertRow();
     const cell = row .insertCell();
     cell.textContent = value;
}

const updateStorageArray = ( storageKey, value ) => {
    const array = JSON.parse( localStorage.getItem( storageKey ) ) || [];
    array.push( value );
    localStorage.setItem( storageKey, JSON.stringify(array) );
}

function deleteRow() {
  const tbl = document.getElementById("myTable");
  const numRows = tbl.rows.length;
  if ( numRows > 1 ) {
    // Delete the last row from the table
    tbl.deleteRow( numRows-1 );
    
    // Delete the corresponding data from local storage
    courses = JSON.parse(localStorage.getItem("courses"));
    courses.pop();
    localStorage.setItem("courses", JSON.stringify(courses));
  }
}

function populateLectures() {
         
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const labs = JSON.parse(localStorage.getItem("labs")) || [];
    const adCourses = JSON.parse(localStorage.getItem("adCOURSES")) || [];

    Array.from(document.getElementsByClassName("lecture")).forEach(cell => {
      cell.innerHTML = getRandomItem(courses) || "No Course";
    });

    Array.from(document.getElementsByClassName("L-Output")).forEach(cell => {
      cell.innerHTML = getRandomItem(labs) || "No Lab";
    });

    Array.from(document.getElementsByClassName("Output")).forEach(cell => {
      cell.innerHTML = getRandomItem(adCourses) || "No Additional Course";
    });

    console.log( adCourses )

}
