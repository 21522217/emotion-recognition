import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { COLORS } from '../theme/theme'

const Lectures = () => {
  return (
    <View style={styles.container}>
        <Text>Coming soon... 🤩</Text>
    </View>
  )
}

export default Lectures

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center'
  },
})