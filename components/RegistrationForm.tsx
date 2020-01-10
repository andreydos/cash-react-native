import * as React from 'react';
import {Platform} from "react-native";
import {useState} from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import {Button, Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {register} from '../redux/modules/auth';


export default function RegistrationForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function updateEmail(event: any): void {
    setEmail(event.nativeEvent.text);
  }

  function updatePassword(event: any): void {
    setPassword(event.nativeEvent.text);
  }

  function updateConfirmPassword(event: any): void {
    setConfirmPassword(event.nativeEvent.text);
  }

  function sendRegisterRequest(): void {
    console.log('sddf');
    if (!/^.+@.+\..+$/.test(email)) {
      alert('Invalid email')
    } else if (password.length < 6) {
      alert('Password must be at least 6 symbols')
    } else {
      dispatch(register({
        email, password
      }));
    }
  }

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
      <Input
        placeholder='confirm password'
        value={confirmPassword}
        onChange={updateConfirmPassword}
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
        onPress={sendRegisterRequest}
        containerStyle={{marginTop: 20}}
        iconRight
        titleStyle={{marginRight: 10, marginBottom: 3}}
        title="Register"
      />
    </React.Fragment>
  )
}