import '../css/MainGame.css';

import Producers from './Producers';
import Upgrades from './Upgrades';

function MainGame({gameView, increaseMoneyFunction, moneyPerClick, increaseShareCountFunction, purchaseAmount, sharePurchaseCost}) {
  var game_view = null
    switch (gameView) {
      case "producers":
        game_view = <Producers increaseMoneyFunction={increaseMoneyFunction} moneyPerClick={moneyPerClick} 
          increaseShareCountFunction={increaseShareCountFunction} purchaseAmount={purchaseAmount}
          sharePurchaseCost={sharePurchaseCost}
        />;
        break;
      case "upgrades":
        game_view = <Upgrades />;
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