import { useMemo } from 'react';

import { formatNumber } from '../helpers';

export function HeaderString(money, shares, businessman, investors, accreditedInvestors, founders) {
  const moneyString = useMemo(
    () => {
      const {formattedNumber: formattedMoney, suffix: moneySuffix} = formatNumber(money.moneyRef.current);
      const {formattedNumber: formattedIncome, suffix: incomeSuffix} = formatNumber(shares.shareCount * shares.shareDividend);
      return `Money: $${formattedMoney.toFixed(2)}${moneySuffix} ($${formattedIncome.toFixed(2)}${incomeSuffix}/s)`
    },
    [shares.shareCount, shares.shareDividend, money.moneyRef]
  );

  const shareCountString = useMemo(
    () => {
      const {formattedNumber: formattedShares, suffix: sharesSuffix} = formatNumber(shares.shareCount);
      const {formattedNumber: formattedShareIncome, suffix: shareIncomeSuffix} = formatNumber(businessman.businessmanCount * businessman.businessmanSharePayout);
      return `Shares: ${formattedShares.toFixed(2)}${sharesSuffix} ($${formattedShareIncome.toFixed(2)}${shareIncomeSuffix}/s)`
    },
    [shares.shareCount, businessman.businessmanCount, businessman.businessmanSharePayout]
  );

  const businessmanString = useMemo(
    () => {
      const {formattedNumber: formattedBusinessman, suffix: businessmanSuffix} = formatNumber(businessman.businessmanCount);
      const {formattedNumber: formatedBusinessmanIncome, suffix: businessmanIncomeSuffix} = formatNumber(investors.investorCount * investors.investorPayout);
      return `Businessmen: ${formattedBusinessman.toFixed(2)}${businessmanSuffix} ($${formatedBusinessmanIncome.toFixed(2)}${businessmanIncomeSuffix}/s)`
    },
    [businessman.businessmanCount, investors.investorCount, investors.investorPayout]
  )

  const investorString = useMemo (
    () => `Investors: ${investors.investorCount}`,
    [investors.investorCount]
  )

  const accreditedInvestorString = useMemo (
    () => `Accredited Investors: ${accreditedInvestors.accreditedInvestorCount}`,
    [accreditedInvestors.accreditedInvestorCount]
  )

  const founderString = useMemo (
    () => `Founders: ${founders.founderCount}`,
    [founders.founderCount]
  )

  return {
    moneyString,
    shareCountString,
    businessmanString,
    investorString,
    accreditedInvestorString,
    founderString,
  }
}