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
