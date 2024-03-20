type DebounceFunction = (event: OnChangeType) => void;

export function debounceOnChange(
  mainFunction: DebounceFunction,
): DebounceFunction {
  let timer: number;
  return function (event: OnChangeType) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(event);
    }, 500);
  };
}
