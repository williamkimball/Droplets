/* eslint-disable react-native/no-inline-styles */
// React Native Global Scope Variables
// https://aboutreact.com/react-native-global-scope-variables/

import React, {Component} from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider';
import NumberFormat from 'react-number-format';

// const FireScreen = ({navigation}) => {
export default class FireScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageSlider: 30,
      annualInvestment: 40000,
      returnRate: 0.08,
      currentInvestments: 50000,
    };
  }
  getVal(val) {
    console.warn(val);
  }

  calculateFire() {
    // this.setState({annualInvestment: 40000});
    this.setState({fireNumber: 25 * this.state.annualInvestment});
    this.setState({yearsToFire: 25 * this.state.annualInvestment});
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
            {/* <Text
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
              onValueChange={val => {
                this.setState({ageSlider: val});
                this.calculateFire();
              }}
              step={1}
            /> */}
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}>
              Current Investments:
              <NumberFormat
                value={this.state.currentInvestments}
                displayType={'text'}
                prefix="$"
                thousandSeparator=","
                renderText={value => <Text>{value}</Text>}
              />
            </Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1500000}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={40000}
              onValueChange={val => {
                this.setState({currentInvestments: val});
                this.calculateFire();
              }}
              step={1000}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}>
              Annual Investment:
              <NumberFormat
                value={this.state.annualInvestment}
                displayType={'text'}
                prefix="$"
                thousandSeparator=","
                renderText={value => <Text>{value}</Text>}
              />
            </Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={100000}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={this.annualInvestment}
              onValueChange={val => {
                this.setState({annualInvestment: val});
                this.calculateFire();
              }}
              step={1000}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}>
              Fire Number: {this.state.fireNumber}
            </Text>
            <NumberFormat
              value={this.state.fireNumber}
              displayType={'text'}
              prefix="$"
              thousandSeparator=","
              renderText={value => <Text>{value}</Text>}
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
