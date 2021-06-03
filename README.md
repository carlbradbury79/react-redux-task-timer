# Simple React & Redux Toolkit Task

## Start

When start is clicked the timer starts. The timer uses useEffect and setInterval

## Stop

When stop is clicked, the timer will stop and the task and its time are added to state via a dispached action

## Reset

The form is reset and the timer is set back to 0

## Tasks list

The state is read in the tasks component, and displayed. The total time for all the tasks is displayed below

## Issues/todo

The tasks are not updated, a new one is created each time
The ids can be resued, causing React to get upset when mapping over the tasks
It looks rrrrrrubbish
