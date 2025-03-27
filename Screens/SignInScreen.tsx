import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from "../supabase";

const SignInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const user = supabase.auth.user();
        if (user) {
            navigation.navigate('Home', { username: user.email });
        }
    };

    const handleLogin = async () => {
        if (isSignUp) {
            const { user, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                alert(error.message);
            } else {
                
                const { data, insertError } = await supabase
                    .from('user_details')
                    .insert([{ uuid: user.id, first_name: firstName, last_name: lastName, email }]);
                if (insertError) {
                    alert(insertError.message);
                } else {
                    navigation.navigate('Home', { username: email });
                }
            }
        } else {
            const { user, error } = await supabase.auth.signIn({ email, password });
            if (error) {
                alert(error.message);
            } else {
                navigation.navigate('Home', { username: email });
            }
        }
    };

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            {isSignUp && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="words"
                    />
                </>
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSignUp} style={styles.button}>
                <Text>{isSignUp ? 'Switch to Sign In' : 'Need an account? Sign Up'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});
