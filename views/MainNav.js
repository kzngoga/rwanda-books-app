import React from 'react';
import withContainer from '../withContainer';
import MyHomeNav from '../components/navigation/MyHomeNav';
import Icon from '../components/utilities/Icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const AppTabNav = () => {
  const TabNav = () => {
    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              switch (route.name) {
                case 'Home':
                  return (
                    <Icon
                      name="home"
                      color={focused ? '#83bb44' : '#343a40'}
                      width="25"
                      height="22"
                    />
                  );
              }
            },
          })}
          tabBarOptions={{
            labelStyle: {
              fontFamily: 'OpenSans-Regular',
            },
            activeTintColor: '#83bb44',
            inactiveTintColor: '#343a40',
            activeBackgroundColor: 'black',
            inactiveBackgroundColor: 'black',
            tabStyle: {
              paddingTop: 4,
            },
            style: {
              height: 50,
            },
          }}
        >
          <Tab.Screen name="Home" component={MyHomeNav} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <>
      <TabNav />
    </>
  );
};

export default withContainer(AppTabNav);
