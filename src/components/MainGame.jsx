import '../css/MainGame.css';

import Producers from './Producers';
import Upgrades from './Upgrades';

function MainGame(
  {
    gameView, pruchaseShareCountFunction, purchaseAmount, shareCost, businessmanCost, pruchaseBusinessmanFunction
  }
) {
  var game_view = null
    switch (gameView) {
      case "producers":
        game_view = <Producers pruchaseShareCountFunction={pruchaseShareCountFunction} purchaseAmount={purchaseAmount}
          shareCost={shareCost} businessmanCost={businessmanCost} pruchaseBusinessmanFunction={pruchaseBusinessmanFunction}
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