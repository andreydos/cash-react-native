import * as React from 'react'
import {useState} from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Image,
  Platform
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import {Button, Input} from 'react-native-elements';
import ResponsiveImageView from 'react-native-responsive-image-view';
import {useDispatch} from 'react-redux';
import {login} from '../redux/modules/auth';
import Colors from '../variables/Colors'

const ViewAbsolute = styled.View`
 position: absolute;
`;

const ViewAbsoluteRight = styled(ViewAbsolute)`
 right: 0;
 top: 15px;
 z-index: 1;
`;

const ScrollViewBase = styled.ScrollView`
 background-color: ${Colors.lighter};
`;

const ViewSectionContainer = styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;
const ViewBody = styled.View`
  background-color: ${Colors.white};
`;
const ViewImageContainer = styled.View`
  width: 250px;
  margin: 5px auto;
`;
const TextSectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${Colors.black};
`;

const LoggedOut = () => {
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

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        {global.HermesInternal == null ? null : (
          <ViewAbsoluteRight>
            <Text>Engine: Hermes</Text>
          </ViewAbsoluteRight>
        )}
        <ScrollViewBase
          keyboardShouldPersistTaps='handled'
          contentInsetAdjustmentBehavior="automatic">
          <ViewBody>
            <ViewImageContainer>
              <ResponsiveImageView source={require("../images/cash-image.png")}>
                {({getViewProps, getImageProps}) => (
                  <View {...getViewProps()}>
                    <Image {...getImageProps()} />
                  </View>
                )}
              </ResponsiveImageView>
            </ViewImageContainer>

            <ViewSectionContainer>
              <TextSectionTitle>Keep your budget under control</TextSectionTitle>
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
              />
            </ViewSectionContainer>
          </ViewBody>
        </ScrollViewBase>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default LoggedOut;
