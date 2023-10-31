export interface Task {
  name: string;
  startDate: Date;
  endDate: Date;
  startMonth: string;
  endMonth: string;
}

export interface MonthPlan {
  [month: string]: Task[];
}
