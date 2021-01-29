import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native'
import BodyText from '../components/BodyText'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  // ternary operator
  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum
  // if (rndNum === exclude) {
  //   return generateRandomBetween(min, max, exclude)
  // } else {
  //   return rndNum
  // }
}

const GameScreen = props => {
  const { userChoice, onGameOver } = props

  const initialGuess = generateRandomBetween(1, 100, userChoice)

  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [rounds, setRounds] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)


  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds)
    }
  }, [currentGuess, userChoice])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert(`Don't lie!`, 'You know that this is wrong...', [
        {
          text: 'Sorry',
          style: 'cancel'
        }
      ])
      return
    }
    // ternary operator
    direction === 'lower' ? currentHigh.current = currentGuess : currentLow.current = currentGuess + 1

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    )
    setCurrentGuess(nextNumber)
    setRounds(curRound => curRound + 1)
  }
  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='lower' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title='greater' onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})
export default GameScreen