import '../css/Header.css';

function Header({
  shareCountString,
  shareDividend,
  moneyString,
  businessManString,
  investorString
}) {

  return (
    <div className="header">
        <div className="moneyLabel">
          {moneyString}
        </div>
        <div className="basicSharesLabel">
          {shareCountString}
          <div className="basicSharesInfo">
            Each share pays a dividend of ${shareDividend} per second.
          </div>
        </div>
        <div className="businessmanLabel">
          {businessManString}
        </div>
        <div className="investorLabel">
          {investorString} 
        </div>
        <div className="accreditedInvestorLabel">
          Accredited Investors: 
        </div>
        <div className="founderLabel">
          Founders: 
        </div>
    </div>
  )
}

export default Header