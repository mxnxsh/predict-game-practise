import React, { useEffect, useRef, useState } from 'react'
import { Text, Alert, StyleSheet, View, ScrollView, FlatList, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import BodyText from '../components/BodyText'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'
import TitleText from '../components/TitleText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  // ternary operator
  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum
}

const renderListItem = (listLength, itemData) => (
  // <View key={value} style={styles.listItem}>
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
)


const GameScreen = props => {
  const { userChoice, onGameOver, onMistake } = props

  const initialGuess = generateRandomBetween(1, 100, userChoice)

  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  // const [rounds, setRounds] = useState(0)
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()])
  const [mistake, setMistake] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)


  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length)
      onMistake(mistake)
    }
  }, [currentGuess, userChoice, onGameOver, onMistake])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert(`Don't lie!`, 'You know that this is wrong...', [
        {
          text: 'Sorry',
          style: 'cancel'
        }
      ])
      setMistake(error => error + 1)
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
    // setRounds(curRound => curRound + 1)
    setPastGuess(currPastGuess => [nextNumber.toString(), ...currPastGuess])
  }
  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
          <Ionicons
            name='md-remove'
            size={24}
            color='white'
          />
        </MainButton>

        <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
          <Ionicons
            name='md-add'
            size={24}
            color='white'
          />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list} >
          {pastGuess.map((guess, index) => renderListItem(guess, pastGuess.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuess}
          renderItem={renderListItem.bind(this, pastGuess.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%'
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  }
})
export default GameScreen