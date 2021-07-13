import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { Stopwatch } from '../StopWatch';
import store from '../../../store';
import { Provider } from 'react-redux';
import reducer, { addTask } from '../stopwatchSlice';

const MockProvider = ({ store }) => {
  return (
    <Provider store={store}>
      <Stopwatch />
    </Provider>
  );
};

describe('Reset Button', () => {
  it('Clicking returns timer to zero', () => {
    render(<MockProvider store={store} />);
    const resetButton = screen.getByRole('button', {
      name: /Reset/i,
    });
    const timeInput = screen.getByDisplayValue(/0/i);
    fireEvent.click(resetButton);

    expect(timeInput.value).toBe('0');
  });

  it('Timer is set to 10, clicking reset returns timer to zero', () => {
    render(<MockProvider store={store} />);
    const resetButton = screen.getByRole('button', {
      name: /Reset/i,
    });
    const timeInput = screen.getByDisplayValue(/0/i);
    fireEvent.change(timeInput, { target: { value: '10' } });
    fireEvent.click(resetButton);

    expect(timeInput.value).toBe('0');
  });
});

describe('Start Button', () => {
  it('Click the start button', async () => {
    render(<MockProvider store={store} />);
    const startButton = screen.getByRole('button', {
      name: /Start/i,
    });
    const taskInput = screen.getByPlaceholderText(/Enter task.../i);
    const timeInput = screen.getByDisplayValue(/0/i);

    fireEvent.change(taskInput, { target: { value: 'Walk the Dog' } });
    fireEvent.change(timeInput, { target: { value: 10 } });

    // These two events don't affect the list item being displayed
    // fireEvent.click(startButton);
    // fireEvent.click(startButton);

    // TODO
    // The data from redux should be displayed to allow the next line to work...
    // This currently fails
    // This will need an integration test as using multiple components
    const listItemTask = screen.getByText(/Walk the Dog took 10s/i);

    expect(listItemTask).toBeInTheDocument();
  });
});

describe('state only', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle a task being added to state', () => {
    const previousState = [];
    expect(
      reducer(
        previousState,
        addTask({ taskName: 'Cleaning the car', time: 10 })
      )
    ).toEqual([
      {
        taskName: 'Cleaning the car',
        time: 10,
      },
    ]);
  });
});
