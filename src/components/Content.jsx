import React from "react";
import TaskArray from "./TaskArray";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter } from "../Redux/actions/taskActions";

const Content = () => {
  // const { tasks, filterTasks } = useSelector((store) => {
  //   return store.tasksState;
  // });

  const dispatch = useDispatch();

  const removeFilterOnclick = (e) => {
    e.preventDefault();
    dispatch(removeFilter());
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="flex mb-2 justify-between ">
        <div className="text-3xl font-bold text-center mb-1">List of Tasks</div>

        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2 "
          onClick={removeFilterOnclick}
        >
          Remove Filter
        </button>
      </div>
      <TaskArray />
    </div>
  );
};

export default Content;
