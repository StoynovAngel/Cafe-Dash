import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/app/navigation/Navigation';
import {useAuth} from '@/app/context/AuthContext';
import {ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, Pressable, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import styles from "./Login.style";
import logo from "../../../assets/images/logo.png";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {login, logout} = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigation.navigate("test");
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={{uri: 'https://iili.io/3IoPfjI.jpg'}}
            style={styles.backgroundImage}
        >
            <View style={styles.navigationContainer}>
                <Pressable
                    onPress={() => navigation.navigate("test")}
                >
                    <Image style={styles.testButton} source={require('@/app/assets/images/navigation.png')}/>
                </Pressable>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <View style={styles.loginContainer}>
                        <Image source={logo} style={styles.logo}/>
                        <Text style={styles.title}><Text style={styles.highlight}>Welcome to </Text>Cafe-Dash</Text>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <TextInput
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                            mode="outlined"
                        />

                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            style={styles.loginButton}
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate("register")}
                            style={styles.registerButton}
                        >
                            Sign Up
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default Login;
