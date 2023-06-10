import { View, Text, Image } from "react-native";

export const HomeHeader = () => {
    return(
        <View style={{height: 85, flexDirection: "row"}}>
            <View style={{ width: '20%', position: 'relative', left: -60, top: -10}}><Image style={{width: 150, height: 100, transform: [{rotate: '45deg'}]}}  source={require('../images/headerImg.png')}/></View>
            <View style={{width: '80%', alignItems: 'center'}}><Image style={{transform: [{ scale: 0.4 }], position: 'relative', top: -25 }} source={require('../images/headerLogo.png')}/></View>
        </View>
    )
}