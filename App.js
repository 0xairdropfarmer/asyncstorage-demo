import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Alert,
  Vibration,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      until_death: 10000,
    };
  }
  onDoneCountdown = () => {
    Alert.alert('Rip ....');
  };
  componentDidMount() {
    SplashScreen.hide();
    this.getData();
  }
  onPressCountdown = () => {
    Alert.alert('Soory But Your need to die');
  };
  getData = async () => {
    try {
      const until_death = await AsyncStorage.getItem('until_death');
      if (until_death !== null) {
        this.setState(until_death);
      } else {
        let until_death = Math.floor(Math.random() * 1000000) + 1;
        this.setState(until_death);
      }
    } catch (e) {
      console.log(e);
    }
  };
  storeData = async until_death => {
    try {
      await AsyncStorage.setItem('until_death', until_death);
    } catch (e) {
      console.log(e);
    }
  };
  componentWillUnmount() {
    this.storeData(this.state.until_death);
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Image source={require('./img/grave.png')} />
        <Text style={styles.header}>Your will die in</Text>

        <CountDown
          until={this.state.until_death}
          onFinish={this.onDoneCountdown}
          onPress={this.onPressCountdown}
          size={40}
          digitStyle={{backgroundColor: 'black'}}
          digitTxtStyle={{color: 'red'}}
          onChange={until_death => this.setState({until_death: until_death})}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
