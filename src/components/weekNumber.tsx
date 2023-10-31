import React, { useState, useEffect } from "react";
import { Task, MonthPlan } from "../types";
const [monthWeeks, setMonthWeeks] = useState<Record<string, number>>({});
interface WeekNumberProps {
  projectPlan: MonthPlan;
  setProjectPlan: React.Dispatch<React.SetStateAction<MonthPlan>>;
}
function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}
function getMonthsInRange(startMonth: string, endMonth: string): string[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startMonthIndex = months.indexOf(startMonth);
  const endMonthIndex = months.indexOf(endMonth);

  if (startMonthIndex === -1 || endMonthIndex === -1) {
    return [];
  }

  const monthsInRange = months.slice(startMonthIndex, endMonthIndex + 1);

  return monthsInRange;
}
function getWeeksInMonth(year: number, month: number): number {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  return Math.ceil((lastDate.getDate() - firstDate.getDate() + 1) / 7);
}

function getQuarter(month: string): number {
  const quarters: { [key: string]: string[] } = {
    "1": ["January", "February", "March"],
    "2": ["April", "May", "June"],
    "3": ["July", "August", "September"],
    "4": ["October", "November", "December"],
  };

  for (const qtr in quarters) {
    if (quarters[qtr].includes(month)) {
      return parseInt(qtr);
    }
  }
  return 0; // Return 0 for months not found in any quarter
}
function addTaskToMonth(
  projectPlan: MonthPlan,
  monthKey: string,
  task: Task
): MonthPlan {
  const updatedProjectPlan = { ...projectPlan };
  if (!updatedProjectPlan[monthKey]) {
    updatedProjectPlan[monthKey] = [];
  }
  updatedProjectPlan[monthKey].push(task);
  return updatedProjectPlan;
}

useEffect(() => {
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weeksInMonths: Record<string, number> = {};

  months.forEach((month, index) => {
    weeksInMonths[month] = getWeeksInMonth(currentYear, index);
  });

  setMonthWeeks(weeksInMonths);
}, []);
function WeekNumber({ projectPlan, setProjectPlan }: WeekNumberProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddTask = () => {
    if (name && startDate && endDate) {
      const startMonth = new Date(startDate).toLocaleString("en-us", {
        month: "long",
      });
      const endMonth = new Date(endDate).toLocaleString("en-us", {
        month: "long",
      });

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const startMonthIndex = months.indexOf(startMonth);
      const endMonthIndex = months.indexOf(endMonth);

      if (startMonthIndex !== -1 && endMonthIndex !== -1) {
        for (let i = startMonthIndex; i <= endMonthIndex; i++) {
          const monthKey = months[i];
          projectPlan = addTaskToMonth(projectPlan, monthKey, {
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            startMonth,
            endMonth,
          });
        }
        setProjectPlan(projectPlan);

        // Reset form fields
        setName("");
        setStartDate("");
        setEndDate("");
      } else {
        alert("Invalid start or end month.");
      }
    } else {
      alert("Task creation canceled or missing information.");
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>

      {Object.keys(projectPlan).map((month) => (
        <div key={month} className="month">
          <h2>{month}</h2>

          {projectPlan[month].length > 0 ? (
            projectPlan[month].map((task, index) => {
              const startMonth = task.startMonth;
              const endMonth = task.endMonth;

              if (startMonth && endMonth) {
                const monthsInRange = getMonthsInRange(startMonth, endMonth);
                if (monthsInRange.includes(month)) {
                  // Calculate startWeek and endWeek as needed
                  const startWeek = getWeekNumber(task.startDate);
                  const endWeek = getWeekNumber(task.endDate);
                  return (
                    <div key={index} className="task">
                      <p>
                        {task.name} from Week {startWeek} to Week {endWeek}
                      </p>
                    </div>
                  );
                }
              }
              return null;
            })
          ) : (
            <p>No tasks for this month.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default WeekNumber;
