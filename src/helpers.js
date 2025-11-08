import {
  useEffect,
  useState,
} from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]
}

export function formatNumber(numberToFormat) {
  let returnNumber = numberToFormat
  let returnSuffix = ""
  if (numberToFormat >= 100000 && numberToFormat < 1000000) {
    returnNumber = numberToFormat / 1000
    returnSuffix = "K"
  } else if (numberToFormat >= 1000000 && numberToFormat < 1000000000) {
    returnNumber = numberToFormat / 1000000
    returnSuffix = "M"
  } else if (numberToFormat >= 1000000000 && numberToFormat < 1000000000000) {
    returnNumber = returnNumber / 1000000000
    returnSuffix = "B"
  } else if (numberToFormat >= 1000000000000 && numberToFormat < 1000000000000000) {
    returnNumber = returnNumber / 1000000000000
    returnSuffix = "T"
  } else if (numberToFormat >= 1000000000000000 && numberToFormat < 1000000000000000000) {
    returnNumber = returnNumber / 1000000000000000
    returnSuffix = "Qa"
  }
  return {formattedNumber: returnNumber, suffix: returnSuffix}
}
