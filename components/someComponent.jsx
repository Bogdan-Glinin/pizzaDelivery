import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Component = () =>{
    return(
        <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Text>Компоненты</Text>
        </View>
    )
}

export const SomeComponent = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="blabla" component={Component}/>
        </Stack.Navigator>
    )
}