import Exponent from 'exponent';

import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
// import Exponent from 'exponent';


import { MonoText } from '../components/StyledText';

import Dimensions from 'Dimensions';

const {height, width} = Dimensions.get('window');

class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[{
            borderRadius: 10,
            borderColor: '#888888',
            borderStyle: 'solid',
            borderWidth: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 6,
            backgroundColor: '#fcfcfc',
            flex: 1,
            width: width / 2.4,
        }, this.props.style]}>
          <Text style={[{
              marginVertical: 16,
              fontSize: 19,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#555555',
              flex: 1,
          }, this.props.labelStyle]}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  async _getLightcontrolUrlAsync() {
    let result = await fetch('http://ccheever.com/x/lightcontrol.url?' + Math.random());
    let url = await result.text();
    return url.trim();
  }

  async _switchLightAsync(room, setting) {
    console.log(`_switchLightAsync room=${room} setting=${setting}`);
    let baseUrl = await this._getLightcontrolUrlAsync();
    console.log(`baseUrl=${baseUrl}`);
    let url = `${baseUrl}/switch/${room}/${setting}`;
    console.log("Making request to " + url);
    await fetch(url);
    console.log("Done making request.");
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{
            marginVertical: 22,
            marginHorizontal: 6,
            flex: 1,
            // backgroundColor: 'red',
            justifyContent: 'space-around',
        }}>

          <View style={styles.buttonSection}>
            <Text style={styles.sectionLabel}>All Lights</Text>
            <View style={styles.buttonGroup}>
              <Button label="Off" onPress={() => {
                  this._switchLightAsync('all', 0);
              }} />
              <Button label="On" onPress={() => {
                  this._switchLightAsync('all', 100);
              }} />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Text style={styles.sectionLabel}>Charlie's Room</Text>
            <View style={styles.buttonGroup}>
              <Button label="Off" onPress={() => {
                  this._switchLightAsync('charlie', 0);
              }} />
              <Button label="On" onPress={() => {
                  this._switchLightAsync('charlie', 100);
              }} />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Text style={styles.sectionLabel}>Francie's Room</Text>
            <View style={styles.buttonGroup}>
              <Button label="Off" onPress={() => {
                  this._switchLightAsync('francie', 0);
              }} />
              <Button label="On" onPress={() => {
                  this._switchLightAsync('francie', 100);
              }} />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Text style={styles.sectionLabel}>Living Area</Text>
            <View style={styles.buttonGroup}>
              <Button label="Off" onPress={() => {
                  this._switchLightAsync('common', 0);
              }} />
              <Button label="On" onPress={() => {
                  this._switchLightAsync('common', 100);
              }} />
            </View>
          </View>

        </View>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    Linking.openURL('https://docs.getexponent.com/versions/latest/guides/development-mode');
  }

  _handleHelpPress = () => {
    Linking.openURL('https://docs.getexponent.com/versions/latest/guides/up-and-running.html#can-t-see-your-changes');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  sectionLabel: {
    fontSize: 20,
    color: '#666666',
    fontWeight: '600',
    textAlign: 'center',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  buttonGroup: {
    marginTop: 5,
    marginBottom: 25,
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: 'purple',
    justifyContent: 'space-around',
  }
});

Exponent.registerRootComponent(HomeScreen);
