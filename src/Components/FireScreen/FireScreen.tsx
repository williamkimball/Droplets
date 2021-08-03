/* eslint-disable react-native/no-inline-styles */
// React Native Global Scope Variables
// https://aboutreact.com/react-native-global-scope-variables/

import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
// import debounce from 'lodash.';
// import { TextInput } from 'react-native-gesture-handler';

let _ = require('lodash');
export default class FireScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      ageSlider: 30,
      annualInvestment: 40000,
      returnRate: 0.08,
      netWorth: 50000,
      annualExpenses: 30000,
      leanAnnualExpenses: 0,
      monthlyContribution: 0,
      annualSafeWithdrawalRate: 0.04,
      leanFiPercentage: 0.7,
      expectedAnnualGrowthRate: 0.07,
      fiNumber: 750000,
      yearsToFire: 0,
      yearlyForecast: []
    };


  }

  componentDidMount() {
    this.computeTimeToFire();
  }

  computeTimeToFire() {
    let years = 0;
    let previousNetWorth = parseInt(this.state.netWorth);
    let annualInvestment = parseInt(this.state.annualInvestment);
    this.setState({ yearlyForecast: [] });

    while (previousNetWorth < this.state.fiNumber) {
      previousNetWorth = (previousNetWorth * (1 + .07) + (annualInvestment))
      years++
      this.state.yearlyForecast.push([previousNetWorth, years])

    }
    this.setState({ yearsToFire: years });
    // const stopForecastingAmount = this.state.fiNumber * 1.6; // default to a bit more than Fat FI.

    // const annualExpenses = this.state.annualExpenses;
    // const monthlyAverageGrowth =
    //   1 + this.state.expectedAnnualGrowthRate / 12;
    // const startingNetWorth = parseInt(this.state.netWorth);
    // console.log(startingNetWorth)
    // let currentNetWorth = startingNetWorth;
    // let totalContributions = currentNetWorth; // can't yet delve into the past
    // let month = 0;
    // const monthlyForecasts = [
    //   {
    //     monthIndex: 0,
    //     netWorth: startingNetWorth.toString(),
    //     lastMonthNetWorth: 0,
    //     contribution: 0,
    //     interestGains: 0,
    //     timesAnnualExpenses: round(startingNetWorth / annualExpenses),
    //     totalContributions: totalContributions,
    //     totalReturns: 0,
    //   },
    // ];
    // while (currentNetWorth < stopForecastingAmount && month < 1000) {
    //   const contribution = this.state.monthlyContribution;
    //   const newNetWorth = round(
    //     ((currentNetWorth + contribution) * 100 * monthlyAverageGrowth) / 100
    //   );
    //   const interestGain = round(newNetWorth - currentNetWorth - contribution);
    //   const timesAnnualExpenses = round(newNetWorth / annualExpenses);
    //   month++;
    //   totalContributions += contribution;
    //   const totalReturns = round(newNetWorth - totalContributions);
    //   monthlyForecasts.push({
    //     monthIndex: month,
    //     networth: newNetWorth.toString(),
    //     lastMonthNetWorth: currentNetWorth,
    //     contribution: contribution,
    //     interestGains: interestGain,
    //     timesAnnualExpenses: timesAnnualExpenses,
    //     totalContributions: totalContributions,
    //     totalReturns: totalReturns,
    //   });
    //   currentNetWorth = newNetWorth;
    // }
    // this.setState({ monthlyForecasts: monthlyForecasts });
  }

  calculateFire() {
    this.setState({ fiNumber: 25 * this.state.annualExpenses }, () => {
      this.computeTimeToFire();
    });


  }

  onChangeNetWorthInput = (val: any) => {
    this.setState({ netWorth: val }, () => {
      this.calculateFire();
    });
  }
  onChangeAgeSlider = (text: any) => {

    this.setState({ ageSlider: text }, () => {
      this.calculateFire()
    })
  }


  onChangeAnnualInvestmentInput = (text: any) => {
    const numericRegex = /^([0-9]{1,1000})+$/

    if (numericRegex.test(text)) {
      this.setState({ annualInvestment: text }, () => {
        this.calculateFire()
      })
    }
  }
  onChangeAnnualExpensesInput = (text: any) => {
    const numericRegex = /^([0-9]{1,1000})+$/
    if (numericRegex.test(text)) {
      this.setState({ annualExpenses: text }, () => {
        this.calculateFire()
      })
    }
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
              Current Age: {this.state.ageSlider}
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={this.state.ageSlider}
              step={1}
              onValueChange={(val) => { this.onChangeAgeSlider(val) }}
            />
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
              placeholder=""
              onChangeText={_.debounce(this.onChangeNetWorthInput, 500)}
              defaultValue={this.state.netWorth.toString()}
              keyboardType='numeric'
              textAlign={'center'}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Annual Investment:
              {/* <NumberFormat
                value={this.state.annualInvestment}
                displayType={'text'}
                prefix="$"
                thousandSeparator=","
                renderText={(value) => <Text>{value}</Text>}
              /> */}
            </Text>
            <TextInput
              style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
              placeholder=""
              onChangeText={_.debounce(this.onChangeAnnualInvestmentInput, 500)}
              defaultValue={this.state.annualInvestment.toString()}
              keyboardType='numeric'
              textAlign={'center'}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Annual Expenses:
              {/* <NumberFormat
                value={this.state.annualExpenses}
                displayType={'text'}
                prefix="$"
                thousandSeparator=","
                renderText={(value) => <Text>{value}</Text>}
              /> */}
            </Text>
            <TextInput
              style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
              placeholder="50,000"
              onChangeText={_.debounce(this.onChangeAnnualExpensesInput, 500)}
              defaultValue={this.state.annualExpenses.toString()}
              keyboardType='numeric'
              textAlign={'center'}
            />
            {/* <Slider
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
            /> */}
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Fire Number: {this.state.fiNumber}
            </Text>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Years to FIRE: {this.state.yearsToFire}
            </Text>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Age at FIRE: {this.state.yearsToFire + this.state.ageSlider}
            </Text>

            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Go to Home Page"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


