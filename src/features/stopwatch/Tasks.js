import React from 'react';
import { useSelector } from 'react-redux';
import { Task } from './Task';
import { TotalTime } from './TotalTime';

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
          return <Task key={task.taskName} task={task} />;
        })}
      </ul>
      {/* Display total time if state not empty */}
      {total !== null && <TotalTime seconds={total} />}
    </div>
  );
}
