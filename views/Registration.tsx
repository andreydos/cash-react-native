import * as React from 'react'
import {
  StatusBar,
} from 'react-native';
import styled from "styled-components/native";
import Colors from '../variables/Colors';
import RegistrationForm from '../components/RegistrationForm'

const SafeAreaView = styled.SafeAreaView`
 display: flex;
 flex: 1;
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
const TextSectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${Colors.black};
`;
const TextSectionTitleCenter = styled(TextSectionTitle)`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
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

const Registration = ({navigation}) => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <ScrollViewBase
          keyboardShouldPersistTaps='handled'
          contentInsetAdjustmentBehavior="automatic">
          <ViewBody>
            <ViewSectionContainer>
              <TextSectionTitle>Keep your budget under control</TextSectionTitle>
              <TextSectionTitleCenter>Registration</TextSectionTitleCenter>
              <RegistrationForm />
              <TouchableOpacity
                onPress={()=>{navigation.navigate('Login')}}
              >
                <TextLoginLink>I already have account</TextLoginLink>
              </TouchableOpacity>
            </ViewSectionContainer>
          </ViewBody>
        </ScrollViewBase>
      </SafeAreaView>
    </React.Fragment>
  );
};

Registration.navigationOptions = () => {
  return {
    title:'Registration'
  }
};

export default Registration;
