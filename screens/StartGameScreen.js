import React, { useEffect, useState } from 'react'
import {
  Button,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'

import BodyText from '../components/BodyText'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)


  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }
    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  }, [])

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
  }

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue)
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be between 1 and 99', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: resetInputHandler
        }
      ])
      return
    }
    setConfirmed(true)
    setSelectedNumber(choosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

  let confirmedOutput
  if (confirmed) {
    confirmedOutput = <Card style={styles.summaryContainer}>
      <BodyText>You selected</BodyText>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton
        onPress={() => props.onStartGame(selectedNumber)}
      >Start Game</MainButton>
    </Card>
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={30}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputConatiner}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={Colors.primary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Confirm'
                    onPress={confirmInputHandler}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,

  },
  inputConatiner: {
    width: '80%',
    maxWidth: '90%',
    minWidth: 300,
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})
