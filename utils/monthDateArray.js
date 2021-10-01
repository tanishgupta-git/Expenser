const numberToMonth = { 0 : "Jan",1:"Feb",2:"Mar",3:"Apr",4:"May",5:"Jun",6:"July",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec" }
const checkLeapYear = (y) => {
    if (y % 4 === 0) {
       if(y % 100 === 0) {
           if (y % 400 === 0) {
               return true;
           }
         return false;
       }
       return true;
    }
    return false
}

// helping function for getting month date array
const monthDateArrayHelper = (year,month) => {

    if ( month === 'Feb') {
       if ( checkLeapYear(Number(year))) {
           return ["1","11","21","29"]
       }
       return ["1","11","21","28"]
    }
    else if (['Jun','Nov','Apr','Sep'].includes(month)) {
        return ["1","11","21","30"];
    }
    else {
        return ["1","11","21","31"];
    }
}

export const getMonthDateArray = (year,month) => {
    let dateArray  = monthDateArrayHelper(year,month);
    let currentDate = new Date();
    // if the month is currently going on
    if (numberToMonth[currentDate.getMonth()] === month) {

        while(currentDate.getDate() < Number(dateArray[dateArray.length - 1])) {
            dateArray.pop()
        };
    }

    return dateArray;
}

export const getMonthTransactionObject = (year,month) => {

      let obj = {};
      let dateArray = getMonthDateArray(year,month); 
      for (let i = 0;i < dateArray.length;i++) {
          obj[dateArray[i]] = 0;
      }

      return obj;
}