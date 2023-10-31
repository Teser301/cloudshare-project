import React, { useState } from "react";
import WeekNumber from "./components/weekNumber";
import { MonthPlan } from "./types";

function App() {
  const initialProjectPlan: MonthPlan = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  };
  const [projectPlan, setProjectPlan] = useState<MonthPlan>(initialProjectPlan);

  return (
    <div>
      <h1>My React App</h1>
      <WeekNumber projectPlan={projectPlan} setProjectPlan={setProjectPlan} />
    </div>
  );
}

export default App;
