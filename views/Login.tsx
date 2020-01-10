import * as React from 'react'
import {
  SafeAreaView,
  View,
  StatusBar,
  Image
} from 'react-native';
import styled from "styled-components/native";
import ResponsiveImageView from 'react-native-responsive-image-view';
import Colors from '../variables/Colors'
import LoginForm from '../components/LoginForm'
import Registration from "./Registration";

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
const TextLoginLink = styled.Text`
  font-size: 18px;
  color: ${Colors.primary};
  text-align: center;
`;
const TouchableOpacity = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Login = ({navigation}) => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
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
              <LoginForm/>
              <TouchableOpacity
                onPress={()=>{navigation.navigate('Registration')}}
              >
                <TextLoginLink>Registration</TextLoginLink>
              </TouchableOpacity>
            </ViewSectionContainer>
          </ViewBody>
        </ScrollViewBase>
      </SafeAreaView>
    </React.Fragment>
  );
};

Login.navigationOptions = () => {
  return {
    title:'Login'
  }
};

export default Login;
