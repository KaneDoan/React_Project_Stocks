import React from 'react';
import { FlatList } from 'react-native';
import { StockListDetails } from './StockListDetails'

export const StocksList = ({ watchList, state, selectStock }) => {
  if (watchList.symbols) {
    return (
      <FlatList
        data={watchList.symbols}
        renderItem={({ item }) => <StockListDetails item={item} selectStock={selectStock} state={state} watchList={watchList} />}
        keyExtractor={(item) => item}>
      </FlatList>
    )
  }
}