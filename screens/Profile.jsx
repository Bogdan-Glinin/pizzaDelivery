import { RefreshControl, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import { ProfileHeader } from "../components/ProfileHeader";

const Stack = createNativeStackNavigator();

const Title = styled.Text`
    margin-top: 60px;
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
`;

const Login = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: gray;
    padding-bottom: 5px;
    width: 300px;
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    caret-color: #F15A24;
`

const Password = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: gray;
    padding-bottom: 5px;
    width: 300px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    caret-color: #F15A24;
`

const SignInButton = styled.View`
    margin-top: 40px;
    background: #F15A24;
    border-radius: 13px;
    margin-left: 90px;
    margin-right: 90px;
    width: 40%;

`

const SignInButtonText = styled.Text`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: center;
`

const SignUpButton = styled.View`
    margin-top: 10px;
    height: 40px;
    width: 180px;
`

const SignUpButtonText = styled.Text`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #F15A24;
`;

export let userId;

const SignIn = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUser] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchUsers = () => {
        setIsLoading(true);
        axios
            .get('https://647e12dcaf984710854ae6af.mockapi.io/users')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Ошибка', 'Не удалось получить данные');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const logIn = () =>{
        let userExist = false;
        users.filter((obj) => {
            
            if(obj.email == login && obj.password == password){
                userId = obj.id;
                userExist = true;
            }
        })
        if(userExist){
            navigation.navigate('Профиль');
        }
        else{
            Alert.alert("Ошибка", "Неверный логин или пароль");
        }
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchUsers();
        }
      }, [isFocused]);


    if (isLoading) {
        return (
            <Loading />
        )
    }


    const handleLoginChange = (value) => {
        setLogin(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    }; 

    return (
        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Title>
                    Вход
                </Title>
                <Login onChangeText={handleLoginChange} placeholder={'Логин'} />
                <Password onChangeText={handlePasswordChange} secureTextEntry placeholder={'Пароль'} />
                <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={logIn}>
                    <SignInButton>
                        <SignInButtonText>
                            Вход
                        </SignInButtonText>
                    </SignInButton>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Регистрация');
                }}>
                    <SignUpButton>
                        <SignUpButtonText>
                            Вас еще нет в системе?
                            Зарегистрируйтесь!
                        </SignUpButtonText>
                    </SignUpButton>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const SignUp = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUser] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLoginChange = (value) => {
        setLogin(value);
        setNameError('');
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordError('');
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError('');
    };

    const fetchUsers = () => {
        setIsLoading(true);
        axios
            .get('https://647e12dcaf984710854ae6af.mockapi.io/users')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Ошибка', 'Не удалось получить данные');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const createUser = () => {

        let errors = [];
        setEmailError('');
        setNameError('');
        setPasswordError('');

        // Проверка на наличие символа @ в поле email
        if (!email.includes('@')) {
            errors.push('Некорректный адрес электронной почты');
            setEmailError('Некорректный адрес электронной почты');
        }

        // Проверка на минимальную длину имени (3 символа)
        if (login.length < 3) {
            errors.push('Имя должно содержать не менее 3 символов');
            setNameError('Имя должно содержать не менее 3 символов');
        }

        if (password.length < 5) {
            errors.push('Пароль должно содержать не менее 5 символов');
            setNameError('Пароль должно содержать не менее 5 символов');
        }

        // Проверка на наличие ошибок
        if (errors.length > 0) {
            // Объединение ошибок в одну строку
            const errorMessage = errors.join('\n');
            // Вывод Alert с ошибками
            Alert.alert('Ошибка', errorMessage);
            return;
        }

        let userExist = false
        users.filter((obj) => {
            if (obj.email === email) {
                userExist = true;
            }
        })
        if (userExist) {
            alert("Почта занята")
        } else {
            axios.post('https://647e12dcaf984710854ae6af.mockapi.io/users', {
                name: login,
                email: email,
                password: password,
            })
        }

        userExist = false;
        userId = users.length + 1;
        navigation.navigate('Профиль');
    }

    React.useEffect(fetchUsers, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView refreshControl={<RefreshControl color="red" refreshing={isLoading} onRefresh={fetchUsers} />}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Title>
                    Регистрация
                </Title>
                <Login
                    onChangeText={handleLoginChange}
                    placeholder={'Имя'}
                    style={nameError ? { borderBottomColor: 'red' } : {}}
                />
                {nameError ? <Text>{nameError}</Text> : null}

                <Login
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    placeholder={'Email'}
                    style={emailError ? { borderBottomColor: 'red' } : {}}
                />
                {emailError ? <Text>{emailError}</Text> : null}

                <Password
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                    placeholder={'Пароль'}
                    style={passwordError ? { borderBottomColor: 'red' } : {}}
                />
                {passwordError ? <Text>{passwordError}</Text> : null}
                <TouchableOpacity onPress={() => {
                    createUser();
                }} style={{ width: '100%', alignItems: 'center' }}>
                    <SignInButton>
                        <SignInButtonText>
                            Регистрация
                        </SignInButtonText>
                    </SignInButton>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const UserName = styled.Text`
    margin-top: 15px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
`;

const UserEmail = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 3px;
`

const ExitButtonArea = styled.View`
    width: 140px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Exit = styled.Text`
    text-align: center;
    margin-top: 5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.7);   
`

const UserHistoryArea = styled.View`
    margin-top: 30px;
`;


const UserHistoryComponent = (props) => {

    return(
        <View style={{width: '100%', justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 10}}>
            <Text>Кол-во товара: {props.totalCount}</Text>
            <Text>Общая стоимость: {props.totalPrice}</Text>
        </View>
    )

    
}

const ProfileComponent = ({ navigation }) => {

    const[history, setHistory] = useState([]);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchUsers = () => {
        setIsLoading(true);
        axios
            .get('https://647e12dcaf984710854ae6af.mockapi.io/users/' + userId)
            .then(({ data }) => {
                setUser(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Ошибка', 'Не удалось получить данные');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const fetchHistory = () =>{
        setIsLoading(true);
        axios
        .get('https://64823f6d29fa1c5c5032c2e2.mockapi.io/history')
        .then(({ data }) => {
            setHistory(data);
        })
        .catch(err => {
            console.log(err);
            Alert.alert('Ошибка', 'Не удалось получить историю');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    var userHistoryArray = [];
    history.filter((obj) => {
        if(obj.userId === userId){
            userHistoryArray.push(obj);
        }
    });


    const isFocused = useIsFocused();

      useEffect(() => {
        if (isFocused) {
          // Код, который должен выполняться при каждом переходе на эту страницу
          fetchUsers()
          fetchHistory()

        }
      }, [isFocused]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView style={{paddingHorizontal: 10}} refreshControl={<RefreshControl color="red" refreshing={isLoading} onRefresh={fetchHistory} />}>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <UserHistoryArea>
                <Text>Мои заказы</Text>
                {
                    userHistoryArray.map((obj) =>{
                        return(
                            <UserHistoryComponent totalPrice={obj.totalPrice} totalCount={obj.totalCount}/>
                        )
                    })
                }
            </UserHistoryArea>
            <TouchableOpacity onPress={() => {
                userId = null;
                navigation.navigate('Вход');
            }}>
                <ExitButtonArea>
                    <Exit>Выйти</Exit>
                </ExitButtonArea>
            </TouchableOpacity>
        </ScrollView>
    )
}

export const Profile = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Вход" component={SignIn} 
            options={{
                headerTitle: () => <ProfileHeader/>,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#fff" },
            }}
            />
            <Stack.Screen name="Регистрация" component={SignUp} 
            options={{
                headerTitle: () => <ProfileHeader/>,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#fff" },
                headerLeft: null,
          headerBackVisible: false,
            }}
            />
            <Stack.Screen name="Профиль" component={ProfileComponent} options={{
          headerLeft: null,
          headerBackVisible: false,
          headerTitleStyle: {
            color: '#9D330C',
            fontSize: 24,
          },
          headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#fff" },
        }}/>
        </Stack.Navigator>
    )
}