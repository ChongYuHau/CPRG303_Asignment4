import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./Screens/SignInScreen";
import TabNavigator from "./Screens/TabNavigator";

// ✅ Define navigation types
type RootStackParamList = {
  SignIn: undefined;
  Home: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home">
          {({ route }) => <TabNavigator username={route.params?.username} />}  
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
