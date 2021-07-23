/* eslint-disable react-native/no-inline-styles */
// React Native Global Scope Variables
// https://aboutreact.com/react-native-global-scope-variables/

import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import NumberFormat from 'react-number-format';
import { CalculateInput } from '../CalculateInput';
import { round } from '../../Utilities/number-utility';
import { Forecast } from '../models/forecast.model';
// import { TextInput } from 'react-native-gesture-handler';

export default class FireScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      ageSlider: 30,
      annualInvestment: 40000,
      returnRate: 0.08,
      netWorth: "50000",
      annualExpenses: 30000,
      leanAnnualExpenses: 0,
      monthlyContribution: 0,
      annualSafeWithdrawalRate: 0.04,
      leanFiPercentage: 0.7,
      expectedAnnualGrowthRate: 0.07,
      fiNumber: 0,
    };
  }
  getVal(val: any) {
    console.warn(val);
  }

  computeForecast() {
    const stopForecastingAmount = this.state.fiNumber * 1.6; // default to a bit more than Fat FI.

    const annualExpenses = this.state.annualExpenses;
    const monthlyAverageGrowth =
      1 + this.state.expectedAnnualGrowthRate / 12;
    const startingNetWorth = parseInt(this.state.netWorth);
    console.log(startingNetWorth)
    let currentNetWorth = startingNetWorth;
    let totalContributions = currentNetWorth; // can't yet delve into the past
    let month = 0;
    const monthlyForecasts = [
      {
        monthIndex: 0,
        netWorth: startingNetWorth.toString(),
        lastMonthNetWorth: 0,
        contribution: 0,
        interestGains: 0,
        timesAnnualExpenses: round(startingNetWorth / annualExpenses),
        totalContributions: totalContributions,
        totalReturns: 0,
      },
    ];
    while (currentNetWorth < stopForecastingAmount && month < 1000) {
      const contribution = this.state.monthlyContribution;
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
        netWorth: newNetWorth.toString(),
        lastMonthNetWorth: currentNetWorth,
        contribution: contribution,
        interestGains: interestGain,
        timesAnnualExpenses: timesAnnualExpenses,
        totalContributions: totalContributions,
        totalReturns: totalReturns,
      });
      currentNetWorth = newNetWorth;
    }
    this.setState({ monthlyForecasts: monthlyForecasts });
  }

  calculateFire() {
    // this.setState({annualInvestment: 40000});
    this.setState({ fiNumber: 25 * this.state.annualExpenses });
    // this.setState({ yearsToFire: 25 * this.state.annualInvestment });
    this.computeForecast();

  }

  onChangeText(this: any, text: any): void {
    let textToNum = parseInt(text);
    this.setState({ annualExpenses: textToNum })
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
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Current Investments:
            </Text>
            <TextInput
              style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
              placeholder="50,000"
              onChange={(val) => this.onChangeText(val)}
              defaultValue={this.state.netWorth}
              keyboardType='numeric'
              textAlign={'center'}
            />
            {/* <Slider
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
            /> */}
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
              value={this.state.annualInvestment}
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
              Annual Expenses:
              <NumberFormat
                value={this.state.annualExpenses}
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
              value={this.state.annualExpenses}
              onValueChange={(val) => {
                this.setState({ annualExpenses: val });
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
              Fire Number: {this.state.fiNumber}
            </Text>
            <NumberFormat
              value={this.state.fiNumber}
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


