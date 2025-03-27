import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import CityScreen from "./CityScreen";

type TabParamList = {
  Home: { username: string }; 
  Calgary: undefined;
  Edmonton: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = ({ username }: { username: string }) => {
  return (
    <Tab.Navigator>
      {/* Home Screen Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}  
        initialParams={{ username }}  
      />

      {/* Calgary Screen Tab */}
      <Tab.Screen name="Calgary">
        {() => <CityScreen city="Calgary" link="https://www.calgary.ca/home.html" />}
      </Tab.Screen>

      {/* Edmonton Screen Tab */}
      <Tab.Screen name="Edmonton">
        {() => <CityScreen city="Edmonton" link="https://www.edmonton.ca/" />}
      </Tab.Screen>

    </Tab.Navigator>
  );
};

export default TabNavigator;
