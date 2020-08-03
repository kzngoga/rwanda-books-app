import React, { useState } from 'react';
import AppHeader from './HomeHeader';
import { View } from 'react-native';

export default (ScreenComp, savedNoBack) => (props) => {
  const [screens, setScreens] = useState([]);
  const [noBack, setNoBack] = useState(false);

  const popScreen = () => {
    setScreens(screens.slice(0, -1));
  };

  return (
    <>
      <AppHeader
        navigation={props.navigation}
        screens={screens}
        popScreen={popScreen}
        noBack={noBack}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <ScreenComp
          {...props}
          addScreen={(value, noBackValue) => {
            setNoBack(!!noBackValue);
            setScreens(screens.concat(value));
          }}
          noBack={!!savedNoBack}
        />
      </View>
    </>
  );
};
