import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useLocalStorage } from '../helpers';

export function Shares() {
    const [shareCount, setShareCount] = useLocalStorage("shares", 0);
    const [shareDividend, setShareDividend] = useState(1);
    const [shareCost, setShareCost] = useLocalStorage("shareCost", 1);

  const shareCountRef = useRef(shareCount)
  useEffect(() => {
    shareCountRef.current = shareCount;
  }, [shareCount]);

  const shareDividendRef = useRef(shareDividend)
  useEffect(() => {
    shareDividendRef.current = shareDividend;
  }, [shareDividend]);

  const decreaseShares = (decreaseAmount) => {
    if (decreaseAmount > shareCount)
      return

    setShareCount(prev => prev - decreaseAmount)
  }

  const setShareDividendAmount = (newDividend) => {
    setShareDividend(newDividend)
  };

const setNextShareCost = (newShareCost) => {
    setShareCost(newShareCost)
  }

  return {
    shareCount, setShareCount, shareDividend, setShareDividend, shareCost, setShareCost, 
    shareCountRef, shareDividendRef, decreaseShares, setShareDividendAmount, setNextShareCost,
  }
}