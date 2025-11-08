import './App.css';

import {
  useMemo,
  useState,
} from 'react';

import Header from './components/Header';
import MainGame from './components/MainGame';
import SideNav from './components/SideNav';
import {
  formatNumber,
  useLocalStorage,
} from './helpers';
import { AccreditedInvestors } from './modules/AccreditedInvestors';
import { Businessman } from './modules/Businessman';
import { Founders } from './modules/Founders';
import { Game } from './modules/Game';
import { Investors } from './modules/Investors';
import { Money } from './modules/Money';
import { Shares } from './modules/Shares';

function App() {
  // Basic game logic
  const [gameView, setGameView] = useState("producers");
  const [purchaseAmount, setPurchaseAmount] = useLocalStorage("purchaseAmount", 1);
  const money = Money()
  const shares = Shares()
  const businessman = Businessman()
  const investors = Investors()
  const accreditedInvestors = AccreditedInvestors()
  const founders = Founders()
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
  )

  const purchaseShares = (purchaseAmount, purchaseCost, newShareCost) => {
    if (purchaseCost > money.money)
      return

    money.decreaseMoney(purchaseCost);
    shares.setShareCount(prev => prev + purchaseAmount);
    shares.setNextShareCost(newShareCost);
  };

  const purchaseBusinessman = (purchaseAmount, purchaseCost, newBusinessmanCost) => {
    if (purchaseCost > shares.shareCount)
      return

    shares.decreaseShares(purchaseCost)
    businessman.setBusinessmanCount(prev => prev + purchaseAmount)
    businessman.setNextBusinessmanCost(newBusinessmanCost)
  }

  const purchaseInvestor = (purchaseAmount, purchaseCost, newInvestorCost) => {
    if (purchaseCost > businessman.businessmanCount)
      return
    
    businessman.decreaseBusinessman(purchaseAmount)
    investors.setInvestorCount(prev => prev + purchaseAmount)
    investors.setNextInvestorCost(newInvestorCost)
  }

  const purchaseAccreditedInvestor = (purchaseAmount, purchaseCost, newAccreditedInvestorCost) => {
    if (purchaseCost > investors.investorCount)
      return

    investors.decreaseInvestors(purchaseAmount)
    accreditedInvestors.setAccreditedInvestorCount(prev => prev + purchaseAmount)
    accreditedInvestors.setNextAccreditedInvestorCost(newAccreditedInvestorCost)
  }

  const purchaseFounder = (purchaseAmount, purchaseCost, newFounderCost) => {
    if (purchaseCost > accreditedInvestors.accreditedInvestorCount)
      return

    accreditedInvestors.decreaseAccreditedInvestors(purchaseAmount)
    founders.setFounderCount(prev => prev + purchaseAmount)
    founders.setNextFounderCost(newFounderCost)
  }

  const shareCountString = useMemo(
    () => {
      const {formattedNumber: formattedShares, suffix: sharesSuffix} = formatNumber(shares.shareCount);
      const {formattedNumber: formattedShareIncome, suffix: shareIncomeSuffix} = formatNumber(businessman.businessmanCount * businessman.businessmanSharePayout);
      return `Shares: ${formattedShares.toFixed(2)}${sharesSuffix} ($${formattedShareIncome.toFixed(2)}${shareIncomeSuffix}/s)`
    },
    [shares.shareCount, businessman.businessmanCount, businessman.businessmanSharePayout]
  );

  const moneyString = useMemo(
    () => {
      const {formattedNumber: formattedMoney, suffix: moneySuffix} = formatNumber(money.moneyRef.current);
      const {formattedNumber: formattedIncome, suffix: incomeSuffix} = formatNumber(shares.shareCount * shares.shareDividend);
      return `Money: $${formattedMoney.toFixed(2)}${moneySuffix} ($${formattedIncome.toFixed(2)}${incomeSuffix}/s)`
    },
    [shares.shareCount, shares.shareDividend, money.moneyRef]
  );

  const businessManString = useMemo(
    () => `Businessmen: ${businessman.businessmanCount}`,
    [businessman.businessmanCount]
  )

  const investorString = useMemo (
    () => `Investors: ${investors.investorCount}`,
    [investors.investorCount]
  )

  return (
    <>
      <Header
        shareCountString={shareCountString}
        shareDividend={shares.shareDividendRef.current}
        moneyString={moneyString}
        businessManString={businessManString}
        investorString={investorString}
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
          pruchaseShareCountFunction={purchaseShares}
          shareCost={shares.shareCost}
          currentShares={shares.shareCount}
          businessmanCost={businessman.businessmanCost}
          pruchaseBusinessmanFunction={purchaseBusinessman}
          investorCost={investors.investorCost}
          purchaseInvestorFunction={purchaseInvestor}
          currentBusinessman={businessman.businessmanCount}
        />
      </div>
    </>
  )
}

export default App
