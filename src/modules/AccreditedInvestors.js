import { useLocalStorage } from '../helpers';

export function AccreditedInvestors() {
  const [accreditedInvestorCount, setAccreditedInvestorCount] = useLocalStorage("accreditedInvestorCount", 0)
  const [accreditedInvestorCost, setNextAccreditedInvestorCost] = useLocalStorage("accreditedInvestorCost", 100)
  const [accreditedInvestorPayout, setAccreditedInvestorPayout] = useLocalStorage("accreditedInvestorPayout", 0.05)

  const decreaseAccreditedInvestors = (decreaseAmount) => {
    if (decreaseAmount > accreditedInvestorCount)
      return

    setAccreditedInvestorCount(prev => prev - decreaseAmount)
  }

  return { 
    accreditedInvestorCount,
    setAccreditedInvestorCount,
    accreditedInvestorCost,
    setNextAccreditedInvestorCost,
    accreditedInvestorPayout,
    setAccreditedInvestorPayout,
    decreaseAccreditedInvestors,
  }  
}