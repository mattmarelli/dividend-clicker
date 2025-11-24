import './App.css';

import { useState } from 'react';

import Header from './components/Header';
import MainGame from './components/MainGame';
import SideNav from './components/SideNav';
import { useLocalStorage } from './helpers';
import { AccreditedInvestors } from './modules/AccreditedInvestors';
import { Businessman } from './modules/Businessman';
import { Founders } from './modules/Founders';
import { Game } from './modules/Game';
import { HeaderString } from './modules/HeaderString';
import { Investors } from './modules/Investors';
import { Money } from './modules/Money';
import { Purchaser } from './modules/Puchaser';
import { Shares } from './modules/Shares';

function App() {
  const [gameView, setGameView] = useState("producers");
  const [purchaseAmount, setPurchaseAmount] = useLocalStorage("purchaseAmount", 1);
  const money = Money();
  const shares = Shares();
  const businessman = Businessman();
  const investors = Investors();
  const accreditedInvestors = AccreditedInvestors();
  const founders = Founders();
  const purchaser = Purchaser(
    money,
    shares,
    businessman,
    investors,
    accreditedInvestors,
    founders,
  );
  const headerStrings = HeaderString(
    money,
    shares,
    businessman,
    investors,
    accreditedInvestors,
    founders,
  );
  Game(
    money.setMoney,
    shares.setShareCount,
    shares.shareCount,
    shares.shareDividend,
    businessman.businessmanCount,
    businessman.businessmanSharePayout,
    businessman.setBusinessmanCount,
    investors.investorCount,
    investors.investorPayout,
    investors.setInvestorCount,
    accreditedInvestors.accreditedInvestorCount,
    accreditedInvestors.accreditedInvestorPayout,
    accreditedInvestors.setAccreditedInvestorCount,
    founders.founderCount,
    founders.founderPayout,
  );

  return (
    <>
      <Header
        shareCountString={headerStrings.shareCountString}
        shareDividend={shares.shareDividendRef.current}
        moneyString={headerStrings.moneyString}
        businessManString={headerStrings.businessmanString}
        investorString={headerStrings.investorString}
        accreditedInvestorString={headerStrings.accreditedInvestorString}
        founderString={headerStrings.founderString}
      />
      <div className="gameLayout">
        <SideNav
          onSelectView={setGameView}
          currentPurchaseAmount={purchaseAmount}
          onSelectPurchaseAmount={setPurchaseAmount}
        />
        <MainGame
          gameView={gameView}
          currentMoney={money.money}
          increaseMoneyFunction={money.increaseMoney}
          purchaseAmount={purchaseAmount}
          pruchaseShareCountFunction={purchaser.purchaseShares}
          shareCost={shares.shareCost}
          currentShares={shares.shareCount}
          businessmanCost={businessman.businessmanCost}
          pruchaseBusinessmanFunction={purchaser.purchaseBusinessman}
          investorCost={investors.investorCost}
          purchaseInvestorFunction={purchaser.purchaseInvestor}
          currentBusinessman={businessman.businessmanCount}
          purchaseAccreditedInvestorFunction={purchaser.purchaseAccreditedInvestor}
          accreditedInvestorCost={accreditedInvestors.accreditedInvestorCost}
          currentInvestors={investors.currentInvestors}
          pruchaseFounderFunction={purchaser.purchaseFounder}
          founderCost={founders.founderCost}
          currentAccreditedInvestors={accreditedInvestors.accreditedInvestorCount}
        />
      </div>
    </>
  )
}

export default App
