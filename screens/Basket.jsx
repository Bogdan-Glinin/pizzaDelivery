import { Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components";

const Stack = createNativeStackNavigator();

const MainImage = styled.Image`
margin-top: 55px;
    height: 176px;
    width: 176px;
`

const NoOrder = styled.View`
    margin-top: 20px;
    padding-right: 30px;
    padding-left: 30px;
`;

const NoOrderTitle = styled.Text`
    font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #9D330C;
`

const Component = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MainImage source={require('../images/unlucky.png')} />
        </View>
    )
}

export const BasketScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Корзина" component={Component} options={{
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#fff" }
            }} />
        </Stack.Navigator>
    )
}