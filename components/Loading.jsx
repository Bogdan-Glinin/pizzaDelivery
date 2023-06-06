import { View, ActivityIndicator, Text } from "react-native"

export const Loading = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" color="red" />
            <Text style={{ marginTop: 10 }}>Загрузка ...</Text>
        </View>
    )
}