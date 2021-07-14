import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import store from '../store';
import { Provider } from 'react-redux';

// Provide access to the store
const MockProvider = ({ store }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// Function to handle all the changes made in the DOM
const addTask = (tasks) => {
  // Get the input boxes for task and time
  const taskInput = screen.getByPlaceholderText(/Enter task.../i);
  const timeInput = screen.getByDisplayValue(/0/i);

  //   Handle the change events
  tasks.forEach((task) => {
    fireEvent.change(taskInput, { target: { value: task.taskName } });
    fireEvent.change(timeInput, { target: { value: task.time } });
  });
};

describe('Integration between the Stopwatch and DisplayTasks components', () => {
  it('Add single tasks with time and display', async () => {
    render(<MockProvider store={store} />);

    addTask([{ taskName: 'Walk Dog', time: 5 }]);

    // Get the start button - Use for another test
    // const startButton = screen.getByRole('button', {
    //     name: /Start/i,
    //   });
    // These two events don't affect the list item being displayed as entering
    // a new task creates a new task
    // fireEvent.click(startButton);
    // fireEvent.click(startButton);

    // Check the task is displayed correctly
    const displayedTask = screen.getByText(/Walk Dog took 5s/i);
    // Check all number of tasks
    const listItemTasks = screen.getAllByTestId(/individual-task/i);

    // Should only be 1 task
    expect(listItemTasks.length).toBe(1);

    // Task should be displayed correctly
    expect(displayedTask).toBeInTheDocument();
  });

  it('Add two tasks with time and display', async () => {
    render(<MockProvider store={store} />);

    addTask([
      { taskName: 'Walk Dog', time: 5 },
      { taskName: 'Wash the car', time: 10 },
    ]);

    // Use Test id to get amount of tasks entered
    const listItemTasks = screen.getAllByTestId(/individual-task/i);

    // Check there are 2 tasks
    expect(listItemTasks.length).toBe(2);
  });
});
