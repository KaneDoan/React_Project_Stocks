import React from 'react';
import { FlatList } from 'react-native';
import { StockDetail } from './StockDetail';

export const StockSymbols = ({ filteredList, touchFn, navigation }) => {
  return (<FlatList keyboardShouldPersistTaps='always'
    data={filteredList}
    renderItem={({ item }) => <StockDetail item={item} touchFn={touchFn} navigation={navigation} />}
    keyExtractor={(item) => item.symbol}></FlatList>)
}