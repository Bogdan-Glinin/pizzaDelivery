import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components";
import state from "../state/state";
import React, { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import axios from "axios";
const CountOfProductArea = styled.View`

`;

const CountOfProduct = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    padding-top: 5px;
    padding-left: 15px;
`

const ProductInBasket = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-left: 40px;
    margin-right: 8px;
    height: 115px;
    border-radius: 10px;
    border: 1px solid #BEBEBE;
`;

const ProductImage = styled.Image`
    position: relative;
    left: -30px;
      width: 103px;
      height: 103px;
`;

const ProductInBasketArea = styled.View`
    width: 70%;
    position: relative;
    left: -25px;
`

const ProductInBasketTitle = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #000000;
`

const ProductInBasketInfo = styled.Text`
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.7);
`

const ProductInBasketCount = styled.View`
    padding-left: 8px;
    padding-right: 8px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    width: 100px;
    height: 30px;
    border: 1px solid #BEBEBE;
    border-radius: 10px;
`

const Minus = styled.Text`
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    margin-top: 2px;
`

const CountItem = styled.Text`
    margin-top: 7px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
`

const Plus = styled.Text`
font-weight: 400;
font-size: 16px;
text-align: center;
margin-top: 2px;
`

const ProductPrice = styled.Text`
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #F15A24;
    text-align: right;
`

export const ProductInBasketComponent = ({ imageSrc, title, price, id, productCount, reload }) => {
  const [count, setCount] = React.useState(productCount);

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateProductCount(newCount);
  };

  const decrementCount = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateProductCount(newCount);
    }
  };

  const updateProductCount = async (newCount) => {
    try {
      await axios.put("https://64823f6d29fa1c5c5032c2e2.mockapi.io/basket/" + id, { productCount: newCount });
      reload(); // Вызываем функцию перезагрузки после успешного обновления
    } catch (error) {
      console.log(error);
      Alert.alert("Ошибка", "Не удалось обновить количество продукта");
    }
  };

  return (
    <ProductInBasket>
      <ProductImage source={{ uri: imageSrc }} />
      <ProductInBasketArea>
        <ProductInBasketTitle>{title}</ProductInBasketTitle>
        <ProductInBasketInfo>Средняя 30 см, 575 г</ProductInBasketInfo>
        <ProductInBasketCount>
          <TouchableOpacity onPress={decrementCount}>
            <Minus>-</Minus>
          </TouchableOpacity>
          <CountItem>{count}</CountItem>
          <TouchableOpacity onPress={incrementCount}>
            <Plus>+</Plus>
          </TouchableOpacity>
        </ProductInBasketCount>
        <ProductPrice>{count * price} ₽</ProductPrice>
      </ProductInBasketArea>
    </ProductInBasket>
  );
};