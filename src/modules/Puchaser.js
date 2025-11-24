export function Purchaser(money, shares, businessman, investors, accreditedInvestors, founders) {

  const purchaseShares = (purchaseAmount, purchaseCost, newShareCost) => {
    if (purchaseCost > money.money)
      return

    money.decreaseMoney(purchaseCost);
    shares.setShareCount(prev => prev + purchaseAmount);
    shares.setNextShareCost(newShareCost);
  };

  const purchaseBusinessman = (purchaseAmount, purchaseCost, newBusinessmanCost) => {
    if (purchaseCost > shares.shareCount)
      return

    shares.decreaseShares(purchaseCost)
    businessman.setBusinessmanCount(prev => prev + purchaseAmount)
    businessman.setNextBusinessmanCost(newBusinessmanCost)
  }

  const purchaseInvestor = (purchaseAmount, purchaseCost, newInvestorCost) => {
    if (purchaseCost > businessman.businessmanCount)
      return
    
    businessman.decreaseBusinessman(purchaseCost)
    investors.setInvestorCount(prev => prev + purchaseAmount)
    investors.setNextInvestorCost(newInvestorCost)
  }

  const purchaseAccreditedInvestor = (purchaseAmount, purchaseCost, newAccreditedInvestorCost) => {
    if (purchaseCost > investors.investorCount)
      return

    investors.decreaseInvestors(purchaseCost)
    accreditedInvestors.setAccreditedInvestorCount(prev => prev + purchaseAmount)
    accreditedInvestors.setNextAccreditedInvestorCost(newAccreditedInvestorCost)
  }

  const purchaseFounder = (purchaseAmount, purchaseCost, newFounderCost) => {
    if (purchaseCost > accreditedInvestors.accreditedInvestorCount)
      return

    accreditedInvestors.decreaseAccreditedInvestors(purchaseCost)
    founders.setFounderCount(prev => prev + purchaseAmount)
    founders.setNextFounderCost(newFounderCost)
  }


  return {
    purchaseShares,
    purchaseBusinessman,
    purchaseInvestor,
    purchaseAccreditedInvestor,
    purchaseFounder,
  }
}