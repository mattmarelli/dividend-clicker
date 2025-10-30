import '../css/Header.css';

function Header({shareCountString, shareDividend, moneyString, businessManString}) {

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
    </div>
  )
}

export default Header