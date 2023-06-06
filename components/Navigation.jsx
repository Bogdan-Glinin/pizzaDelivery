import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../screens/Home";
import { PizzaScreen } from "../screens/Pizza";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Пицца' }} />
                <Stack.Screen name="Pizza" component={PizzaScreen} options={{ title: 'Конкретная пицца' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}