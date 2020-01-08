import * as React from 'react';
import styled from "styled-components/native";
import { TouchableHighlight, Text } from "react-native";
import Colors from '../variables/Colors'


interface RoundedButtonProps {
  text?: string
  children?: React.ReactNode
}

const ViewRounded = styled.View`
 flex-direction: row;
 align-self: flex-start;
 align-items: center;
 padding: 5px 10px;
 border-radius: 10px;
 border: 1px solid grey;
`;
const TextInButton = styled.Text`
 color: ${Colors.dark};
 font-size: 16px;
 font-weight: 500;
 padding-right: ${props => { return props.hasChildren ? '10px' : '0'}};
`;

export default function RoundedButton({
                                children,
                                text = '',
                              }: RoundedButtonProps) {
  return (
    <TouchableHighlight>
      <ViewRounded>
        <TextInButton hasChildren={!!children}>{text}</TextInButton>{children}
      </ViewRounded>
    </TouchableHighlight>
  )
}