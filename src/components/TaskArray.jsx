import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const TaskArray = () => {
  // jab apan ko task sirf chaiye hota hai , readonly cheej , khud kabhi update nahi karte
  // redux ki state ko update karne ka sirf ek hi tareeka hai
  // ek action ko dispatch karke
  const { tasks, filterTasks, filterApplied } = useSelector((store) => {
    // reduxState -> yeh woh daba hai jo apan redux wali window me dikhta hai
    // iske andar bahut saari cheeje ho sakti hai

    return store.tasksState;
  });

  // react ki useState , redux ki state se alag hai they are not at all similar

  // agar filter task empty ho to tasks me map karana h warna filtertasks pe
  const taskArr =
    filterTasks.length === 0 && filterApplied === false ? tasks : filterTasks;
  const renderTask = taskArr.map((task) => {
    return <Task key={task.id} task={task} />;
  });
  return <div>{tasks.length === 0 ? "No Tasks Added" : renderTask}</div>;
};

export default TaskArray;
