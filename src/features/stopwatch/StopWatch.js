import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from './stopwatchSlice';

export function Stopwatch() {
  // Access the actions
  const dispatch = useDispatch();

  // Access the state
  const tasks = useSelector((state) => state.stopwatch);

  // Local state for timer
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Local state for the form
  const [formData, setFormData] = useState({
    taskName: '',
  });

  // Destructure form fields
  const { taskName } = formData;

  // Handler for the form
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function toggle() {
    setIsActive(!isActive);
  }

  // Cancel task and timer
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  // User sets time manually
  function handleTime(e) {
    if (e.target.value < 1) {
      setSeconds(0);
    } else {
      setSeconds(parseInt(e.target.value));
    }
  }

  // When timer is active count...
  // When timer is inactive, either add task to state if a new task or...
  // If the task exists, edit the exsting state
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      if (tasks.map((task) => task.taskName).includes(formData.taskName)) {
        // Edit task in state
        dispatch(
          editTask({
            taskName: formData.taskName,
            time: seconds,
          })
        );
      } else {
        // Add new task to state
        dispatch(
          addTask({
            taskName: formData.taskName,
            time: seconds,
          })
        );
      }
    }
    return () => clearInterval(interval);
  }, [isActive, dispatch, seconds, tasks]);

  return (
    <>
      <div>
        <form>
          <label htmlFor='taskName'>Task Name</label>
          <input
            type='text'
            name='taskName'
            value={taskName}
            id='taskName'
            placeholder='Enter task...'
            onChange={(e) => {
              onChange(e);
            }}
          />
          <label htmlFor='time'>Time</label>
          <input
            type='number'
            name='time'
            value={seconds}
            id='time'
            onChange={(e) => handleTime(e)}
          />

          <button
            aria-label='Start/Stop timer'
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
          <button
            aria-label='Reset timer'
            onClick={(e) => {
              e.preventDefault();
              setFormData({
                taskName: '',
              });
              reset();
            }}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
}
