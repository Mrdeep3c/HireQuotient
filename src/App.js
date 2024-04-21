import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setdata] = useState([]);
  const [aclass, setaclass] = useState([]);
  const [real_estate, setRealState] = useState(true);
  const [cash, setCash] = useState(false);
  const [bond, setBond] = useState(false);
  const [equity, setEquity] = useState(false);
  const [fund, setFund] = useState(false);
  const [loan, setLoan] = useState(false);

  const getdata = async () => {
    const response = await fetch("https://canopy-frontend-task.now.sh/api/holdings");
    const jsonData = await response.json();
    setdata(jsonData.payload);
    const temp = new Set(jsonData.payload.map((a) => a.asset_class));
    setaclass([...temp]);
  };

  const showView = (asset_class_head) => {
    if (asset_class_head === 'Real Estate') return setRealState(!real_estate);
    if (asset_class_head === 'Cash') return setCash(!cash);
    if (asset_class_head === 'Bond') return setBond(!bond);
    if (asset_class_head === 'Equity') return setEquity(!equity);
    if (asset_class_head === 'Fund') return setFund(!fund);
    if (asset_class_head === 'Loan') return setLoan(!loan);
    return false;
  };

  const getisExpanded = (asset_class_head) => {
    switch (asset_class_head) {
      case 'Real Estate':
        return real_estate;
      case 'Cash':
        return cash;
      case 'Bond':
        return bond;
      case 'Equity':
        return equity;
      case 'Fund':
        return fund;
      case 'Loan':
        return loan;
      default:
        return false;
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      {aclass.map((asset_class_head, index) => (
        <div key={index}>
          <div className="assetHead">
          <div className="dropdownHead">{asset_class_head.toUpperCase()}</div>
          <div className={getisExpanded(asset_class_head) ? 'dropdownButton' : 'dropdownButtondown'} onClick={() => showView(asset_class_head)}></div>
          </div>
          <div className="dropdownHeading">
            <div>NAME OF THE HOLDINGS</div>
            <div>TICKER</div>
            <div>AVERAGE PRICE</div>
            <div>MARKET PRICE</div>
            <div>LATEST CHANGE PERCENTAGE</div>
            <div>MARKET VALUE IN BASE CCY</div>
            
          </div>
          {data.map(data_items => {
            const current_class = data_items.asset_class === asset_class_head;
            const isExpanded = getisExpanded(asset_class_head);
            if (current_class && isExpanded) {
              return (
                <div key={data_items.id} className="dropdownHeading">
                  <div>{data_items.name}</div>
                  <div>{data_items.ticker}</div>
                  <div>{data_items.avg_price || data_items.avg_value}</div>
                  <div>{data_items.market_price}</div>
                  <div>{data_items.latest_chg_pct}</div>
                  <div>{data_items.market_value_ccy}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

export default App;