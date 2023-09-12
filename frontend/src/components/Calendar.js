import { useEffect, useState } from "react";
import { useMonthLogContext } from "../hooks/useMonthLogContext";

import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";

const Calendar = () => {
  //const { monthLogs, dispatch } = useMonthLogContext();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthLogs, setMonthLogs] = useState([]);

  //Calendar variables
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todaysDate = new Date();
  const startDate = startOfMonth(todaysDate);
  const endDate = endOfMonth(todaysDate);
  const [numDays, setNum] = useState(differenceInDays(endDate, startDate) + 1);
  const [prefixDays, setPref] = useState(startDate.getDay());
  const [suffixDays, setSuf] = useState(6 - endDate.getDay());

  //Active date tracker w function
  const [activeDate, setActiveDate] = useState(todaysDate);
  const updateActiveDate = (date) => {
    setActiveDate(date);
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    setNum(differenceInDays(endDate, startDate) + 1);
    setPref(startDate.getDay());
    setSuf(6 - endDate.getDay());
  };

  //calendar controls
  const prevMonth = () => {
    console.log("Previous Month Button Clicked");
    const nextMonth = new Date(activeDate);
    nextMonth.setMonth(nextMonth.getMonth() - 1);
    updateActiveDate(nextMonth);
  };
  const nextMonth = () => {
    console.log("Next Month Button Clicked");
    const nextMonth = new Date(activeDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    updateActiveDate(nextMonth);
  };

  useEffect(() => {
    console.log("useEffect Triggered");
    const fetchData = async () => {
      console.log("Fetching Data");
      const data = await fetchLogs(activeDate);

      setMonthLogs((prevData) => ({
        ...prevData,
        [activeDate.toISOString()]: data,
      }));

      console.log("Month Logs", monthLogs);
    };
    fetchData(new Date());
  }, [activeDate, monthLogs]);

  const fetchLogs = async (date) => {
    const year = date.getFullYear();
    const from = date.getMonth() + 1;
    const to = from + 1;

    const response = await fetch(`/api/logs/${year}-${from}-1/${year}-${to}-1`);
    const json = await response.json();
    if (response.ok) {
      return json;
      //dispatch({ type: "GET_MONTHLOGS", payload: json });
    }
  };

  //get any log infomation per day in calendar
  const getDateInfo = (date) => {
    let test = [];

    if (!Array.isArray(monthLogs)) {
      console.log(typeof monthLogs);
    } else {
      for (let log of monthLogs) {
        if (new Date(log.date).getDate() == date.getDate()) {
          return log.routine;
        }
      }
    }

    return "";
  };

  return (
    <div className="grid grid-cols-7 text-center align-middle bg-white rounded divide-x divide-y mt-5">
      <button className=" col-span-1 bg-violet-300" onClick={prevMonth}>
        <BiSolidLeftArrow className="mx-auto scale-125 hover:scale-150" />
      </button>
      <p className="py-3 col-span-5 font-bold text-xl text-blue-500">
        {format(activeDate, "LLLL yyyy")}
      </p>
      <button className=" col-span-1" onClick={nextMonth}>
        <BiSolidRightArrow className="mx-auto scale-125 hover:scale-150" />
      </button>
      {daysOfWeek.map((day) => (
        <p className="p-1">{day}</p>
      ))}
      {Array.from({ length: prefixDays }).map((_, index) => (
        <p className="p-1 h-16"></p>
      ))}
      {Array.from({ length: numDays }).map((_, index) => {
        const date = new Date(
          activeDate.getFullYear(),
          activeDate.getMonth(),
          index + 1
        );

        //Fix later
        const isCurrentDate =
          date.getDate() === activeDate.getDate() &&
          date.getMonth() === activeDate.getMonth() &&
          date.getFullYear() === activeDate.getFullYear();

        return (
          <div>
            <div
              className={
                "p-1 h-16 transition-all" +
                (isCurrentDate ? " bg-blue-400 text-white" : "")
              }
              onClick={() => {
                updateActiveDate(
                  new Date(
                    activeDate.getFullYear(),
                    activeDate.getMonth(),
                    date.getDate()
                  )
                );
              }}
            >
              <p className="text-right">{date.getDate()}</p>
              <p className="">{getDateInfo(date)}</p>
            </div>
          </div>
        );
      })}
      {Array.from({ length: suffixDays }).map((_, index) => (
        <p className="p-1 h-16"></p>
      ))}
      {/*

      {routineHistory.map((obj, index) => (
        <p className="p-1 h-16 text-right">{obj.day}</p>
      ))}
      */}
    </div>
  );
};
export default Calendar;
