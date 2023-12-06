
import React from 'react'

import AppStack from './AppStack'

import { NavigationContainer } from '@react-navigation/native'

export default function Router() {
  return (
    <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
  )
}