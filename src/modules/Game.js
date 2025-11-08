import { useEffect } from 'react';

export function Game(
  setMoney,
  setShareCount,
  shareCount,
  shareDividend,
  businessmanCount,
  businessmanSharePayout,
  setBusinessmanCount,
  investorCount,
  investorPayout,
  setInvestorCount,
  accreditedInvestorCount,
  accreditedInvestorPayout,
  setAccreditedInvestorCount,
  founderCount,
  founderPayout,
) {
    useEffect(() => {
      const id = setInterval(() => {
        setMoney(prev =>
          Math.round((prev + shareCount * shareDividend) * 100) / 100
        );
        setShareCount(prev => prev + businessmanCount * businessmanSharePayout);
        setBusinessmanCount(prev => prev + investorCount * investorPayout);
        setInvestorCount(prev => prev + accreditedInvestorCount * accreditedInvestorPayout);
        setAccreditedInvestorCount(prev => prev + founderCount * founderPayout);
      }, 1000);
      return () => clearInterval(id);
    }, [
      setMoney,
      setShareCount,
      shareCount,
      shareDividend,
      businessmanCount,
      businessmanSharePayout,
      setBusinessmanCount,
      investorCount,
      investorPayout,
      setInvestorCount,
      accreditedInvestorCount,
      accreditedInvestorPayout,
      setAccreditedInvestorCount,
      founderCount,
      founderPayout,
    ]
  );
}