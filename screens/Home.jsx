import axios from 'axios';
import {
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  StyleSheet


} from 'react-native';
import { Product } from '../components/product';
import React, { useState, useRef } from 'react';
import { Loading } from '../components/Loading';
import { HomeHeader } from '../components/HomeHeader';
import styled from 'styled-components/native';
import { AnotherProduct } from '../components/anotherProduct';
import { State } from 'react-native-gesture-handler';

const TypeOfProduct = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #9D330C;
  margin-left: 21px;
  margin-top: 20px;
`;

const PizzaMenu = styled.View`
  padding-top: 10px;
  padding-left: 40px;
  padding-right: 40px;
  flex-direction: row;
  justify-content: space-between;
`;

const MenuItem = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;


const styles = StyleSheet.create({
  component: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  activeComponent: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#F15A24',
    textDecorationLine: 'underline'
  },
});

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [activeComponent, setActiveComponent] = useState('component1');

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const component1Ref = useRef(null);
  const component2Ref = useRef(null);
  const component3Ref = useRef(null);

  const scrollToComponent1 = () => {
    if (component1Ref.current) {
      component1Ref.current.scrollTo({ y: 0, animated: true });
    }
  };

  const scrollToComponent2 = () => {
    if (component2Ref.current) {
      component2Ref.current.scrollTo({ y: 0, animated: true });
    }
  };

  const scrollToComponent3 = () => {
    if (component3Ref.current) {
      component3Ref.current.scrollTo({ y: 0, animated: true });
    }
  };


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
      <Loading />
    )
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }} refreshControl={<RefreshControl color="red" refreshing={isLoading} onRefresh={fetchProducts} />}>
      <PizzaMenu>
        <Text onPress={() => {
          handleComponentClick('component1');
          scrollToComponent1();
        }}
          style={[styles.component, activeComponent === 'component1' && styles.activeComponent]}>Пиццы</Text>
        <Text onPress={() => {
          handleComponentClick('component2');
          scrollToComponent2();
        }}
          style={[styles.component, activeComponent === 'component2' && styles.activeComponent]}>Напитки</Text>
        <Text onPress={() => {
          handleComponentClick('component3');
          scrollToComponent3();
        }}
          style={[styles.component, activeComponent === 'component3' && styles.activeComponent]}>Соусы</Text>
      </PizzaMenu>
      <ScrollView ref={component1Ref}>
        <TypeOfProduct>Пицца</TypeOfProduct>
        {
          items.map((obj) => {
            if (obj.type == "pizza") {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Pizza', { id: obj.id, title: obj.name });
                }}>
                  <Product key={obj.id}
                    productName={obj.name}
                    productPrice={obj.price[0]}
                    productImg={obj.imageSrc}
                    productInfo={obj.info}
                  />
                </TouchableOpacity>)
            }

          })
        }
      </ScrollView>
      <ScrollView ref={component2Ref}>
        <TypeOfProduct>Напитки</TypeOfProduct>
        {
          items.map((obj) => {
            if (obj.type == "drink") {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Pizza', { id: obj.id, title: obj.name });
                }}>
                  <AnotherProduct key={obj.id}
                    productName={obj.name}
                    productPrice={obj.price[0]}
                    productImg={obj.imageSrc}
                    productInfo={obj.info}
                  />
                </TouchableOpacity>)
            }
          })
        }
      </ScrollView>
      <ScrollView ref={component3Ref}>
        <TypeOfProduct>Соусы</TypeOfProduct>
        {
          items.map((obj) => {
            if (obj.type == "sause") {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Pizza', { id: obj.id, title: obj.name });
                }}>
                  <AnotherProduct key={obj.id}
                    productName={obj.name}
                    productPrice={obj.price[0]}
                    productImg={obj.imageSrc}
                    productInfo={obj.info}
                  />
                </TouchableOpacity>)
            }
          })
        }
      </ScrollView>
    </ScrollView>
  );
}