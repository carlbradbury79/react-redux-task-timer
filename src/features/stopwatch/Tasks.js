import React from 'react';
import { useSelector } from 'react-redux';

export function DisplayTasks() {
  // Access the state
  const tasks = useSelector((state) => state.stopwatch);
  let total = null;

  //   Get total time of all tasks
  if (tasks.length > 0)
    total = tasks.reduce((acc, cur) => acc + parseInt(cur.time), 0);

  return (
    <div>
      <ul>
        {tasks.map((task) => {
          // Display each task
          return (
            <li key={task.id}>
              {task.task}, {task.time}
            </li>
          );
        })}
      </ul>
      {/* Display total time if state not empty */}
      {total !== null && <p>Total time: {total}</p>}
    </div>
  );
}
