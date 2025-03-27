import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const sessionUser = supabase.auth.user();
    
    if (!sessionUser) {
      navigation.replace('SignIn');
    } else {
      fetchUserData(sessionUser.id);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigation.replace('SignIn');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from('user_details')
      .select('*')
      .eq('uuid', userId)
      .single();

    if (error) {
      console.error('Error fetching user data:', error.message);
    } else {
      setUser(data);
      setFullName(`${data.first_name} ${data.last_name}`);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during sign out:', error.message);
    } else {
      navigation.replace('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to My New App!</Text>
      {user && <Text style={styles.usernameText}>Hello, {fullName}!</Text>}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Calgary")}>
        <Text style={styles.buttonText}>Go to Calgary</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Edmonton")}>
        <Text style={styles.buttonText}>Go to Edmonton</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  welcomeText: { 
    fontSize: 30, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 15, 
    color: "#FFA500", 
  },
  usernameText: { 
    fontSize: 24, 
    fontWeight: "600", 
    textAlign: "center", 
    marginBottom: 40, 
    color: "#87CEFA", 
  },
  button: { 
    backgroundColor: "#FFFFFF", 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    marginBottom: 20, 
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#87CEFA",
    elevation: 3, 
    shadowColor: "#87CEFA", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFA500", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
});
