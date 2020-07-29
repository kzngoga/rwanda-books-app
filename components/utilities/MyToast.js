import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, Animated } from 'react-native';
import clearToast from '../../redux/actions/toast/clearToast';
const MyToast = ({ toast, clearToast: clear }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast.message) {
      fadeIn();
    }
  }, [toast]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start(() =>
      setTimeout(() => {
        fadeOut();
      }, 2000)
    );
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start(() => clear());
  };

  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim,
          position: 'absolute',
          right: 0,
          left: 0,
          top: 20,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99,
        }}
      >
        <View>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#8c8c8c',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
                fontFamily: 'OpenSans-SemiBold',
              }}
            >
              {toast.message}
            </Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const mapStateToProps = ({ toast }) => ({
  toast,
});
export default connect(mapStateToProps, { clearToast })(MyToast);
