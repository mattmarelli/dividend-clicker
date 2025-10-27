import '../css/SideNav.css';

function SideNav({onSelectView, currentPurchaseAmount, onSelectPurchaseAmount}) {
  const purchaseAmountString = currentPurchaseAmount === -1 ? "Max" : currentPurchaseAmount.toString()

  return (
    <div className="sideNav">
      <button onClick={() => onSelectView("producers")}>
        Producers
      </button>
      <button onClick={() => onSelectView("upgrades")}>
        Upgrades
      </button>
      <div className="purchaseAmount">
        <h3>
          Purchase Amount: {purchaseAmountString}
        </h3>
        <button onClick={() => onSelectPurchaseAmount(1)}>
          1
        </button>
        <button onClick={() => onSelectPurchaseAmount(10)}>
          10
        </button>
        <button onClick={() => onSelectPurchaseAmount(100)}>
          100
        </button>
        <button onClick={() => onSelectPurchaseAmount(-1)}>
          Max
        </button>
      </div>
    </div>
  )
}

export default SideNav