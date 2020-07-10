import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = (props) => {
  return (
    <>
      <View style={[styles.logo, { marginTop: props.marginTop }]}>
        <Image
          source={require('../../assets/images/splashLogo.png')}
          style={styles.logoImg}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    padding: 20,
  },

  logoImg: {
    width: 400,
    height: 100,
  },
});

export default Logo;
