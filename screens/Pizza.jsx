import React, { useState } from "react";
import { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { Loading } from "../components/Loading";

const ProductImage = styled.Image`
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
`;

const ProductName = styled.Text`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #9D330C;

`;

const ProductPrice = styled.Text`
    font-size: 12px;
`;

const ProductInfo = styled.Text`
    margin-top: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
`;

const ChooseSize = styled.View`
    justify-content: space-between;
    flex-direction: row;
    margin-top: 30px;
    padding-left: 40px;
    padding-right: 40px;
`;

const SizeItem = styled.Text`
    height: 25px;
    width: 60px;
    border-radius: 10px;
    background: #D9D9D9;
    padding-top: 3px;
    text-align: center;
    color: #000000;
`;

const ToBasket = styled.Text`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 85px;
    padding-right: 85px;
    border-radius: 10px;
    background: #F15A24;
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
`;

const styles = StyleSheet.create({
    component: {
        height: 25,
        width: 60,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        paddingTop: 3,
        textAlign: 'center',
        color: '#000000',
    },
    activeComponent: {
        height: 25,
        width: 60,
        borderRadius: 10,
        backgroundColor: '#F15A24',
        paddingTop: 3,
        textAlign: 'center',
        color: "#FFFFFF"
    },
});

export const PizzaScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const { id, title } = route.params;
    const [activeComponent, setActiveComponent] = useState('component2');

    const pushData = () => {
        axios
            .post('https://647e12dcaf984710854ae6af.mockapi.io/users',
                {
                    email: "e4po4mack@gmail.com",
                    name: "Bogdan Glinin"

                })
    }

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
            <Loading />
        )
    }



    const handleComponentClick = (componentName) => {
        setActiveComponent(componentName);
    };

    return (
        <View style={{ alignItems: 'center', flexDirection: "column", backgroundColor: '#fff' }}>
            <ProductImage source={{ uri: data.imageSrc }} />
            <View style={{ paddingHorizontal: 10 }}>
                <ProductName >{data.name}</ProductName>
                <Text style={{ marginTop: 3, fontWeight: 400, fontSize: 15, color: "rgba(0, 0, 0, 0.7)", lineHeight: 20 }}>Средняя 30 см, традиционное тесто, 575 г</Text>
                <ProductInfo>{data.info}</ProductInfo>
                <ChooseSize>
                    <SizeItem onPress={() => handleComponentClick('component1')} style={[styles.component, activeComponent === 'component1' && styles.activeComponent]}>
                        26</SizeItem>
                    <SizeItem onPress={() => handleComponentClick('component2')} style={[styles.component, activeComponent === 'component2' && styles.activeComponent,]}>
                        30</SizeItem>
                    <SizeItem onPress={() => handleComponentClick('component3')} style={[styles.component, activeComponent === 'component3' && styles.activeComponent]}
                    >40</SizeItem>
                </ChooseSize>
                <TouchableOpacity style={{marginTop: 60}}>
                    <ToBasket>В корзину за 459₽</ToBasket>
                </TouchableOpacity>
            </View>
        </View>
    )
}