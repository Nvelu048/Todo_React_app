export interface Todo {
  _id?: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  status: string;
  priority: string;
  label: string;
  userId?: string;
}
