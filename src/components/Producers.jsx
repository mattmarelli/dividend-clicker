import { formatNumber } from '../helpers';

function Producers({
  currentMoney,
  currentShares,
  purchaseShareCountFunction,
  purchaseAmount,
  shareCost,
  businessmanCost,
  purchaseBusinessmanFunction,
  currentBusinessman,
  investorCost,
  purchaseInvestorFunction,
}) {
  const shareGrowthRate = 1.07
  const businessmanGrowthRate = 1.08
  const investorGrowthRate = 1.09
  let sharePurchaseAmout = 0;
  let businessmanPurchaseAmount = 0;
  let investorPurchaseAmount = 0;

  const CalcualtePurchaseCost = () => {
    let totalShareCost = 0;
    let totalBusinessmanCost = 0;
    let totalInvestorCost = 0;
    if (purchaseAmount > 0) {
      for (let i = 1; i <= purchaseAmount; i++) {
        totalShareCost += shareCost
        totalBusinessmanCost += businessmanCost
        totalInvestorCost += investorCost
        shareCost = Math.round((shareCost * shareGrowthRate) * 100) / 100
        businessmanCost = Math.round((businessmanCost * businessmanGrowthRate) * 100) / 100
        investorCost = Math.round((investorCost * investorGrowthRate) * 100) / 100
      }
      sharePurchaseAmout = purchaseAmount;
      businessmanPurchaseAmount = purchaseAmount;
      investorPurchaseAmount = purchaseAmount;
    } else {
      while (currentMoney >= totalShareCost + shareCost) {
        totalShareCost += shareCost;
        sharePurchaseAmout += 1;
        shareCost = Math.round((shareCost * shareGrowthRate) * 100) / 100
      }
      while (currentShares >= totalBusinessmanCost + businessmanCost) {
        totalBusinessmanCost += businessmanCost;
        businessmanPurchaseAmount += 1;
        businessmanCost = Math.round((businessmanCost * businessmanGrowthRate) * 100) / 100
      }
      while (currentBusinessman >= totalInvestorCost + investorCost) {
        totalInvestorCost += investorCost;
        investorPurchaseAmount += 1;
        investorCost = Math.round((investorCost * investorGrowthRate) * 100) / 100
      }
    }

    return {
      sharePurchaseCost: Math.round(totalShareCost * 100) / 100, newShareCost: shareCost,
      businessmanPurchaseCost: Math.round(totalBusinessmanCost * 100) / 100, newBusinessmanCost: businessmanCost,
      investorPurchaseCost: Math.round(totalInvestorCost * 100) /  100, newInvestorCost: investorCost
    }
  }

  const {
    sharePurchaseCost,
    newShareCost,
    businessmanPurchaseCost,
    newBusinessmanCost,
    investorPurchaseCost,
    newInvestorCost,
  } = CalcualtePurchaseCost()
  const {formattedNumber: formattedSharePurchaseCost, suffix: sharePurchaseSuffix} = formatNumber(sharePurchaseCost)
  const {formattedNumber: formattedBusinessmanPurchaseCost, suffix: businessmanPurchaseSuffix} = formatNumber(businessmanPurchaseCost)
  const {formattedNumber: formattedInvestorPurchaseCost, suffix: investorPurchaseSuffix} = formatNumber(investorPurchaseCost)

  const sharePurchaseAmountString = sharePurchaseAmout.toString();
  const businessmanPurchaseAmountString = businessmanPurchaseAmount.toString();
  const investorPurchaseAmountString = investorPurchaseAmount.toString();

  return (
    <div>
      <button onClick={() => purchaseShareCountFunction(sharePurchaseAmout, sharePurchaseCost, newShareCost)}>
        <div>Purchase Share (+{sharePurchaseAmountString})</div>
        <div>Cost: ${formattedSharePurchaseCost.toFixed(2)}{sharePurchaseSuffix}</div>
      </button>
      <button onClick={() => purchaseBusinessmanFunction(businessmanPurchaseAmount, businessmanPurchaseCost, newBusinessmanCost)}>
        <div>Hire Businessman (+{businessmanPurchaseAmountString})</div>
        <div>Cost: {formattedBusinessmanPurchaseCost.toFixed(2)}{businessmanPurchaseSuffix} Shares</div>
      </button>
      <button onClick={() => purchaseInvestorFunction(investorPurchaseAmount, investorPurchaseCost, newInvestorCost)}>
        <div>Aquire Investor (+{investorPurchaseAmountString})</div>
        <div>Cost: {formattedInvestorPurchaseCost.toFixed(2)}{investorPurchaseSuffix} Businessman</div>
      </button>
    </div>
  )
}

export default Producers