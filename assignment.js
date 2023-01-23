let detailsArray = [];
var isEditPressed = false;
var editIndex = 0;
//var count = 0;
function addPress() {
  let nameInput = document.getElementById("nameInput");
  let cityInput = document.getElementById("cityInput");
  let feesInput = document.getElementById("feesInput");

  if (validateFields()) {
    //count++;
    if (isEditPressed) {
      let student_name = nameInput.value;
      let student_city = cityInput.value;
      let student_fees = feesInput.value;

      let aStudent = new CreateStudent(
        student_name,
        student_city,
        student_fees
      );

      detailsArray.splice(editIndex, 1, aStudent);

      nameInput.value = "";
      cityInput.value = "";
      feesInput.value = "";

      deleteWholeTable();
      updateWholeTable();
    } else {
      let student_name = nameInput.value;
      let student_city = cityInput.value;
      let student_fees = feesInput.value;

      let aStudent = new CreateStudent(
        student_name,
        student_city,
        student_fees
      );
      detailsArray.push(aStudent);

      nameInput.value = "";
      cityInput.value = "";
      feesInput.value = "";

      addTableRow();
      executeAllFunctions();
    }
  } else {
    alert("Please do not keep the field empty");
  }
}

class CreateStudent {
  constructor(name, city, fees) {
    this.name = name;
    this.city = city;
    this.fees = fees;
  }
}

function validateFields() {
  if (
    document.getElementById("nameInput").value == "" ||
    document.getElementById("cityInput").value == "" ||
    document.getElementById("feesInput").value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function addTableRow() {
  let aName, aCity, aFees, aNum;

  for (
    let i = detailsArray.length - 1 /* count-1 */;
    i < detailsArray.length;
    i++
  ) {
    aName = detailsArray[i].name;
    aCity = detailsArray[i].city;
    aFees = detailsArray[i].fees;
    aNum = parseInt(i) + 1;

    const studentListTable = document.getElementById("studentListTable");
    let newRow = studentListTable.insertRow();
    newRow.classList.add("dataRows");
    let newCell1 = newRow.insertCell();
    let newCell2 = newRow.insertCell();
    let newCell3 = newRow.insertCell();
    let newCell4 = newRow.insertCell();
    let newCell5 = newRow.insertCell();
    newCell1.style.padding = "20px";
    newCell2.style.padding = "20px";
    newCell3.style.padding = "20px";
    newCell4.style.padding = "20px";
    newCell5.style.padding = "20px";

    newCell1.innerHTML = aNum + ".";
    newCell2.innerHTML = aName;
    newCell3.innerHTML = aCity;
    newCell4.innerHTML = "$" + aFees;
    newCell5.innerHTML = `<button onclick="editPress(this,${i})">Edit</button>&nbsp;<button onclick="deletePress(this,${i})">Delete</button>`;
  }
}

function getFeesArr() {
  let feesArr = [];
  for (let obj of detailsArray) {
    let numFees = parseInt(obj.fees);
    feesArr.push(numFees);
  }
  return feesArr;
}

function getNamesArr() {
  let namesArr = [];
  for (let obj of detailsArray) {
    namesArr.push(obj.name);
  }
  return namesArr;
}

function getCityArr() {
  let cityArr = [];
  for (let obj of detailsArray) {
    cityArr.push(obj.city);
  }
  return cityArr;
}

function calculateTotalFees() {
  let arr = getFeesArr();
  let feeSum = arr.reduce((sum, currValue) => sum + currValue, 0);
  let dvFees = document.getElementById("totalFees");
  dvFees.innerHTML = "$" + feeSum;
}

function calculateTotalStudents() {
  let dvNumOfStudents = document.getElementById("totalNumberOfStudents");
  dvNumOfStudents.innerHTML = detailsArray.length;
}

function studentsWithR() {
  let arr = getNamesArr();
  let rCount = 0;
  let str = "";
  for (let element of arr) {
    str = element.toString();
    if (str.startsWith("R") || str.startsWith("r")) {
      rCount++;
    }
  }
  let dvNameWithR = document.getElementById("totalStudentsWithR");
  dvNameWithR.innerHTML = rCount;
}

function cityNameOf4thStudent() {
  let arrOfCity = getCityArr();
  let dvNameOf4thStudent = document.getElementById("nameOf4thStudent");
  if (arrOfCity.length < 4) {
    dvNameOf4thStudent.innerHTML = "N/A";
  } else {
    dvNameOf4thStudent.innerHTML = arrOfCity[3];
  }
}

function totalFeesOf3rdAnd5thStudent() {
  let anotherFeesArr = getFeesArr();
  let dvFee3And5 = document.getElementById("feesOf3rdAnd5th");

  if (anotherFeesArr.length < 3) {
    dvFee3And5.innerHTML = "N/A";
  } else if (anotherFeesArr.length < 5) {
    dvFee3And5.innerHTML = "$" + anotherFeesArr[2];
  } else {
    let tf = anotherFeesArr[2] + anotherFeesArr[4];
    dvFee3And5.innerHTML = "$" + tf;
  }
}

function feesBetween2And39() {
  let anotherFeesArr2 = getFeesArr();
  let dvFeeBetn2And39 = document.getElementById("feesBetween2And39");
  let f239Count = 0;

  for (let element of anotherFeesArr2) {
    if (element >= 2000 && element <= 3900) {
      f239Count++;
    }
  }
  dvFeeBetn2And39.innerHTML = f239Count;
}

function feesLessThan1() {
  let anotherFeesArr3 = getFeesArr();
  let dvFeeLessThan1 = document.getElementById("feesLessThan1");
  let flt1Count = 0;

  for (let element of anotherFeesArr3) {
    if (element < 1000) {
      flt1Count++;
    }
  }

  dvFeeLessThan1.innerHTML = flt1Count;
}

function numberOfSStudentsAndChCity() {
  let arrOfName2 = getNamesArr();
  let arrOfCity2 = getCityArr();
  let dvSAndCh = document.getElementById("numberOfStudentsAnd");
  let nameSAndChCount = 0;

  for (let i = 0; i < arrOfCity2.length; i++) {
    if (arrOfName2[i].startsWith("S") && arrOfCity2[i].startsWith("Ch")) {
      nameSAndChCount++;
    }
  }

  dvSAndCh.innerHTML = nameSAndChCount;
}

function numberOfJStudentsOrHCity() {
  let arrOfName3 = getNamesArr();
  let arrOfCity3 = getCityArr();
  let dvJOrH = document.getElementById("numberOfStudentsOr");
  let nameJOrHCount = 0;

  for (let i = 0; i < arrOfCity3.length; i++) {
    if (arrOfName3[i].startsWith("J") || arrOfCity3[i].startsWith("H")) {
      nameJOrHCount++;
    }
  }
  dvJOrH.innerHTML = nameJOrHCount;
}

function minMaxFees() {
  let anotherFeesArr4 = getFeesArr();
  let dvMinFees = document.getElementById("minFees");
  let dvMaxFees = document.getElementById("maxFees");

  let min = anotherFeesArr4[0];
  let max = anotherFeesArr4[0];

  for (let element of anotherFeesArr4) {
    if (element < min) min = element;
    if (element > max) max = element;
  }
  minString = "Min Fees =  " + min;
  maxString = " , Max Fees = " + max;

  dvMinFees.innerHTML = minString;
  dvMaxFees.innerHTML = maxString;
}

function editPress(element, i) {
  //   alert("edit pressed");
  isEditPressed = true;
  let nameInput = document.getElementById("nameInput");
  let cityInput = document.getElementById("cityInput");
  let feesInput = document.getElementById("feesInput");

  nameInput.value = detailsArray[i].name;
  cityInput.value = detailsArray[i].city;
  feesInput.value = detailsArray[i].fees;

  editIndex = i;
}

function deletePress(element, i) {
  let delRow = element.parentNode.parentNode;
  delRow.remove();
  detailsArray.splice(i, 1);
  deleteWholeTable();
  updateWholeTable();
}

function updateWholeTable() {
  let aName, aCity, aFees, aNum;

  for (let i = 0 /* count-1 */; i < detailsArray.length; i++) {
    aName = detailsArray[i].name;
    aCity = detailsArray[i].city;
    aFees = detailsArray[i].fees;
    aNum = parseInt(i) + 1;

    const studentListTable = document.getElementById("studentListTable");
    let newRow = studentListTable.insertRow();
    newRow.classList.add("dataRows");
    let newCell1 = newRow.insertCell();
    let newCell2 = newRow.insertCell();
    let newCell3 = newRow.insertCell();
    let newCell4 = newRow.insertCell();
    let newCell5 = newRow.insertCell();
    newCell1.style.padding = "20px";
    newCell2.style.padding = "20px";
    newCell3.style.padding = "20px";
    newCell4.style.padding = "20px";
    newCell5.style.padding = "20px";

    newCell1.innerHTML = aNum + ".";
    newCell2.innerHTML = aName;
    newCell3.innerHTML = aCity;
    newCell4.innerHTML = "$" + aFees;
    newCell5.innerHTML = `<button onclick="editPress(this,${i})">Edit</button>&nbsp;<button onclick="deletePress(this,${i})">Delete</button>`;
  }
  executeAllFunctions();
}

function deleteWholeTable() {
  const allRows = document.querySelectorAll(".dataRows");
  allRows.forEach((element) => {
    element.remove();
  });
}

function executeAllFunctions() {
  calculateTotalFees();
  calculateTotalStudents();
  studentsWithR();
  cityNameOf4thStudent();
  totalFeesOf3rdAnd5thStudent();
  feesBetween2And39();
  feesLessThan1();
  numberOfSStudentsAndChCity();
  numberOfJStudentsOrHCity();
  minMaxFees();
}
