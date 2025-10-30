import formatNumber from '../helpers';

function Producers({pruchaseShareCountFunction, purchaseAmount, shareCost, businessmanCost, pruchaseBusinessmanFunction}) {
  const purchaseAmountString = purchaseAmount === -1 ? "Max" : purchaseAmount.toString()
  const CalcualteSharePurchaseCost = () => {
    var totalShareCost = 0
    var totalBusinessmanCost = 0
    for (let i = 1; i <= purchaseAmount; i++) {
      totalShareCost += shareCost
      totalBusinessmanCost += businessmanCost
      shareCost = Math.round((shareCost * 1.07) * 100) / 100
      businessmanCost = Math.round((businessmanCost * 1.07) * 100) / 100
    }

    return {
      sharePurchaseCost: Math.round(totalShareCost * 100) / 100, newShareCost: shareCost,
      businessmanPurchaseCost: Math.round(totalBusinessmanCost * 100) / 100, newBusinessmanCost: businessmanCost
    }
  }

  const {sharePurchaseCost, newShareCost, businessmanPurchaseCost, newBusinessmanCost} = CalcualteSharePurchaseCost()
  const {formattedNumber: formattedSharePurchaseCost, suffix: sharePurchaseSuffix} = formatNumber(sharePurchaseCost)
  const {formattedNumber: formattedBusinessmanPurchaseCost, suffix: businessmanPurchaseSuffix} = formatNumber(businessmanCost)

  return (
    <div>
      <button onClick={() => pruchaseShareCountFunction(purchaseAmount, sharePurchaseCost, newShareCost)}>
        <div>Purchase Share (+{purchaseAmountString})</div>
        <div>Cost: ${formattedSharePurchaseCost.toFixed(2)}{sharePurchaseSuffix}</div>
      </button>
      <button onClick={() => pruchaseBusinessmanFunction(purchaseAmount, businessmanPurchaseCost, newBusinessmanCost)}>
        <div>Hire Businessman (+{purchaseAmountString})</div>
        <div>Cost: {formattedBusinessmanPurchaseCost.toFixed(2)}{businessmanPurchaseSuffix} Shares</div>
      </button>
    </div>
  )
}

export default Producers