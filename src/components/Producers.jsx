function Producers({increaseMoneyFunction, moneyPerClick, increaseShareCountFunction, purchaseAmount, sharePurchaseCost}) {
  const purchaseAmountString = purchaseAmount === -1 ? "Max" : purchaseAmount.toString()

  return (
    <div>
      <button onClick={increaseMoneyFunction}>
        Earn Money (+{moneyPerClick})
      </button>
      <button onClick={increaseShareCountFunction}>
        Purchase Share (+{purchaseAmountString})
        Cost: {sharePurchaseCost}
      </button>
    </div>
  )
}

export default Producers