// Stop the execution for the specified time
export function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// repeat asyncFunction, every debounceTime, during the timeout
export function wait(
  asyncFunction: Function,
  timeout = 5000,
  debounceTime = 1000,
  rejectMessage = "Timeout on wait"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return new Promise((resolve, reject) => {
    let stopRepeats = false;
    setTimeout(() => {
      stopRepeats = true;
      reject(rejectMessage);
    }, timeout);
    const repeat = (): void => {
      asyncFunction().then(
        (results) => {
          resolve(results);
        },
        () => {
          setTimeout(() => {
            if (!stopRepeats) {
              repeat();
            }
          }, debounceTime);
        }
      );
    };
    repeat();
  });
}
