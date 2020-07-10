import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Foect from 'foect';
import Icon from '../components/utilities/Icon';

import Logo from '../components/utilities/Logo';
import CustomButton from '../components/utilities/CustomButton';
import LoaderButton from '../components/utilities/LoaderButton';
import withContainer from '../withContainer';
import signUpAction from '../redux/actions/user/signUp';

class SignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    country: '',
    phoneNumber: '',
    loadText: false,
    isPasswordShown: false,
    isSubmitted: false,
    withErrors: false,
    message: '',
    isSubmitting: false,
  };

  componentWillReceiveProps(nextProps) {
    const { signUp } = nextProps;
    if (signUp.status === 'signup_success') {
      this.setState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        loadText: false,
        isPasswordShown: false,
        isSubmitted: false,
        withErrors: false,
        message: '',
        isSubmitting: false,
      });
      const {
        navigation: { navigate },
      } = this.props;
      return navigate('SuccessPage', {
        params: { type: 'signUp' },
      });
    }
    if (signUp.status === 'signup_error') {
      const { error } = signUp;
      if (error.status === 409) {
        return this.setState({
          loadText: false,
          withErrors: true,
          isSubmitted: true,
          message: 'Account already exist!',
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

  showPassword = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  goToLogin = () => {
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('Login');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const { signUpAction: signUp } = this.props;
    this.setState({
      loadText: true,
    });
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      country,
      phoneNumber,
    } = this.state;
    return signUp({
      firstname,
      lastname,
      email,
      username,
      password,
      country,
      phoneNumber,
    });
  };

  render() {
    const {
      loadText,
      isPasswordShown,
      isSubmitted,
      message,
      withErrors,
      firstname,
      lastname,
      email,
      username,
      password,
      country,
      phoneNumber,
    } = this.state;
    const togglEye = isPasswordShown ? 'eyeClosed' : 'eyeOpen';

    return (
      <>
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={styles.signUpContent}>
              <>
                <Logo marginTop={0} />
                <Text
                  style={{
                    fontSize: 23,
                    fontFamily: 'OpenSans-Bold',
                    color: '#343a40',
                  }}
                >
                  Create Account{' '}
                </Text>
                <View
                  style={{ width: 60, backgroundColor: '#83bb44', height: 5 }}
                />
                <View style={styles.form}>
                  <Foect.Form onValidSubmit={(model) => {}}>
                    {(form) => (
                      <View>
                        {/* Firstname Input */}
                        <Foect.Control
                          name="firstname"
                          required
                          minLength={2}
                          maxLength={32}
                          pattern={/^[a-zA-Z ]+$/}
                        >
                          {(control) => (
                            <View>
                              <TextInput
                                onSubmitEditing={this.handleSubmit}
                                editable={!this.state.isSubmitting}
                                style={styles.inputField}
                                placeholder="Firstname"
                                placeholderTextColor="#727075"
                                onBlur={control.markAsTouched}
                                onChangeText={(text) => {
                                  control.onChange(text);
                                  this.setState({ firstname: text });
                                }}
                                value={firstname}
                              />

                              {control.isTouched && control.isInvalid && (
                                <View>
                                  {control.errors.pattern ? (
                                    <Text style={styles.errorMsg}>
                                      Enter a valid firstname!
                                    </Text>
                                  ) : (
                                    <Text style={styles.errorMsg}>
                                      Please enter firstname!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </Foect.Control>

                        {/* Lastname Input */}
                        <Foect.Control
                          name="lastname"
                          required
                          minLength={2}
                          maxLength={32}
                          pattern={/^[a-zA-Z ]+$/}
                        >
                          {(control) => (
                            <View>
                              <TextInput
                                onSubmitEditing={this.handleSubmit}
                                editable={!this.state.isSubmitting}
                                style={styles.inputField}
                                placeholder="Lastname"
                                placeholderTextColor="#727075"
                                onBlur={control.markAsTouched}
                                onChangeText={(text) => {
                                  control.onChange(text);
                                  this.setState({ lastname: text });
                                }}
                                value={lastname}
                              />

                              {control.isTouched && control.isInvalid && (
                                <View>
                                  {control.errors.pattern ? (
                                    <Text style={styles.errorMsg}>
                                      Enter a valid lastname!
                                    </Text>
                                  ) : (
                                    <Text style={styles.errorMsg}>
                                      Please enter lastname!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </Foect.Control>

                        {/* Email Input */}
                        <Foect.Control
                          name="email"
                          required
                          pattern={
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          }
                        >
                          {(control) => (
                            <View>
                              <TextInput
                                onSubmitEditing={this.handleSubmit}
                                editable={!this.state.isSubmitting}
                                style={styles.inputField}
                                placeholder="Email Address"
                                placeholderTextColor="#727075"
                                keyboardType="email-address"
                                onBlur={control.markAsTouched}
                                onChangeText={(text) => {
                                  control.onChange(text);
                                  const lower = text.toLowerCase();
                                  this.setState({ email: lower });
                                }}
                                value={email}
                              />

                              {control.isTouched && control.isInvalid && (
                                <View>
                                  {control.errors.pattern ? (
                                    <Text style={styles.errorMsg}>
                                      Enter a valid email!
                                    </Text>
                                  ) : (
                                    <Text style={styles.errorMsg}>
                                      Please enter email!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </Foect.Control>

                        {/* Username Input */}
                        <Foect.Control
                          name="username"
                          required
                          minLength={6}
                          maxLength={25}
                          pattern={/^[a-z0-9_.]{6,25}$/}
                        >
                          {(control) => (
                            <View>
                              <TextInput
                                onSubmitEditing={this.handleSubmit}
                                editable={!this.state.isSubmitting}
                                style={styles.inputField}
                                placeholder="Username"
                                placeholderTextColor="#727075"
                                onBlur={control.markAsTouched}
                                onChangeText={(text) => {
                                  control.onChange(text);
                                  const lower = text.toLowerCase();
                                  this.setState({
                                    username: lower,
                                  });
                                }}
                                value={username}
                              />

                              {control.isTouched && control.isInvalid && (
                                <View>
                                  {control.errors.pattern ? (
                                    <Text style={styles.errorMsg}>
                                      <Text>
                                        enter a valid username! (No Cap.
                                        Letters)
                                      </Text>
                                    </Text>
                                  ) : (
                                    <Text style={styles.errorMsg}>
                                      Please enter username!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </Foect.Control>

                        {/* Password Input */}
                        <View>
                          <Foect.Control
                            name="password"
                            required
                            pattern={/^[a-zA-Z0-9\W]{6,20}$/}
                          >
                            {(control) => (
                              <View>
                                <TextInput
                                  onSubmitEditing={this.handleSubmit}
                                  editable={!this.state.isSubmitting}
                                  style={styles.inputField}
                                  placeholder="Password"
                                  placeholderTextColor="#727075"
                                  secureTextEntry={
                                    isPasswordShown ? false : true
                                  }
                                  onBlur={control.markAsTouched}
                                  onChangeText={(text) => {
                                    control.onChange(text);
                                    this.setState({ password: text });
                                  }}
                                  value={password}
                                />

                                {control.isTouched && control.isInvalid && (
                                  <View>
                                    {control.errors.pattern ? (
                                      <>
                                        <Text style={styles.errorMsg}>
                                          At least 6 characters!
                                        </Text>
                                      </>
                                    ) : (
                                      <Text style={styles.errorMsg}>
                                        Please enter your password!
                                      </Text>
                                    )}
                                  </View>
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
                              color={isPasswordShown ? '#83bb44' : '#545458'}
                            />
                          </TouchableOpacity>
                        </View>

                        {/* Country Input */}
                        <Foect.Control
                          name="country"
                          required
                          minLength={2}
                          maxLength={32}
                          pattern={/^[a-zA-Z ]+$/}
                        >
                          {(control) => (
                            <View>
                              <TextInput
                                onSubmitEditing={this.handleSubmit}
                                editable={!this.state.isSubmitting}
                                style={styles.inputField}
                                placeholder="Country of Origin"
                                placeholderTextColor="#727075"
                                onBlur={control.markAsTouched}
                                onChangeText={(text) => {
                                  control.onChange(text);
                                  this.setState({ country: text });
                                }}
                                value={country}
                              />

                              {control.isTouched && control.isInvalid && (
                                <View>
                                  {control.errors.pattern ? (
                                    <Text style={styles.errorMsg}>
                                      Enter a valid Country name!
                                    </Text>
                                  ) : (
                                    <Text style={styles.errorMsg}>
                                      Please enter your Country of origin!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </Foect.Control>

                        {/* MobileNo Input */}
                        <Foect.Control
                          name="phoneNumber"
                          required
                          minLength={10}
                          maxLength={32}
                          pattern={/^[-+]?\d*$/}
                        >
                          {(control) => (
                            <View>
                              <TextInput
                                onSubmitEditing={this.handleSubmit}
                                editable={!this.state.isSubmitting}
                                style={styles.inputField}
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                placeholderTextColor="#727075"
                                onBlur={control.markAsTouched}
                                onChangeText={(text) => {
                                  control.onChange(text);
                                  this.setState({ phoneNumber: text });
                                }}
                                value={phoneNumber}
                              />

                              {control.isTouched && control.isInvalid && (
                                <View>
                                  {control.errors.pattern ? (
                                    <Text style={styles.errorMsg}>
                                      Enter a valid Phone Number!
                                    </Text>
                                  ) : (
                                    <Text style={styles.errorMsg}>
                                      Please enter Phone Number!
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </Foect.Control>

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
                              text="Sign Up"
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
                          Already have an Account?{' '}
                          <Text
                            style={styles.loginText}
                            onPress={this.goToLogin}
                          >
                            Login Here.
                          </Text>{' '}
                        </Text>
                      </View>
                    )}
                  </Foect.Form>
                </View>
              </>
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
    marginTop: 5,
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
    marginTop: 20,
    marginBottom: 30,
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

  iconStyle: {
    textAlign: 'right',
    position: 'absolute',
    right: 18,
    top: 32,
  },

  errorMsg: {
    color: '#f56363',
  },
});

const mapStateFromProps = ({ signUp }) => ({ signUp });

export default connect(mapStateFromProps, { signUpAction })(
  withContainer(SignUp)
);
