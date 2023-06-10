import { View, Text, Image } from "react-native";

export const ProfileHeader = () => {
    return(
        <View style={{height: 85, flexDirection: "row"}}>
            <View><Image style={{transform: [{ scale: 0.4 }], position:'relative', left: -70, top: -15}} source={require('../images/headerLogo.png')}/></View>
        </View>
    )
}