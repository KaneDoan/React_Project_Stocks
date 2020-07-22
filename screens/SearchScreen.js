import React, { useState, useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { SearchHeader } from "../components/SearchHeader";
import { StockSymbols } from "../components/StockSymbols";

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({
    StocksList: [],
    filteredList: [],
  });

  const getStocks = () => {
    fetch(`${ServerURL}/all`)
      .then((response) => response.json())
      .then((result) => {
        AsyncStorage.setItem("StocksList", JSON.stringify(result));
        setState((oldState) => ({ ...oldState, StocksList: result }));
      })
      .catch((error) => {
        throw new Error("Fail to fetch data:", error);
      });
  };

  const updateFilteredList = (stocks) => {
    setState((oldState) => ({ ...oldState, filteredList: stocks }));
  };

  const filterStocks = (searchText) => {
    getStocks();
    if (searchText && searchText.length > 0) {
      updateFilteredList(
        state.StocksList.filter((stockItem) => {
          return (
            stockItem.symbol.indexOf(searchText.toUpperCase()) >= 0 ||
            stockItem.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
          );
        })
      );
    } else {
      updateFilteredList([]);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("StocksList")
      .then((stocks) => JSON.parse(stocks), getStocks())
      .then((StocksListParsed) => {
        setState((oldState) => ({ ...oldState, StocksList: StocksListParsed }));
      });
  }, []);

  return (
    <View>
      <SearchHeader onChangeText={filterStocks}></SearchHeader>
      <StockSymbols
        filteredList={state.filteredList}
        touchFn={addToWatchlist}
        navigation={navigation}
      ></StockSymbols>
    </View>
  );
}
