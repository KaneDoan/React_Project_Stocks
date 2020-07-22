import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { scaleSize } from '../constants/Layout';

function getSelectedStockBg(item, watchList) {
  if (item === watchList.selectedStock) {
    return "#808080" //Grey
  } else {
    return "#111" //Black
  }
}

function getPercentageColor(percentage) {
  if (percentage >= 0) {
    return "#32cd32"; //Green
  } else {
    return "#ff0000"; //Red
  }
}

function getPercentageSinceOpen(close, open) {
  return ((100 * (close - open)) / open).toFixed(2);
}

export const StockListDetails = ({ item, state, watchList, selectStock }) => {
  if (state.stocksDetails && state.stocksDetails[item]) {
    const stockObj = state.stocksDetails[item];
    return (
      <TouchableHighlight style={styles.stockItem} onPress={() => selectStock(item)}>
        <View style={[styles.stockDetails, { backgroundColor: getSelectedStockBg(item, watchList) }]}>
          <Text style={styles.stockSymbol}>{stockObj.symbol}</Text>
          <Text style={styles.stockClose}> {stockObj.close}</Text>
          <Text style={[styles.stockPercentage,
          { backgroundColor: getPercentageColor(getPercentageSinceOpen(stockObj.close, stockObj.open)) }]}>
            {getPercentageSinceOpen(stockObj.close, stockObj.open)}%</Text>
        </View>
      </TouchableHighlight >)
  } else {
    return null
  }
};


const styles = StyleSheet.create({
  stockDetails: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  stockSymbol: {
    marginLeft: scaleSize(5),
    flex: 1,
    lineHeight: scaleSize(38),
    fontSize: scaleSize(18),
    color: '#fff',
  },
  stockClose: {
    alignSelf: 'flex-end',
    lineHeight: scaleSize(40),
    fontSize: scaleSize(20),
    color: '#fff',
  },
  stockPercentage: {
    marginLeft: scaleSize(25),
    height: scaleSize(35),
    alignSelf: 'flex-end',
    fontSize: scaleSize(17),
    width: scaleSize(110),
    paddingRight: scaleSize(5),
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(5),
    borderRadius: 10,
    textAlign: 'right',
    color: '#fff',
  },
});