function Upgrades({currentMoneyPerClick, clickMoneyUpgradeCost, purchaseMoneyPerClickUpgradeFunction}) {

  return (
    <div>
      <button onClick={purchaseMoneyPerClickUpgradeFunction}>
        <div>Increase Money Per Click</div>
        <div>Currently: {currentMoneyPerClick}</div>
        <div>Next: {currentMoneyPerClick + 1}</div>
        <div>Cost: {clickMoneyUpgradeCost}</div>
      </button>
    </div>
  )
}

export default Upgrades