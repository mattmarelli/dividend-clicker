import { useLocalStorage } from '../helpers';

export function Investors() {
  const [investorCount, setInvestorCount] = useLocalStorage("investorCount", 0)
  const [investorCost, setNextInvestorCost] = useLocalStorage("investorCost", 50)
  const [investorPayout, setInvestorPayout] = useLocalStorage("investorPayout", 0.1)

  const decreaseInvestors = (decreaseAmount) => {
    if (decreaseAmount > investorCount)
      return

    setInvestorCount(prev => prev - decreaseAmount)
  }

  return {
    investorCount,
    setInvestorCount,
    investorCost,
    setNextInvestorCost,
    investorPayout,
    setInvestorPayout,
    decreaseInvestors,
  }  
}