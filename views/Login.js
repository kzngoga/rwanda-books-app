import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Foect from 'foect';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../components/utilities/Logo';
import Icon from '../components/utilities/Icon';
import CustomButton from '../components/utilities/CustomButton';
import LoaderButton from '../components/utilities/LoaderButton';
import withContainer from '../withContainer';
import loginAction from '../redux/actions/user/login';

class Login extends Component {
  state = {
    account: '',
    password: '',
    loadText: false,
    fontLoaded: false,
    isPasswordShown: false,
    isSubmitted: false,
    withErrors: false,
    message: '',
    isSubmitting: false,
    isLoading: false,
  };

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.status === 'user_login_success') {
      this.setState({
        account: '',
        password: '',
        loadText: false,
        isSubmitted: true,
        withErrors: false,
        isSubmitting: false,
      });
      return this.setToken(user.token);
    }
    if (user.status === 'user_login_error') {
      const { error } = user;
      if (error.status === 404) {
        return this.setState({
          loadText: false,
          withErrors: true,
          isSubmitted: true,
          message: "Email or username doesn't exist!",
          isSubmitting: false,
        });
      }
      if (error.status === 400) {
        return this.setState({
          loadText: false,
          withErrors: true,
          isSubmitted: true,
          message: 'Password is Incorrect!',
          isSubmitting: false,
        });
      }
      if (error.status === 401) {
        return this.setState({
          loadText: false,
          withErrors: true,
          isSubmitted: true,
          message: 'Please verify your email first!',
          isSubmitting: false,
        });
      }
      if (error.status === 500) {
        return this.setState({
          withErrors: true,
          loadText: false,
          isSubmitted: true,
          message: 'Ooops, An error Occured!',
          isSubmitting: false,
        });
      }
    }
  }

  setToken = async (value) => {
    try {
      await AsyncStorage.setItem('RB_userToken', String(value));
      const {
        navigation: { navigate },
      } = this.props;
      return navigate('MainApp');
    } catch (e) {
      console.warn(e);
    }
  };

  showPassword = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  goToSignUp = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('SignUp');
  };

  goToResetPwd = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('ResetPassword');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const { loginAction: login } = this.props;
    this.setState({
      loadText: true,
    });
    const { account, password } = this.state;
    return login({ account, password });
  };

  render() {
    const {
      loadText,
      isPasswordShown,
      isSubmitted,
      message,
      withErrors,
    } = this.state;
    const togglEye = isPasswordShown ? 'eyeClosed' : 'eyeOpen';

    return (
      <>
        <KeyboardAvoidingView>
          <ScrollView>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
              <View style={styles.signUpContent}>
                <>
                  <Logo marginTop={0} />
                  <Text
                    style={{
                      fontSize: 23,
                      fontFamily: 'OpenSans-Bold',
                      color: '#343a40',
                      marginTop: 40,
                    }}
                  >
                    Login Here{' '}
                  </Text>
                  <View
                    style={{ width: 40, backgroundColor: '#83bb44', height: 5 }}
                  />
                  <View style={styles.form}>
                    <Foect.Form onValidSubmit={(model) => {}}>
                      {(form) => (
                        <View>
                          {/* Username/Email Input */}
                          <Foect.Control name="account" required>
                            {(control) => (
                              <View>
                                <TextInput
                                  onSubmitEditing={this.handleSubmit}
                                  editable={!this.state.isSubmitting}
                                  style={styles.inputField}
                                  placeholder="Username or Email"
                                  placeholderTextColor="#b3b3b3"
                                  keyboardType="email-address"
                                  onBlur={control.markAsTouched}
                                  onChangeText={(text) => {
                                    control.onChange(text);
                                    const lower = text.toLowerCase();
                                    this.setState({ account: lower });
                                  }}
                                />

                                {control.isTouched && control.isInvalid && (
                                  <Text style={styles.errorMsg}>
                                    Field Can't be empty!
                                  </Text>
                                )}
                              </View>
                            )}
                          </Foect.Control>

                          {/* Password Input */}
                          <View>
                            <Foect.Control name="password" required>
                              {(control) => (
                                <View>
                                  <TextInput
                                    onSubmitEditing={this.handleSubmit}
                                    editable={!this.state.isSubmitting}
                                    style={styles.inputField}
                                    placeholder="Password"
                                    placeholderTextColor="#b3b3b3"
                                    secureTextEntry={
                                      isPasswordShown ? false : true
                                    }
                                    onBlur={control.markAsTouched}
                                    onChangeText={(text) => {
                                      control.onChange(text);
                                      this.setState({ password: text });
                                    }}
                                  />

                                  {control.isTouched && control.isInvalid && (
                                    <Text style={styles.errorMsg}>
                                      Field Can't be empty!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </Foect.Control>
                            <TouchableOpacity
                              style={styles.iconStyle}
                              onPress={this.showPassword}
                            >
                              <Icon
                                name={togglEye}
                                width={20}
                                height={20}
                                color="#C4C4C4"
                              />
                            </TouchableOpacity>
                          </View>

                          <Text
                            style={styles.underlinedText}
                            onPress={this.goToResetPwd}
                          >
                            Forgot Password ?
                          </Text>

                          {isSubmitted ? (
                            <Text
                              style={[
                                styles.messageTxt,
                                { color: withErrors ? '#f56363' : '#4CAF50' },
                              ]}
                            >
                              {message}
                            </Text>
                          ) : null}

                          <View style={styles.buttonStyle}>
                            {loadText ? (
                              <LoaderButton
                                width={250}
                                fontSize={16}
                                loaderColor="#ffffff"
                                color="#8c8c8c"
                                disabledColor="#8c8c8c"
                                padding={13}
                                marginTop={30}
                              />
                            ) : (
                              <CustomButton
                                width={250}
                                fontSize={18}
                                text="Login"
                                color="#83bb44"
                                disabledColor="#8c8c8c"
                                validity={form.isInvalid}
                                marginTop={28}
                                padding={13}
                                onPress={this.handleSubmit}
                              />
                            )}
                          </View>

                          {/* Already a member? */}
                          <Text style={styles.memberText}>
                            Don't have an account ?{' '}
                            <Text
                              style={styles.loginText}
                              onPress={this.goToSignUp}
                            >
                              Sign Up Here.
                            </Text>
                          </Text>
                        </View>
                      )}
                    </Foect.Form>
                  </View>
                </>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  signUpContent: {
    flex: 1,
    alignItems: 'center',
  },

  form: {
    marginTop: 20,
    flex: 1,
  },

  inputField: {
    width: 250,
    height: 45,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#f0f2f4',
    borderStyle: 'solid',
    color: '#727075',
    fontFamily: 'OpenSans-Regular',
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 13,
    marginTop: 18,
  },

  memberText: {
    fontFamily: 'OpenSans-Regular',
    marginTop: 50,
    marginBottom: 10,
    fontSize: 13,
    color: '#343a40',
    textAlign: 'center',
  },

  messageTxt: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    marginTop: 10,
  },

  loginText: {
    textDecorationLine: 'underline',
    marginLeft: 5,
  },

  underlinedText: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
    color: '#343a40',
    fontSize: 12,
  },

  iconStyle: {
    textAlign: 'right',
    position: 'absolute',
    right: 18,
    top: 32,
  },

  errorMsg: {
    color: '#f56363',
  },

  loadingTxt: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const mapStateFromProps = ({ user }) => ({ user });

export default connect(mapStateFromProps, { loginAction })(
  withContainer(Login)
);
