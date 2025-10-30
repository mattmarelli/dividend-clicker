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
import formatNumber from './helpers';

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
  var [gameView, setGameView] = useState("producers");
  var [purchaseAmount, setPurchaseAmount] = useState(() => {
    const storedPurchaseAmount = localStorage.getItem("purchaseAmount");
    return storedPurchaseAmount ? parseFloat(storedPurchaseAmount) : 1;
  });
  var [businessmanCount, setBusinessmanCount] = useState(() => {
    const storedBusinessmanCount = localStorage.getItem("businessmanCount");
    return storedBusinessmanCount ? parseFloat(storedBusinessmanCount) : 0;
  });
  var [businessmanSharePayout, setBusinessmanSharePayout] = useState(() => {
    const storedBusinessmanSharePayout = localStorage.getItem("businessmanSharePayout");
    return storedBusinessmanSharePayout ? parseFloat(storedBusinessmanSharePayout) : 1;
  });
  var [businessmanCost, setNextBusinessmanCost] = useState(() => {
    const storedbusinessmanCost = localStorage.getItem("businessmanCost");
    return storedbusinessmanCost ? parseFloat(storedbusinessmanCost) : 100;
  });

  const shareCountRef = useRef(shareCount)
  useEffect(() => {
    shareCountRef.current = shareCount;
  }, [shareCount]);

  const shareDividendRef = useRef(shareDividend)
  useEffect(() => {
    shareDividendRef.current = shareDividend;
  }, [shareDividend]);

  const businessmanCountRef = useRef(businessmanCount)
  useEffect(() => {
    businessmanCountRef.current = businessmanCount;
  }, [businessmanCount]);

  const businessmanSharePayoutRef = useRef(businessmanSharePayout)
  useEffect(() => {
    businessmanSharePayoutRef.current = businessmanSharePayout
  }, [businessmanSharePayout])

  useEffect(() => {
    const id = setInterval(() => {
      setMoney(prev =>
        Math.round((prev + shareCountRef.current * shareDividendRef.current) * 100) / 100
      );
      setShareCount(prev => prev + businessmanCountRef.current * businessmanSharePayoutRef.current)
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
    localStorage.setItem("businessmanCount", businessmanCount.toString());
  }, [businessmanCount]);

  useEffect(() => {
    localStorage.setItem("businessmanSharePayout", businessmanSharePayout.toString());
  }, [businessmanSharePayout]);

  useEffect(() => {
    localStorage.setItem("businessmanCost", businessmanCost.toString());
  }, [businessmanCost]);

  const increaseMoney = (increaseAmount) => {
    setMoney(prev => prev + increaseAmount)
  }

  const decreaseMoney = (decreaseAmount) => {
    setMoney(prev => prev - decreaseAmount)
  }

  const decreaseShares = (decreaseAmount) => {
    setShareCount(prev => prev - decreaseAmount)
  }

  const purchaseShares = (purchaseAmount, purchaseCost, newShareCost) => {
    if (purchaseCost > money)
      return

    decreaseMoney(purchaseCost);
    setShareCount(prev => prev + purchaseAmount);
    setNextShareCost(newShareCost);
  };

  const purchaseBusinessman = (purchaseAmount, purchaseCost, newBusinessmanCost) => {
    if (purchaseCost > shareCount)
      return

    decreaseShares(purchaseCost)
    setBusinessmanCount(prev => prev + purchaseAmount)
    setNextBusinessmanCost(newBusinessmanCost)
  }

  const setShareDividendAmount = (newDividend) => {
    setShareDividend(newDividend)
  };

  const setNextShareCost = (newShareCost) => {
    setShareCost(newShareCost)
  }

  const shareCountString = useMemo(
    () => {
      var {formattedNumber: formattedShares, suffix: sharesSuffix} = formatNumber(shareCount);
      var {formattedNumber: formattedShareIncome, suffix: shareIncomeSuffix} = formatNumber(businessmanCount * businessmanSharePayout);
      return `Shares: ${formattedShares.toFixed(2)}${sharesSuffix} ($${formattedShareIncome.toFixed(2)}${shareIncomeSuffix}/s)`
    },
    [shareCount, businessmanCount, businessmanSharePayout]
  );

  const moneyString = useMemo(
    () => {
      const {formattedNumber: formattedMoney, suffix: moneySuffix} = formatNumber(money);
      const {formattedNumber: formattedIncome, suffix: incomeSuffix} = formatNumber(shareCount * shareDividend);
      return `Money: $${formattedMoney.toFixed(2)}${moneySuffix} ($${formattedIncome.toFixed(2)}${incomeSuffix}/s)`
    },
    [money, shareCount, shareDividend]
  );

  const businessManString = useMemo(
    () => `Businessmen: ${businessmanCount}`,
    [businessmanCount]
  )

  return (
    <>
      <Header shareCountString={shareCountString} shareDividend={shareDividendRef.current} moneyString={moneyString} businessManString={businessManString}/>
      <div className="gameLayout">
        <SideNav onSelectView={setGameView} currentPurchaseAmount={purchaseAmount} onSelectPurchaseAmount={setPurchaseAmount} />
        <MainGame gameView={gameView} increaseMoneyFunction={increaseMoney} purchaseAmount={purchaseAmount}
          pruchaseShareCountFunction={purchaseShares} shareCost={shareCost} businessmanCost={businessmanCost}
          pruchaseBusinessmanFunction={purchaseBusinessman}
        />
      </div>
    </>
  )
}

export default App
