import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  filterTaskByDate,
  filterTaskByStatus,
  filterTaskByTitle,
} from "../Redux/actions/taskActions";

const FormAddTask = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [user, setUser] = useState("");

  const dispatch = useDispatch();

  const addTaskOnClick = (e) => {
    e.preventDefault();
    if (user === "") {
      alert("Enter the User Name!!!");
      return;
    }
    if (title === "") {
      alert("Enter the Title!!!");
      return;
    }
    if (dueDate === "") {
      alert("Enter the due date!!!");
    } else {
      // yaha pe kabhi bhi mein useSelector se li hui cheej nahi dalunga
      // yaha pe woh cheej dalti hai jo mujhe state mein add karni

      dispatch(addTask(user, title, dueDate));
      // mein apni state ko state se hi update kar raha hu
      // setTitle(title)
      setTitle("");
      setDueDate("");
      setUser("");
    }
  };

  return (
    <form className="flex  items-center justify-center gap-3 border border-gray-400 rounded-lg p-3 mx-4 ">
      <div>
        <div className="ms-2 font-semibold">User Name</div>
        <input
          className="py-2 px-4 border border-gray-400 rounded-lg mr-2"
          type="text"
          placeholder="Enter name here.."
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="ms-2 font-semibold">Task Name</div>
        <input
          className="py-2 px-4 border border-gray-400 rounded-lg mr-2"
          type="text"
          placeholder="Enter the task here..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="ms-2 font-semibold">Due Date</div>
        <input
          className="py-2 px-4 border border-gray-400 rounded-lg mr-2 outline-0"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
        onClick={addTaskOnClick}
      >
        Add Task
      </button>
    </form>
  );
};

// ***************************************************************************************
const FormFilter = () => {
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("status");
  const [search, setSearch] = useState("");

  const { filterApplied } = useSelector((store) => store.tasksState);

  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(filterTaskByTitle(e.target.value));
  };

  useEffect(() => {
    if (!filterApplied) {
      setDueDate("");
      setStatus("status");
      setSearch("");
    }
  }, [filterApplied]);

  const onClickFilterByDate = (e) => {
    e.preventDefault();
    dispatch(filterTaskByDate(dueDate));
    setDueDate("");
  };

  const onClickFilterByStatus = (e) => {
    e.preventDefault();
    if (status === "status") return;
    dispatch(filterTaskByStatus(status));
  };

  return (
    <form className="flex items-center p-1 m-4 ">
      <div className="flex justify-center items-center gap-6 ">
        <div className="flex items-center text-xl ">
          <div className="mr-4 font-semibold">FILTER BY :</div>
          <div className="flex items-center justify-center">
            <input
              className="py-2 px-4 border border-gray-400 rounded-lg mr-2"
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            />
            <button
              className="py-1.5 px-4 bg-blue-500 text-white text-md rounded-md mr-2"
              onClick={onClickFilterByDate}
            >
              Date
            </button>

            <div className="text-green-500 font-bold">
              <select
                className="ring-1 ring-gray-300 rounded-md px-3 py-1.5 outline-0"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                onClick={onClickFilterByStatus}
              >
                <option hidden value="status">
                  Status
                </option>
                <option value="pending">pending</option>
                <option value="completed">complete</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex ">
          <input
            className="py-2 px-4 border border-gray-400 rounded-lg mr-2"
            type="text"
            placeholder="Search for tasks..."
            value={search}
            onChange={onSearchChange}
          />
          {/* <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            onClick={onClickSearch}
          >
            Search
          </button> */}
        </div>
      </div>
    </form>
  );
};
// ***************************************************************************************

const Header = () => {
  return (
    <div>
      <div className=" flex items-center justify-between">
        <div className="m-4 text-4xl font-bold text-center font-serif mx-auto">
          TASK MANAGER
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <FormAddTask />
        <FormFilter />
      </div>
    </div>
  );
};

export default Header;
