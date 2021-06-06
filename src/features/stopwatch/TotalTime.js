export function TotalTime({ seconds }) {
  if (seconds > 59) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;
    // Display time as Mins & seconds if the number of seconds is high enough
    return (
      <span>
        {mins}m {secs}s
      </span>
    );
  } else {
    return <span>{seconds}s</span>;
  }
}
