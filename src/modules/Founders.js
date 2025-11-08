import { useLocalStorage } from '../helpers';

export function Founders() {
  const [founderCount, setFounderCount] = useLocalStorage("founderCount", 0)
  const [founderCost, setNextFounderCost] = useLocalStorage("founderCost", 100)
  const [founderPayout, setFounderPayout] = useLocalStorage("founderPayout", 0.01)

  return { 
    founderCount,
    setFounderCount,
    founderCost,
    setNextFounderCost,
    founderPayout,
    setFounderPayout
  }  
}