/* eslint-disable react-native/no-inline-styles */
// React Native Global Scope Variables
// https://aboutreact.com/react-native-global-scope-variables/

import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import NumberFormat from 'react-number-format';
import { CalculateInput } from '../CalculateInput';
import round from '../../Utilities/number-utility';

// const FireScreen = ({navigation}) => {
export default class FireScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageSlider: 30,
      annualInvestment: 40000,
      returnRate: 0.08,
      netWorth: 50000,
      annualExpenses: 0,
      leanAnnualExpenses: 0,
      monthlyContribution: 0,
      annualSafeWithdrawalRate: 0.04,
      leanFiPercentage: 0.7,
      expectedAnnualGrowthRate: 0.07,
    };
  }
  getVal(val) {
    console.warn(val);
  }

  computeForecast(calculateInput: CalculateInput) {
    const stopForecastingAmount = calculateInput.fiNumber * 1.6; // default to a bit more than Fat FI.

    const annualExpenses = calculateInput.annualExpenses;
    const monthlyAverageGrowth =
      1 + calculateInput.expectedAnnualGrowthRate / 12;
    const startingNetWorth = calculateInput.netWorth;
    let currentNetWorth = startingNetWorth;
    let totalContributions = currentNetWorth; // can't yet delve into the past
    let month = 0;
    const monthlyForecasts = [
      {
        monthIndex: 0,
        netWorth: startingNetWorth,
        lastMonthNetWorth: 0,
        contribution: 0,
        interestGains: 0,
        timesAnnualExpenses: round(startingNetWorth / annualExpenses),
        totalContributions: totalContributions,
        totalReturns: 0,
      },
    ];
    while (currentNetWorth < stopForecastingAmount && month < 1000) {
      const contribution = calculateInput.monthlyContribution;
      const newNetWorth = round(
        ((currentNetWorth + contribution) * 100 * monthlyAverageGrowth) / 100
      );
      const interestGain = round(newNetWorth - currentNetWorth - contribution);
      const timesAnnualExpenses = round(newNetWorth / annualExpenses);
      month++;
      totalContributions += contribution;
      const totalReturns = round(newNetWorth - totalContributions);
      monthlyForecasts.push({
        monthIndex: month,
        netWorth: newNetWorth,
        lastMonthNetWorth: currentNetWorth,
        contribution: contribution,
        interestGains: interestGain,
        timesAnnualExpenses: timesAnnualExpenses,
        totalContributions: totalContributions,
        totalReturns: totalReturns,
      });
      currentNetWorth = newNetWorth;
    }
    this.monthlyForecasts = monthlyForecasts;
  }

  calculateFire() {
    // this.setState({annualInvestment: 40000});
    this.setState({ fireNumber: 25 * this.state.annualInvestment });
    this.setState({ yearsToFire: 25 * this.state.annualInvestment });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
              }}
            >
              Current Investments:
              <NumberFormat
                value={this.state.netWorth}
                displayType={'text'}
                prefix="$"
                thousandSeparator=","
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1500000}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={40000}
              onValueChange={(val) => {
                this.setState({ netWorth: val });
                this.calculateFire();
              }}
              step={1000}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Annual Investment:
              <NumberFormat
                value={this.state.annualInvestment}
                displayType={'text'}
                prefix="$"
                thousandSeparator=","
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={100000}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={this.annualInvestment}
              onValueChange={(val) => {
                this.setState({ annualInvestment: val });
                this.calculateFire();
              }}
              step={1000}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Fire Number: {this.state.fireNumber}
            </Text>
            <NumberFormat
              value={this.state.fireNumber}
              displayType={'text'}
              prefix="$"
              thousandSeparator=","
              renderText={(value) => <Text>{value}</Text>}
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
            }}
          >
            React Native Global Scope Variables
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
