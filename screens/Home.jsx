import axios from 'axios';
import {
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,

} from 'react-native';
import { Product } from '../components/product';
import React from 'react';
import { Loading } from '../components/Loading';

export const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const fetchProducts = () => {
    setIsLoading(true);
    axios
      .get('https://647e12dcaf984710854ae6af.mockapi.io/Products')
      .then(({ data }) => {
        setItems(data);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить данные');
      }).finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(fetchProducts, []);

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl color="red" refreshing={isLoading} onRefresh={fetchProducts} />}
        data={items}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Pizza', {id: item.id, title: item.name});
          }}>
            <Product
              productName={item.name}
              productPrice={item.price}
              productImg={item.imageSrc}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
}