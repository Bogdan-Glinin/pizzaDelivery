import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components";
import state from "../state/state";
import React, { useState, useEffect, useCallback } from "react";
import { Loading } from "../components/Loading";
import axios from "axios";
import { ProductInBasketComponent } from "../components/ProductInBasket";
import { userId } from "./Profile";
import { useIsFocused } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const MainImage = styled.Image`
  margin-top: 55px;
  height: 176px;
  width: 176px;
`;

const NoOrder = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const NoOrderTitle = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #9D330C;
`;

const NoOrderInfo = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

const NoOrderButton = styled.Text`
  background: #F15A24;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
`;

const CountOfProductArea = styled.View``;

const CountOfProduct = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  padding-top: 5px;
  padding-left: 15px;
`;

const CompliteOrederButton = styled.View`
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    background: #F15A24;
    border-radius: 10px;
`

const CompliteOrederButtonText = styled.Text`
padding-top: 12px;
padding-bottom: 12px;
text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #FFFFFF;
`

const SecondComponent = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(0);

    const reload = useCallback(() => {
        setIsLoading(true);
        fetchProducts().then(() => {
            fetchBasket().then(() => {
                setIsLoading(false);
            });
        });
    }, []);

    const fetchBasket = useCallback(() => {
        return axios
            .get("https://64823f6d29fa1c5c5032c2e2.mockapi.io/basket")
            .then(({ data }) => {
                setProducts(data);
                calculateTotal(data);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Ошибка", "Не удалось получить данные");
            });
    }, []);

    const calculateTotal = useCallback((basketData) => {
        let count = 0;
        let price = 0;
        basketData.forEach((obj) => {
            if (obj.userId === userId) {
                count += obj.productCount;
                price += obj.productPrice * obj.productCount;
            }
        });
        setTotalCount(count);
        setTotalPrice(price);
    }, []);

    const fetchProducts = useCallback(() => {
        return axios
            .get("https://647e12dcaf984710854ae6af.mockapi.io/Products")
            .then(({ data }) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Ошибка", "Не удалось получить данные");
            });
    }, []);


    const confirmPurchase = () => {
        axios
          .post('https://64823f6d29fa1c5c5032c2e2.mockapi.io/history', {
            totalPrice: totalPrice,
            totalCount: totalCount,
            userId: userId,
          })
          .then(() => {
            // Фильтруем продукты
            const filteredProducts = products.filter((obj) => obj.userId === userId);
      
            // Создаем промисы для удаления элементов в корзине
            const deletePromises = filteredProducts.map((obj) => {
              return axios.delete(
                'https://64823f6d29fa1c5c5032c2e2.mockapi.io/basket/' + obj.id
              );
            });
      
            // Выполняем все промисы для удаления
            return Promise.all(deletePromises);
          })
          .then(reload)
          .then(() => {
            navigation.navigate('Профиль');
          });
      };

      const isFocused = useIsFocused();

      useEffect(() => {
        if (isFocused) {
          // Код, который должен выполняться при каждом переходе на эту страницу
          reload();
        }
      }, [isFocused]);

    if (isLoading) {
        return <Loading />;
    }



    const Basket = products.filter((obj) => obj.userId === userId);

    if (!Basket[0]) {
        return (
            <ScrollView
                style={{ backgroundColor: "#fff" }}
                refreshControl={
                    <RefreshControl
                        color="red"
                        refreshing={isLoading}
                        onRefresh={reload}
                    />
                }
            >
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <MainImage source={require("../images/unlucky.png")} />
                    <NoOrder>
                        <NoOrderTitle>У вас пока нет заказов</NoOrderTitle>
                        <NoOrderInfo>
                            Разместите свой первый заказ, чтобы проверить его детали
                        </NoOrderInfo>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 90, marginTop: 20 }}
                            onPress={() => {
                                navigation.navigate("Меню");
                            }}
                        >
                            <NoOrderButton>В меню</NoOrderButton>
                        </TouchableOpacity>
                    </NoOrder>
                </View>
            </ScrollView>
        );
    } else {
        return (
            <ScrollView
                style={{ backgroundColor: "#fff" }}
                refreshControl={
                    <RefreshControl
                        color="red"
                        refreshing={isLoading}
                        onRefresh={reload}
                    />
                }
            >
                <CountOfProductArea>
                    <CountOfProduct>
                        {totalCount} товар на {totalPrice} ₽
                    </CountOfProduct>
                </CountOfProductArea>
                {Basket.map((obj) => {
                    const Product = items.find((e) => e.id === obj.productId);
                    return (
                        <ProductInBasketComponent
                            calculateTotal={calculateTotal}
                            reload={reload}
                            id={obj.id}
                            productCount={obj.productCount}
                            imageSrc={Product.imageSrc}
                            title={Product.name}
                            price={obj.productPrice}
                        />
                    );
                })}
                <TouchableOpacity onPress={confirmPurchase}>
                    <CompliteOrederButton>
                        <CompliteOrederButtonText>
                            Оформить заказ на {totalPrice} ₽
                        </CompliteOrederButtonText>
                    </CompliteOrederButton>
                </TouchableOpacity>
            </ScrollView>
        );
    }
};

export const BasketScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Корзина"
                component={SecondComponent}
                options={{
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#fff" },
                }}
            />
        </Stack.Navigator>
    );
};