import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from '../variables/Colors';
import {setError} from '../redux/modules/auth';


class Notification extends React.Component<{dispatch: any, error: string}, { }> {
  private positionValue: Animated.Value;

  constructor(props) {
    super(props);
    this.positionValue = new Animated.Value(-80);
  }

  animateNotification(value: number) {
    Animated.timing(this.positionValue, {
      toValue: value,
      duration: 300,
      easing: Easing.ease
    }).start();
  };

  closeNotification() {
    const { dispatch } = this.props;
    this.animateNotification(-150);
    setTimeout(() => {
      dispatch(setError(''));
    }, 500)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.error) {
      this.animateNotification(0);
      setTimeout(() => {
        this.closeNotification();
      }, 3000)
    } else {
      this.closeNotification();
    }
  }


  render() {
    const { error } = this.props;

    return (
      <Animated.View
        style={[{ marginBottom: this.positionValue }, styles.wrapper]}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.title}>Error</Text>
          <Text style={styles.message}>{error}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification.bind(this)}
        >
          <Icon name="times" size={20} color="grey" />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    width: "100%",
    padding: 10,
    opacity: 0.6,
    shadowColor: "#686c6d",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10
  },
  notificationContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  title: {
    color: Colors.red,
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2
  },
  message: {
    marginBottom: 2,
    fontSize: 14
  }
});

const mapStateToProps = function(state) {
  return {
    error: state.auth.error
  }
};

export default connect(mapStateToProps)(Notification);