/* eslint-disable react-native/no-inline-styles */
// React Native Global Scope Variables
// https://aboutreact.com/react-native-global-scope-variables/

import React, {Component} from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider';
// import styles from './FireScreen.scss';
// import Homescreen from '../../../App';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// const FireScreen = ({navigation}) => {
export default class FireScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {ageSlider: 0};
  }
  getVal(val) {
    console.warn(val);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 16}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}>
              Age: {this.state.ageSlider}
            </Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={this.ageSlider}
              onValueChange={val => this.setState({ageSlider: val})}
              step={1}
            />
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Go to Home Page"
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'grey',
            }}>
            React Native Global Scope Variables
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
