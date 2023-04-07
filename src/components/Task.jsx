import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../Redux/actions/taskActions";

const Task = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newStatus, setNewStatus] = useState(task.status);
  const [newDueDate, setDueDate] = useState(task.dueDate);

  const dispatch = useDispatch();

  const onStatusChange = (e) => {
    e.preventDefault();
    const newStatusVal = e.target.value;
    // ********************************************************************
    setNewStatus(newStatusVal);
  };

  const onNewDueDate = (e) => {
    e.preventDefault();
    const newDate = e.target.value;
    setDueDate(newDate);
  };
  const onSaveChanges = (e) => {
    dispatch(editTask(task.id, newTitle, newStatus, newDueDate));
  };

  const onDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          onSaveChanges={onSaveChanges}
        >
          <form className="flex flex-col">
            <div className="flex">
              <div className="font-semibold">Title : </div>
              <input
                type="text"
                className="outline-0 ms-2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="flex">
              <div className="font-semibold mr-2">Status :</div>
              <div className="text-green-500 font-bold ">
                <select
                  className="outline-0 "
                  value={newStatus}
                  onChange={onStatusChange}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Complete</option>
                </select>
              </div>
            </div>
            <div className="flex ">
              <div className="font-semibold">Due Date : </div>
              <input
                type="date"
                value={newDueDate}
                onChange={onNewDueDate}
                className="outline-0 ms-2"
              />
            </div>
          </form>
        </Modal>
      )}
      <>
        {newStatus === "completed" ? (
          <div className="border border-gray-400 bg-green-100  rounded-lg p-4 mb-4">
            <div className="flex justify-start items-center gap-4 pb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3293/3293466.png"
                className="w-7 h-7"
              ></img>
              <div className="text-md font-serif flex items-center">
                {task.user.toUpperCase()}
              </div>
            </div>
            <div className="text-3xl font-serif italic mb-2">{task.title}</div>
            <div className="flex mb-2">
              <div className="flex mr-8">
                <div className="font-bold mr-2">Created On :</div>
                <div>{task.createdOn}</div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2">Due Date:</div>
                <div>{task.dueDate}</div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="font-bold mr-2">Status :</div>
              <div className="text-green-500 font-bold ">{task.status}</div>
            </div>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                onDeleteTask();
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="border border-gray-400 `bg-${colorBg}-400`  rounded-lg p-4 mb-4">
            <div className="flex justify-start items-center gap-4 pb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3293/3293466.png"
                className="w-7 h-7"
              ></img>
              <div className="text-md font-serif flex items-center ">
                {task.user.toUpperCase()}
              </div>
            </div>
            <div className="text-3xl font-serif italic mb-2">{task.title}</div>
            <div className="flex mb-2">
              <div className="flex mr-8">
                <div className="font-bold mr-2">Created On :</div>
                <div>{task.createdOn}</div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2">Due Date:</div>
                <div>{task.dueDate}</div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="font-bold mr-2">Status :</div>
              <div className="text-green-500 font-bold ">{task.status}</div>
            </div>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                onDeleteTask();
              }}
            >
              Delete
            </button>
          </div>
        )}
      </>
    </>
  );
};

export default Task;
