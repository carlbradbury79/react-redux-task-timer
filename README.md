# Simple React & Redux Toolkit Task

## Redux Actions

- AddTask - Adds new task to state
- EditTask - If task already exists, edit the seconds value
- RemoveTask - Remove a task from state

## Start/Stop Button

When start is clicked the timer starts. The timer uses useEffect and setInterval. The button toggles from starting and stopping. When stop is clicked, the timer will stop and the task and its time are added to state via a dispached action

## Reset Button

The form is reset and the timer is set back to 0

## Tasks list

The state is read in the tasks component, and displayed. The total time for all the tasks is displayed in a component that turns total seconds into minutes/seconds
