
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,Image } from 'react-native';
import {Header}  from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TextInput} from 'react-native'
import  * as Speech from 'expo-speech';
import db from './localdb'
var mean;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      lexicalCategory: '',
      meaning: '',
    };
  }
    render(){
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
    <Header
     backgroundColor={'#542E71'}
         leftComponent={{ icon: 'menu',size:30, color: '#FB3640' }}
          centerComponent={{text:'DICTIONARY',style:{color:'#FB3640',fontSize:30}}}
         rightComponent={{ icon: 'home', size:30,color: '#FB3640'}}
         />
         <Text style={styles.enter}>ENTER A WORD </Text>
         <TextInput
          style={styles.inputBox}
          autoCorrect="true"
          onChangeText={(text) => {
            this.setState({ word: text });
          }}
          value={this.state.word}
          />
           <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            mean = db[this.state.word];
            if (mean === undefined || mean === null) {
              alert(
                'Please enter a word, or check your spelling and try again!'
              );
            }
            this.setState({
              word: db[this.state.word].word,
              lexicalCategory:db[this.state.word].lexicalCategory,
              meaning: db[this.state.word].definition,
            });
          }}>
          <Text style={styles.buttonText}>GO</Text>
          <Text style={styles.displayText}>WORD:</Text>
        <Text style={styles.displayText1}>{this.state.word}</Text>
        <Text style={[styles.displayText,{marginTop:2}]}>LEXICAL CATEGORY:</Text>
        <Text style={styles.displayText1}>{this.state.lexicalCategory}</Text>
        <Text style={[styles.displayText,{marginTop:2}]}>DEFINITION:</Text>
        <Text style={styles.displayText}>{this.state.meaning}</Text>
        </TouchableOpacity>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => Speech.speak(this.state.word)}>
            <Text style={styles.displayText2}>PRONUNCIATION</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              this.setState({
                word: '',
                lexicalCategory: '',
                meaning: '',
              });
            }}>
            <Text style={styles.displayText2}>CLEAR</Text>
          </TouchableOpacity>
        </View>
    </View>
    </SafeAreaProvider>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  enter:{
    flex: 0.5,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue',
  },
  inputBox:{
    marginTop: -50,
    width: '80%',
    textAlign: 'center',
    height: 40,
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius:50,
    backgroundColor:'#FDCA40',
    color:'#542E71',
    fontSize:30,
  },
  goButton:{
    marginTop: 50,
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius:50,
    width:150,
    height:50,
    backgroundColor:'#2D2926FF',
    borderColor:'#118DF0'
   },
   buttonText: {
    marginTop: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color:'#E94B3CFF',
    fontSize:30
  },
  displayText: {
    flex: 0.1,
    textAlign: 'center',
    fontSize: 17,
    marginTop:30,
    fontWeight: 'bold',
    color: 'red',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: 150,
    borderWidth: 4,
    marginTop: 350,
    borderColor: '#FDCA40',
    backgroundColor: '#542e71',
    alignSelf: 'center',
    height: 30,
    marginRight: 10,
  },
  displayText2: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FDCA40',
    fontWeight: 'bold',
  },
});
