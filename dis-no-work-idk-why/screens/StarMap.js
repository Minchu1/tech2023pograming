import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ImageBackgrounda,
  ImageBackground,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class StarMapScreen extends Component {
  constructor() {
    super();
    this.state = {
      longitude: '',
      latitude: '',
    };
  }
  handleWebViewLoad = () => {
    const { longitude, latitude } = this.state;

    // Check if latitude and longitude are strings
    if (typeof longitude === 'string' || typeof latitude === 'string') {
      alert('Longitude and latitude should be numbers.');
    } else {
      const path = `https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false`;

      this.webviewRef && this.webviewRef.reload();
      this.webviewRef && this.webviewRef.stopLoading();
      this.webviewRef &&
        this.webviewRef.injectJavaScript(`window.location.href = '${path}'`);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a0023' }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={{ flex: 0.3, marginTop: 20, alignItems: 'center' }}>
          <Text style={styles.titleText}>Star Map</Text>
          <Text style={styles.lesserText}>No need for degrees!</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your longitude"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                longitude: text,
              });
            }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your latitude"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                latitude: text,
              });
            }}
            keyboardType="numeric"
          />
          <Button
            style={styles.buttOn}
            title="Load Star Map"
            onPress={this.handleWebViewLoad}
          />
        </View>
        <WebView
          ref={(ref) => (this.webviewRef = ref)}
          scalesPageToFit={true}
          style={{ flex: 1, marginTop: 20, marginBottom: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttOn: {
    marginTop: 20,
  },
  lesserText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
  },

  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    color: 'white',
    width: 200,
  },
});
