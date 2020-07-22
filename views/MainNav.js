import React from 'react';
import withContainer from '../withContainer';
import MyHomeNav from '../components/navigation/MyHomeNav';
import MyBooksNav from '../components/navigation/MyBooksNav';
import MySearchNav from '../components/navigation/MySearchNav';
import MyLessonsNav from '../components/navigation/MyLessonsNav';
import SettingsNav from '../components/navigation/SettingsNav';
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
                      width="30"
                      height="30"
                    />
                  );
                case 'Books':
                  return (
                    <Icon
                      name="book"
                      color={focused ? '#83bb44' : '#343a40'}
                      width="30"
                      height="30"
                    />
                  );
                case 'Search':
                  return (
                    <Icon
                      name="search"
                      color={focused ? '#83bb44' : '#343a40'}
                      width="30"
                      height="30"
                    />
                  );
                case 'Lessons':
                  return (
                    <Icon
                      name="lessons"
                      color={focused ? '#83bb44' : '#343a40'}
                      width="30"
                      height="30"
                    />
                  );
                case 'Me':
                  return (
                    <Icon
                      name="settings"
                      color={focused ? '#83bb44' : '#343a40'}
                      width="30"
                      height="30"
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
            activeBackgroundColor: '#ffffff',
            inactiveBackgroundColor: '#ffffff',
            tabStyle: {
              paddingTop: 8,
            },
            style: {
              height: 50,
            },
          }}
        >
          <Tab.Screen name="Home" component={MyHomeNav} />
          <Tab.Screen name="Books" component={MyBooksNav} />
          <Tab.Screen name="Search" component={MySearchNav} />
          <Tab.Screen name="Lessons" component={MyLessonsNav} />
          <Tab.Screen name="Me" component={SettingsNav} />
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
