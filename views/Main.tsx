import * as React from 'react'
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import styled from "styled-components/native";
import {useEffect} from "react";
import {getUserWallets} from '../redux/modules/wallets';
import { connect, useDispatch } from 'react-redux';

const ViewBody = styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;

function MainScreen({navigation, wallets}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWallets());
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
          <ViewBody>

          </ViewBody>
      </SafeAreaView>
    </React.Fragment>
  );
};

const mapStateToProps = function(state) {
  return {
    // wallets: state.wallets.wallets
  }
};

export default connect(mapStateToProps)(MainScreen);