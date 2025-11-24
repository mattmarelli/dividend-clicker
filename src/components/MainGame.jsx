import '../css/MainGame.css';

import Producers from './Producers';
import Upgrades from './Upgrades';

function MainGame({
  gameView,
  currentMoney,
  pruchaseShareCountFunction,
  purchaseAmount,
  shareCost,
  currentShares,
  businessmanCost,
  pruchaseBusinessmanFunction,
  purchaseInvestorFunction,
  investorCost,
  currentBusinessman,
  purchaseAccreditedInvestorFunction,
  accreditedInvestorCost,
  currentInvestors,
  pruchaseFounderFunction,
  founderCost,
  currentAccreditedInvestors,
}) {
  let game_view = null
    switch (gameView) {
      case "producers":
        game_view = <Producers 
          currentMoney={currentMoney}
          pruchaseShareCountFunction={pruchaseShareCountFunction}
          purchaseAmount={purchaseAmount}
          shareCost={shareCost}
          currentShares={currentShares}
          businessmanCost={businessmanCost}
          pruchaseBusinessmanFunction={pruchaseBusinessmanFunction}
          purchaseInvestorFunction={purchaseInvestorFunction}
          investorCost={investorCost}
          currentBusinessman={currentBusinessman}
          purchaseAccreditedInvestorFunction={purchaseAccreditedInvestorFunction}
          accreditedInvestorCost={accreditedInvestorCost}
          currentInvestors={currentInvestors}
          pruchaseFounderFunction={pruchaseFounderFunction}
          founderCost={founderCost}
          currentAccreditedInvestors={currentAccreditedInvestors}
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