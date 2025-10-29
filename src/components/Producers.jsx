function Producers({increaseMoneyFunction, moneyPerClick, pruchaseShareCountFunction, purchaseAmount, shareCost}) {
  const purchaseAmountString = purchaseAmount === -1 ? "Max" : purchaseAmount.toString()
  const CalcualteSharePurchaseCost = () => {
    var totalCost = 0
    for (let i = 1; i <= purchaseAmount; i++) {
      totalCost += shareCost
      shareCost = Math.round((shareCost * 1.07) * 100) / 100
    }

    return {purchaseCost: Math.round(totalCost * 100) / 100, newShareCost: shareCost}
  }

  const {purchaseCost, newShareCost} = CalcualteSharePurchaseCost()

  return (
    <div>
      <button onClick={increaseMoneyFunction}>
        Earn Money (+{moneyPerClick})
      </button>
      <button onClick={() => pruchaseShareCountFunction(purchaseAmount, purchaseCost, newShareCost)}>
        <div>Purchase Share (+{purchaseAmountString})</div>
        <div>Cost: {purchaseCost}</div>
      </button>
      <button>
        <div>Hire Businessman (+1)</div>
        <div>Cost: 10 Shares</div>
      </button>
    </div>
  )
}

export default Producers