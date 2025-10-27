import '../css/Header.css';

function Header({shareCountString, shareDividend, moneyString}) {

  return (
    <div className="header">
      <div>
        <div className="moneyLabel">
          {moneyString}
        </div>
        <div className="basicSharesLabel">
          {shareCountString}
          <div className="basicSharesInfo">
            Each share pays a dividend of ${shareDividend} per second.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header