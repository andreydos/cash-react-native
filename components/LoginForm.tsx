import * as React from 'react';
import {Platform} from "react-native";
import {useEffect, useState} from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import {Button, Input} from 'react-native-elements';
import {useDispatch, connect} from 'react-redux';
import {login} from '../redux/modules/auth';


function LoginForm({user, loginPending, navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function updateEmail(event: any): void {
    setEmail(event.nativeEvent.text);
  }

  function updatePassword(event: any): void {
    setPassword(event.nativeEvent.text);
  }

  function sendLoginRequest(): void {
    if (!/^.+@.+\..+$/.test(email)) {
      alert('Invalid email')
    } else if (password.length < 6) {
      alert('Password must be at least 6 symbols')
    } else {
      dispatch(login({
        email, password
      }));
    }
  }

  useEffect(() => {
    if (user !== null) {
      navigation.navigate('Main')
    }
  }, [user]);

  return (
    <React.Fragment>
      <Input
        placeholder='email'
        value={email}
        autoCompleteType='off'
        maxLength={300}
        clearButtonMode='always'
        keyboardType='email-address'
        autoCapitalize='none'
        onChange={updateEmail}
        leftIcon={
          <Icon
            name={Platform.OS === "ios" ? "ios-mail" : "md-mail"}
            size={25}
            color="grey"
          />
        }
        containerStyle={{marginTop: 20}}
        leftIconContainerStyle={{marginRight: 10}}
      />
      <Input
        placeholder='password'
        value={password}
        onChange={updatePassword}
        maxLength={50}
        secureTextEntry
        clearButtonMode='always'
        returnKeyType='go'
        autoCorrect={false}
        leftIcon={
          <Icon
            name={Platform.OS === "ios" ? "ios-key" : "md-key"}
            size={25}
            color="grey"
          />
        }
        containerStyle={{marginTop: 20}}
        leftIconContainerStyle={{marginRight: 10}}
      />
      <Button
        icon={
          <Icon
            name={Platform.OS === "ios" ? "ios-log-in" : "md-log-in"}
            size={25}
            color="white"
          />
        }
        onPress={sendLoginRequest}
        containerStyle={{marginTop: 20}}
        iconRight
        titleStyle={{marginRight: 10, marginBottom: 3}}
        title="Login"
        loading={loginPending}
      />
    </React.Fragment>
  )
}

const mapStateToProps = function(state) {
  return {
    loginPending: state.auth.login_pending,
    user: state.auth.user
  }
};

export default connect(mapStateToProps)(LoginForm);