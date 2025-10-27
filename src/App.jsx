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
  var [shareDividend, setShareDividend] = useState(0.01);
  var [money, setMoney] = useState(() => {
    const storedMoney = localStorage.getItem("money");
    return storedMoney ? parseFloat(storedMoney) : 0;
  });
  var [moneyPerClick, setMoneyPerClick] = useState(1);
  var [gameView, setGameView] = useState("producers");
  var [purchaseAmount, setPurchaseAmount] = useState(() => {
    const storedPurchaseAmount = localStorage.getItem("purchaseAmount");
    return storedPurchaseAmount ? parseFloat(storedPurchaseAmount) : 1;
  });

  const shareCountRef = useRef(shareCount)
  useEffect(() => {
    shareCountRef.current = shareCount;
  }, [shareCount]);

  const shareDividendRef = useRef(shareDividend)
  useEffect(() => {
    shareDividendRef.current = shareDividend;
  }, [shareDividend]);

  const moneyPerClickRef = useRef(moneyPerClick)
  useEffect (() => {
    moneyPerClickRef.current = moneyPerClick;
  }, [moneyPerClick]);

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
    localStorage.setItem("purchaseAmount", purchaseAmount.toString());
  }, [purchaseAmount]);

  const increaseMoney = () => {
    setMoney(prev => prev + moneyPerClickRef.current)
  }

  const increaseShareCount = (increaseAmount) => {
    setShareCount(prev => prev + increaseAmount);
  };

  const setShareDividendAmount = (newDividend) => {
    setShareDividend(newDividend)
  };

  const setMoneyPerClickAmount = (newMoneyPerClick) => {
    setMoneyPerClick(newMoneyPerClick)
  }

  const shareCountString = useMemo(
    () => `Shares: ${shareCount}`,
    [shareCount]
  );

  const moneyString = useMemo(
    () => `Money: ${money.toFixed(2)} (${((shareCount * shareDividend) * 100) / 100}/s)`,
    [money, shareCount, shareDividend]
  );

  return (
    <>
      <Header shareCountString={shareCountString} shareDividend={shareDividendRef.current} moneyString={moneyString}/>
      <div className="gameLayout">
        <SideNav onSelectView={setGameView} currentPurchaseAmount={purchaseAmount} onSelectPurchaseAmount={setPurchaseAmount} />
        <MainGame gameView={gameView} increaseMoneyFunction={increaseMoney} moneyPerClick={moneyPerClickRef.current} purchaseAmount={purchaseAmount} />
      </div>
    </>
  )
}

export default App
