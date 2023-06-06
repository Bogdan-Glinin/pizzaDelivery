import React from "react";
import { View, Alert } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { Loading } from "../components/Loading";

const ProductImage = styled.Image`
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
`;

const ProductName = styled.Text`
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
`;

const ProductPrice = styled.Text`
    font-size: 12px;
`;

export const PizzaScreen = ({route, navigation}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const {id, title} = route.params;

    React.useEffect(() => {
        navigation.setOptions({
            title,
        })
        axios
            .get('https://647e12dcaf984710854ae6af.mockapi.io/Products/' + id)
            .then(({ data }) => {
                setData(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Ошибка', 'Не удалось получить данные');
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
          <Loading/>
        )
      }    

    return (
        <View style={{ padding: 20, flexDirection: "column", alignItems: "center" }}>
            <ProductImage source={{ uri: data.imageSrc }} />
            <ProductName>{data.name}</ProductName>
            <ProductPrice>{data.price} руб.</ProductPrice>
        </View>
    )
}