import React, { useEffect, useState } from "react";
import "./Calendar.css";
import jsonData from '../data.json'

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [timezone, setTimezone] = useState("UTC-0");
  const [schedule, setSchedule] = useState([]);
  const [items, setItems] = useState([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = [
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ];

  const handlePreviousWeek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 7);
    setDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    setDate(newDate);
  };
  const convertTimezone = (time, sourceTimezone, targetTimezone) => {
    const sourceOffset = parseInt(sourceTimezone.replace("UTC", ""));
    const targetOffset = parseInt(targetTimezone.replace("UTC", ""));
    const timeInMilliseconds = new Date(`January 1, 1970 ${time}`).getTime();
    const convertedTimeInMilliseconds =
      timeInMilliseconds + (targetOffset - sourceOffset) * 3600000;
    const convertedTime = new Date(convertedTimeInMilliseconds)
      .toUTCString()
      .split(" ")[4];
    return convertedTime;
  };

  const handleTimezoneChange = (event) => {
    const selectedTimezone = event.target.value;
    const newSchedule = schedule.map((daySchedule) =>
      daySchedule.map((slot) => {
        const convertedTime = convertTimezone(
          slot.time,
          "UTC-0",
          selectedTimezone
        );
        // console.log(convertedTime)

        return {
          ...slot,
          convertedTime: convertedTime,
        };
      })
    );

    setTimezone(selectedTimezone);
    setSchedule(newSchedule);
  };

  const loadWeeklySchedule = () => {
    // Logic for loading the weekly schedule
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const times = [
      "8AM",
      "9AM",
      "10AM",
      "11AM",
      "12PM",
      "1PM",
      "2PM",
      "3PM",
      "4PM",
      "5PM",
      "6PM",
      "7PM",
      "8PM",
      "9PM",
      "10PM",
      "11PM",
    ];

    const newSchedule = days.map((day) =>
      times.map((time) => ({
        day,
        time,
        isChecked: false,
      }))
    );

    setSchedule(newSchedule);
  };

  React.useEffect(() => {
    loadWeeklySchedule();
  }, []);

  const handleCheckboxChange = (day, time) => {
    // Logic for handling checkbox changes
    const updatedSchedule = schedule.map((daySchedule) =>
      daySchedule.map((slot) =>
        slot.day === day && slot.time === time
          ? { ...slot, isChecked: !slot.isChecked }
          : slot
      )
    );
    setSchedule(updatedSchedule);
  };

  useEffect(() => {
    setItems(jsonData);
  }, []);
  return (
    <>
    <div className="calendar-container">
      <div className="header">
        <button onClick={handlePreviousWeek}>Previous Week</button>
        Date: {date.toDateString()}
        <button onClick={handleNextWeek}>Next Week</button>
      </div>
      <div className="timezone-select">
        <label>Timezone:</label>
        <select value={timezone} onChange={handleTimezoneChange}>
          <option value="UTC-0">UTC-0</option>
          <option value="UTC+5">UTC+5</option>{" "}
          {/* Add your second timezone here */}
        </select>
      </div>
      {/* <div className="schedule-container">
      
        {schedule.map((daySchedule, index) => (
          <div className="day" key={index}>
            {daySchedule.map((slot) => (
              <div className="time-slot" key={`${slot.day}-${slot.time}`}>
                {slot.day} -{" "}
                {slot.convertedTime ? slot.convertedTime : slot.time}
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={slot.isChecked}
                  onChange={() => handleCheckboxChange(slot.day, slot.time)}
                />
              </div>
            ))}
          </div>
        ))}
      </div> */}

      <div>
        {days.map((day1) => (
          <div className="container d-flex ">
            <div className="col-lg-2 col-md-2 col-sm-4 col-6">{day1}</div>
            <div className="col-lg-10 col-md-2 col-sm-4 col-6">
              {times.map((time) => (
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    //   checked={isChecked}
                    onChange={() => handleCheckboxChange(day1, time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
   
    </div>
    <div>
      {items.map((item) => (
        <div key={item.Id}>
          <input type="checkbox" />
          <span>{item.Date} - {item.Time}</span>
        </div>
      ))}
    </div>
    </>
  );
};

export default Calendar;
