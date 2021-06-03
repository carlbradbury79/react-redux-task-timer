import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './stopwatchSlice';

export function Stopwatch() {
  // Access the actions
  const dispatch = useDispatch();

  // Local state for timer
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Local state for the form
  const [formData, setFormData] = useState({
    id: '',
    task: '',
  });

  // Destructure form
  const { id, task } = formData;

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
    setSeconds(parseInt(e.target.value));
  }

  // When timer is active count
  // When timer is inactive, add task to state
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      dispatch(
        addTask({
          id: formData.id,
          task: formData.task,
          time: seconds,
        })
      );
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <>
      <div>
        <form>
          <label htmlFor='id'>id</label>
          <input
            type='text'
            name='id'
            value={id}
            id='id'
            onChange={(e) => onChange(e)}
          />
          <label htmlFor='name'>Task</label>
          <input
            type='text'
            name='task'
            value={task}
            id='task'
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
                id: '',
                task: '',
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
