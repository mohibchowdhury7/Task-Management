export interface Task {
  _id?: string;
  title?: string;
  description?: string;
  priority?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  assignedPerson?: string;
  image?: string;
  subTasks?: subTask[];
  createdAt?: Date;
  updatedAt?: Date;
}


interface subTask{
  title?: string;
  description?: string;
}
