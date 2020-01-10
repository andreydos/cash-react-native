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

const ViewSectionContainer = styled.View`
  
`;
const ViewBody = styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;
const ViewImageContainer = styled.View`
  width: 200px;
  margin: 5px auto;
`;
const TextSectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${Colors.black};
  text-align: center;
`;

export default function StartScreen() {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
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
              <TextSectionTitle>Loading...</TextSectionTitle>
            </ViewSectionContainer>
          </ViewBody>
      </SafeAreaView>
    </React.Fragment>
  );
};
