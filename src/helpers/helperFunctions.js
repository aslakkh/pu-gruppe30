/**
 * Created by anderssalvesen on 07.04.2017.
 */

export function secondsToString(seconds) {
    /*
     Converts seconds to a readable string containing hours and minutes
     */
    let hours = Math.floor(seconds / (60 * 60));
    let remainder = seconds % (60 * 60);
    let minutes = Math.floor(remainder / 60);
    let s = "";
    if (hours != 0) {
        if (hours === 1) {
            s = hours + " hour"
        } else {
            s = hours + " hours"
        }
    }
    if (hours != 0 && minutes != 0) {
        s = s + " and ";
    }
    if (minutes != 0) {
        s = s + minutes + " minutes"
    }
    return s;
}

export function getFirstInMonthWeekDay() {
    /*
     Returns a list with integer values corresponding to start of today, this week and this month
     (number of milliseconds since 1970s)
     */

    let today = new Date();
    today.setHours(0,0,0,0);
    let firstInWeek = new Date();
    firstInWeek.setDate(firstInWeek.getDate() - firstInWeek.getDay() + 1);
    firstInWeek.setHours(0, 0, 0, 0);
    let date = new Date();
    let firstInMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    firstInMonth.setHours(0,0,0,0);
    return [today.valueOf(), firstInWeek.valueOf(), firstInMonth.valueOf()];
}

export function getDaysHoursMins(sec) {

    /*
     -param: seconds
     -converts seconds into different formats.
     -Returns a list containing: Number of days, number of hours, number of minutes, short textual format,
     long textual format
     */

    let days = Math.floor(sec / (60 * 60 * 12));
    let remainder = sec - (days * 60 * 60 * 12);
    let hours = Math.floor(remainder / (60 * 60));
    remainder = sec - (days * 60 * 60 * 12) - (hours * 60 * 60);
    let minutes = Math.floor(remainder / 60);
    let seconds = remainder - (minutes * 60);
    let longString = "";
    if ((hours + days * 12) != 0) {
        if ((hours + days * 12) === 1) {
            longString = (hours + days * 12) + " hour"
        } else {
            longString = (hours + days * 12) + " hours"
        }
    }
    if ((hours + days * 12) != 0 && minutes != 0) {
        longString = longString + " and ";
    }
    if (minutes != 0) {
        longString = longString + minutes + " minutes"
    }
    let shortString = (hours + days * 12) + ":" + minutes + ":" + seconds;
    return [days, hours, minutes, shortString, longString];
}


export function formatDate(millisec) {
    let months = ['January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let formatDigit = [];
    for(let i = 0; i < 61; i++) {
        if (i < 10) {
            formatDigit.push("0" + i);
        } else {
            formatDigit.push(i);
        }

    }
    let days = ['Monday' , 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday", 'Sunday'];
    return [millisec.getUTCFullYear(), months[millisec.getUTCMonth()], formatDigit[millisec.getUTCMonth() + 1], getWeekNumber(millisec),
        days[millisec.getUTCDay()], formatDigit[millisec.getUTCDate()], formatDigit[millisec.getUTCHours()], formatDigit[millisec.getUTCMinutes()], formatDigit[millisec.getUTCSeconds()]];
}

export function getWeekNumber(millisec) {
    let date = new Date(millisec);
    date.setHours(0,0,0,0);
    date.setDate(date.getDate() + 4 - (date.getDay()||7));
    let yearStart = new Date(date.getFullYear(),0,1);
    return  Math.ceil(( ( (date - yearStart) / 86400000) + 1)/7);
}