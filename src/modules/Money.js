import {
  useEffect,
  useRef,
} from 'react';

import { useLocalStorage } from '../helpers';

export function Money() {
  const [money, setMoney] = useLocalStorage("money", 10);
  const moneyRef = useRef(money)
  useEffect(() => {moneyRef.current = money; }, [money])

  const increaseMoney = (increaseAmount) => {
    setMoney(prev => prev + increaseAmount)
  };

  const decreaseMoney = (decreaseAmount) => {
    if (decreaseAmount > money)
      return

    setMoney(prev => prev - decreaseAmount)
  };

  return { money, setMoney, moneyRef, increaseMoney, decreaseMoney };
}
