/* eslint-disable react-native/no-inline-styles */
// React Native Global Scope Variables
// https://aboutreact.com/react-native-global-scope-variables/

import React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './FireScreen.scss';

const FireScreen = ({navigation}) => {
  global.MyVar = 'https://aboutreact.com';

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.view}>
        <View style={styles.viewCenter}>
          <Text style={styles.textTop}>This is the First Page of the App</Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 16,
              color: 'red',
            }}>
            Value of Global Variable is: {global.MyVar}
          </Text>
          <Button
            onPress={() => navigation.navigate('SecondPage')}
            title="Go to Second Page"
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
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FireScreen;
