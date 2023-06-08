import { View, Text, Image } from "react-native";

export const HomeHeader = () => {
    return(
        <View style={{height: 85, flexDirection: "row"}}>
            <View style={{ width: '20%', position: 'relative', left: -16}}><Image  source={require('../images/headerImg.png')}/></View>
            <View style={{width: '80%', alignItems: 'center'}}><Image style={{marginTop: 22, }} source={require('../images/headerLogo.png')}/></View>
        </View>
    )
}