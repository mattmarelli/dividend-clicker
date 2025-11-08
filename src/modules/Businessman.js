import {
  useEffect,
  useRef,
} from 'react';

import { useLocalStorage } from '../helpers';

export function Businessman() {
  const [businessmanCount, setBusinessmanCount] = useLocalStorage("businessmanCount", 0);
  const [businessmanSharePayout, setBusinessmanSharePayout] = useLocalStorage("businessmanSharePayout", 1);
  const [businessmanCost, setNextBusinessmanCost] = useLocalStorage("businessmanCost", 100);

  const businessmanCountRef = useRef(businessmanCount)
  useEffect(() => {
    businessmanCountRef.current = businessmanCount;
  }, [businessmanCount]);

  const businessmanSharePayoutRef = useRef(businessmanSharePayout)
  useEffect(() => {
    businessmanSharePayoutRef.current = businessmanSharePayout
  }, [businessmanSharePayout])
  
  const decreaseBusinessman = (decreaseAmount) => {
    if (decreaseAmount > businessmanCount)
      return

    setBusinessmanCount(prev => prev - decreaseAmount)
  }

  return {
    businessmanCount, setBusinessmanCount, businessmanSharePayout, setBusinessmanSharePayout, businessmanCost,
    setNextBusinessmanCost, businessmanCountRef, businessmanSharePayoutRef, decreaseBusinessman
  }
}