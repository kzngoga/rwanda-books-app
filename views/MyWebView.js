import React from 'react';
import 'react-native-get-random-values';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';

export default ({ navigation, addScreen }) => {
  const { title, url } = navigation.state.params;
  useFocusEffect(
    React.useCallback(() => {
      addScreen(title);
    }, [])
  );

  const renderLoadingView = () => {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color="#83bb44" />
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#8c8c8c' }} />
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <WebView
          source={{ uri: url }}
          renderLoading={renderLoadingView}
          startInLoadingState={true}
          onShouldStartLoadWithRequest={() => {
            return true;
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
