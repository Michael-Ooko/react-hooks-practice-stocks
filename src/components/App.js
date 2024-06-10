import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => {
        setStocks(data);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  const handleBuy = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleSell = (stockId) => {
    setPortfolio(portfolio.filter((stock) => stock.id !== stockId));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredStocks = filter === "All" ? stocks : stocks.filter((stock) => stock.type === filter);

  return (
    <div>
      <Header />
      <SearchBar onFilterChange={handleFilterChange} />
      <MainContainer>
        <StockContainer stocks={filteredStocks} onBuy={handleBuy} />
        <PortfolioContainer portfolio={portfolio} onSell={handleSell} />
      </MainContainer>
    </div>
  );
}

export default App;
