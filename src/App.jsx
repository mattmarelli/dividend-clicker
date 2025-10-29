import './App.css';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Header from './components/Header';
import MainGame from './components/MainGame';
import SideNav from './components/SideNav';

function App() {
  var [shareCount, setShareCount] = useState(() => {
    const storedShares = localStorage.getItem("shares");
    return storedShares ? parseFloat(storedShares) : 0;
  });
  var [shareDividend, setShareDividend] = useState(1);
  var [shareCost, setShareCost] = useState(() => {
    const storedShareCost = localStorage.getItem("shareCost");
    return storedShareCost ? parseFloat(storedShareCost) : 1;
  });
  var [money, setMoney] = useState(() => {
    const storedMoney = localStorage.getItem("money");
    return storedMoney ? parseFloat(storedMoney) : 10;
  });
  var [moneyPerClick, setMoneyPerClick] = useState(() => {
    const storedMoneyPerClick = localStorage.getItem("moneyPerClick");
    return storedMoneyPerClick ? parseFloat(storedMoneyPerClick) : 1;
  });
  var [gameView, setGameView] = useState("producers");
  var [purchaseAmount, setPurchaseAmount] = useState(() => {
    const storedPurchaseAmount = localStorage.getItem("purchaseAmount");
    return storedPurchaseAmount ? parseFloat(storedPurchaseAmount) : 1;
  });
  var [moneyPerClickUpgradeCost, setMoneyPerClickUpgradeCost] = useState(() => {
    const storedMoneyPerClickUpgradeCost = localStorage.getItem("moneyPerClickUpgradeCost");
    return storedMoneyPerClickUpgradeCost ? parseFloat(storedMoneyPerClickUpgradeCost) : 10;
  });

  const shareCountRef = useRef(shareCount)
  useEffect(() => {
    shareCountRef.current = shareCount;
  }, [shareCount]);

  const shareDividendRef = useRef(shareDividend)
  useEffect(() => {
    shareDividendRef.current = shareDividend;
  }, [shareDividend]);

  useEffect(() => {
    const id = setInterval(() => {
      setMoney(prev =>
        Math.round((prev + shareCountRef.current * shareDividendRef.current) * 100) / 100
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    localStorage.setItem("money", money.toString());
  }, [money]);

  useEffect(() => {
    localStorage.setItem("shares", shareCount.toString());
  }, [shareCount]);

  useEffect(() => {
    localStorage.setItem("shareCost", shareCost.toString());
  }, [shareCost]);

  useEffect(() => {
    localStorage.setItem("purchaseAmount", purchaseAmount.toString());
  }, [purchaseAmount]);

  useEffect(() => {
    localStorage.setItem("moneyPerClick", moneyPerClick.toString());
  }, [moneyPerClick]);

  useEffect(() => {
    localStorage.setItem("moneyPerClickUpgradeCost", moneyPerClickUpgradeCost.toString());
  }, [moneyPerClickUpgradeCost]);

  const increaseMoney = () => {
    setMoney(prev => prev + moneyPerClick)
  }

  const decreaseMoney = (decreaseAmount) => {
    setMoney(prev => prev - decreaseAmount)
  }

  const purchaseShares = (purchaseAmount, purchaseCost, newShareCost) => {
    if (purchaseCost > money)
      return

    decreaseMoney(purchaseCost);
    setShareCount(prev => prev + purchaseAmount);
    setNextShareCost(newShareCost);
  };

  const purchaseMoneyPerClickUpgrade = () => {
    if (moneyPerClickUpgradeCost > money)
      return

    decreaseMoney(moneyPerClickUpgradeCost)
    setMoneyPerClickUpgradeCost(prev => prev * 2)
    setMoneyPerClick(prev => prev + 1)
  }

  const setShareDividendAmount = (newDividend) => {
    setShareDividend(newDividend)
  };

  const setMoneyPerClickAmount = (newMoneyPerClick) => {
    setMoneyPerClick(newMoneyPerClick)
  }

  const setNextShareCost = (newShareCost) => {
    setShareCost(newShareCost)
  }

  const shareCountString = useMemo(
    () => `Shares: ${shareCount}`,
    [shareCount]
  );

  const moneyString = useMemo(
    () => `Money: $${money.toFixed(2)} ($${((shareCount * shareDividend) * 100) / 100}/s)`,
    [money, shareCount, shareDividend]
  );

  return (
    <>
      <Header shareCountString={shareCountString} shareDividend={shareDividendRef.current} moneyString={moneyString}/>
      <div className="gameLayout">
        <SideNav onSelectView={setGameView} currentPurchaseAmount={purchaseAmount} onSelectPurchaseAmount={setPurchaseAmount} />
        <MainGame gameView={gameView} increaseMoneyFunction={increaseMoney} moneyPerClick={moneyPerClick}
          purchaseAmount={purchaseAmount} pruchaseShareCountFunction={purchaseShares} shareCost={shareCost}
          clickMoneyUpgradeCost={moneyPerClickUpgradeCost} purchaseMoneyPerClickUpgradeFunction={purchaseMoneyPerClickUpgrade}
        />
      </div>
    </>
  )
}

export default App
