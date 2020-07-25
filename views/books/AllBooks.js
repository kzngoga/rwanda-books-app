import React, { useState } from 'react';
import { View, SafeAreaView, Text, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';

const LessonsScreen = ({ addScreen, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState('initial');

  useFocusEffect(
    React.useCallback(() => {
      addScreen('All Books');
      setRefreshing(false);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setStatus('fetching');
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#8c8c8c' }} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Text>All Books</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default LessonsScreen;
