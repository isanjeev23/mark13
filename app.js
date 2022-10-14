let dateOfBirth = document.querySelector("#date-of-birth");
let submitBtn = document.querySelector("#submit-btn");
let outputdiv = document.querySelector("#output-div");

function getDateObj(dateStr) {
  let dobArr = dateStr.split("-");
  return {
    day: dobArr[2],
    month: dobArr[1],
    year: dobArr[0],
  };
}

function getDateAllCombo(dateObj) {

  let ddmmyyyy = dateObj.day + dateObj.month + dateObj.year;
  let mmddyyyy = dateObj.month + dateObj.day + dateObj.year;
  let yyyymmdd = dateObj.year + dateObj.month + dateObj.day;

  let ddmmyy = dateObj.day + dateObj.month + dateObj.year.slice(-2);
  let mmddyy = dateObj.month + dateObj.day + dateObj.year.slice(-2);
  let yymmdd = dateObj.year.slice(-2) + dateObj.month + dateObj.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function isPalindrome(str) {
  let i = 0;
  let j = str.length - 1;

  while (i <= j) {
    if (str[i] != str[j]) return false;

    i++;
    j--;
  }

  return true;
}

function isLeapYear(year) {
  if (year % 4 === 0 && year % 100 != 0 ) return true;
  else if(year % 400 === 0 ) return true ;

  return false;
}

function getNextDate(dateObj) {
  let day = 1 + Number(dateObj.day);

  let month = Number(dateObj.month);

  let year = Number(dateObj.year);

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2 && isLeapYear(year) && day > 29) {
    day = 1;
    month = 3;
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day.toString().padStart(2, "0"),
    month: month.toString().padStart(2, "0"),
    year: year.toString(),
  };
}

function isBirthdatePalindrome(dateStr) {
 
  let dateObj = getDateObj(dateStr);
//  console.log(dateObj);
  let dateCombinationArr = getDateAllCombo(dateObj);
 // console.log(dateCombinationArr);

  for (let i = 0; i < 6; i++) {
    let flag = isPalindrome(dateCombinationArr[i]);
  //  console.log(flag);

    if (flag) {
      return true;
    }
  }

}

function findNextPalindromeDate(dateStr) {
  let dateObj = getDateObj(dateStr);

  let count = 1;

  while (1) {
    let nextDate = getNextDate(dateObj);
   // console.log(nextDate);
    let allDateFormatArr = getDateAllCombo(nextDate);
   // console.log(allDateFormatArr);
    count++;

    for (let i = 0; i < allDateFormatArr.length; i++) {
      let flag = isPalindrome(allDateFormatArr[i]);

      if (flag) return [nextDate, count];
    }

    dateObj = nextDate;
  }
}

submitBtn.addEventListener("click", () => {
  if (dateOfBirth.value == "") {
   // console.log(dateOfBirth.value);
    outputdiv.innerHTML = "<h2>Please enter date of birth</h2>";
    return;
  }
  else {
    let flag = isBirthdatePalindrome(dateOfBirth.value);

    if (flag) {
      outputdiv.innerHTML = "yes Your Birthay is Palindrome";
    } else {
      const[dateObj , count ] = findNextPalindromeDate(dateOfBirth.value);
      
      outputdiv.innerHTML = `The nearest palindrome date is ${dateObj.day}-${dateObj.month}-${dateObj.year} , you missed by ${count} days.`

   //   console.log(`${dateObj} , ${count}`) ;
    }
  }

});
