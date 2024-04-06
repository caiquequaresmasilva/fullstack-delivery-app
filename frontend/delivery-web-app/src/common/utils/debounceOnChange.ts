type DebounceFunction = (event: OnChangeType) => void;

export function debounceOnChange(
  mainFunction: DebounceFunction,
): DebounceFunction {
  let timer: NodeJS.Timeout;
  return function (event: OnChangeType) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(event);
    }, 500);
  };
}
