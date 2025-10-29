import '../css/MainGame.css';

import Producers from './Producers';
import Upgrades from './Upgrades';

function MainGame(
  {
    gameView, increaseMoneyFunction, moneyPerClick, pruchaseShareCountFunction, purchaseAmount,
    shareCost, clickMoneyUpgradeCost, purchaseMoneyPerClickUpgradeFunction
  }
) {
  var game_view = null
    switch (gameView) {
      case "producers":
        game_view = <Producers increaseMoneyFunction={increaseMoneyFunction} moneyPerClick={moneyPerClick} 
          pruchaseShareCountFunction={pruchaseShareCountFunction} purchaseAmount={purchaseAmount}
          shareCost={shareCost}
        />;
        break;
      case "upgrades":
        game_view = <Upgrades currentMoneyPerClick={moneyPerClick} clickMoneyUpgradeCost={clickMoneyUpgradeCost} 
          purchaseMoneyPerClickUpgradeFunction={purchaseMoneyPerClickUpgradeFunction}
        />;
        break;
      default:
        game_view = <div>Something went wrong</div>;
    }

  return (
    <div className="mainGame">
      {game_view}
    </div>
  )
}

export default MainGame