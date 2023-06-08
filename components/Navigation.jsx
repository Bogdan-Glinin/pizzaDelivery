import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../screens/Home";
import { PizzaScreen } from "../screens/Pizza";
import { HomeHeader } from "./HomeHeader";
import { SomeComponent } from "./someComponent";
import { Image } from "react-native";
import {BasketScreen} from "../screens/Basket"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: () => <HomeHeader />,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#fff" },
                }}
            />
            <Stack.Screen
                name="Pizza"
                component={PizzaScreen}
                options={{ title: "Конкретная пицца", headerShadowVisible: false }}
            />
        </Stack.Navigator>
    );
};

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: '#F15A24',}} initialRouteName="Меню">
                <Tab.Screen name="Профиль" component={SomeComponent} options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={require("../images/profile.png")} // Изображение пункта меню
                                style={{ tintColor: color }}
                            />
                        ),
                    }}/>
                <Tab.Screen
                    name="Меню"
                    component={HomeScreenNavigation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={require("../images/menu.png")} // Изображение пункта меню
                                style={{ tintColor: color }}
                            />
                        ),
                    }}
                />
                <Tab.Screen name="Корзина" component={BasketScreen} options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={require("../images/basket.png")} // Изображение пункта меню
                                style={{ tintColor: color }}
                            />
                        ),
                    }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};