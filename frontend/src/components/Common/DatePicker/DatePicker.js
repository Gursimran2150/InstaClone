import { useEffect, useState } from "react";
import "./datepicker.css";

function DatePicker({setBirthDate,birthDate,ableBtn}) {

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

const handleChange=(e)=>{

  setBirthDate({   ...birthDate,[e.target.name]:e.target.value})

}


  // set length of days 
  let lengthNum;
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    lengthNum = 31;
  } else if (
    month == 4 ||
    month == 6 ||
    month == 9 ||
    month == 11
  ) {
      lengthNum = 30;
  } else {
    //for leap year
    if (new Date(year, 1, 29).getMonth() === 1) {
       lengthNum = 29;
    } else {
       lengthNum = 28;
    }
  }
  

  //create array of day list 
  const days = Array.from({ length: lengthNum }, (_, i) => i + 1);

  //list of month 
  const months = [
    { name: "January", value: "1" },
    { name: "February", value: "2" },
    { name: "March", value: "3" },
    { name: "April", value: "4" },
    { name: "May", value: "5" },
    { name: "June", value: "6" },
    { name: "July", value: "7" },
    { name: "August", value: "8" },
    { name: "September", value: "9" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  //create array of year list 
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

 



  return (
    <div className="datePicker">
      <span>
        <select
          className="monthSelect"
          name="month"
          id="month"
          defaultValue={`${new Date().getMonth() + 1}`}
          onChange={handleChange}
        >
          {months.map((month, ind) => {
            return (
              <option key={ind} value={month.value}>
                {" "}
                {month.name}
              </option>
            );
          })}
        </select>
      </span>

      <span>
        <select
          className="daySelect"
          name="day"
          id="day"
          defaultValue={new Date().getDate()}
          // onChange={(e) => setDay(e.target.value)}
          onChange={handleChange}

        >
          {days.map((day, ind) => {
            return (
              <option key={ind} value={day}>
                {" "}
                {day}
              </option>
            );
          })}
        </select>
      </span>

      <span>
        <select
          name="year"
          id="year"
          // onChange={(e) => setYear(e.target.value)}
          onChange={handleChange}

          className="yearSelect"
        >
          {years.map((year, ind) => {
            return (
              <option key={ind} value={year}>
                {" "}
                {year}
              </option>
            );
          })}
        </select>
      </span>
    </div>
  );
}

export default DatePicker;
