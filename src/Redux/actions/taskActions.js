import {
  ADDTASK,
  DELETETASK,
  EDITTASK,
  FILTERTASKBYDATE,
  FILTERTASKBYSTATUS,
  FILTERTASKBYTITLE,
  REMOVEFILTER,
} from "../constants/TaskConstants";

export const addTask = (user, title, dueDate) => {
  const type = ADDTASK;
  const task = {
    user,
    title,
    id: Date.now().toString(),
    createdOn: new Date(Date.now()).toISOString().split("T")[0],
    dueDate,
    status: "pending",
  };
  const payload = { task };
  return { type, payload };
};

//--------------------------------------------------------------------------------------//

export const editTask = (id, title, status, dueDate) => {
  const type = EDITTASK;
  const task = { id, title, status, dueDate };
  const payload = { task };
  return { type, payload };
};

//--------------------------------------------------------------------------------------//

export const deleteTask = (id) => {
  const type = DELETETASK;
  const payload = { id };
  return { type, payload };
};

//--------------------------------------------------------------------------------------//

export const filterTaskByDate = (date) => {
  const type = FILTERTASKBYDATE;
  const payload = { date };
  return { type, payload };
};
export const filterTaskByStatus = (status) => {
  const type = FILTERTASKBYSTATUS;
  const payload = { status };
  return { type, payload };
};
export const filterTaskByTitle = (title) => {
  const type = FILTERTASKBYTITLE;
  const payload = { title };
  return { type, payload };
};

export const removeFilter = () => {
  const type = REMOVEFILTER;
  return { type };
};
