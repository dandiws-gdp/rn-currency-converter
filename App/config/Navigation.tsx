import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import Options from '../components/Options'
import CurrencyList from '../screens/CurrencyList'
import Home from '../screens/Home'
import colors from '../constants/colors'

export type MainStackParamList = {
  Home: undefined
  Options: undefined
  CurrencyList: {
    title: string
    currency: string
  }
}

export type ScreenProps<T extends keyof MainStackParamList> = StackScreenProps<
  MainStackParamList,
  T
>

const MainStack = createStackNavigator<MainStackParamList>()

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false
      }}
    />
    <MainStack.Screen name="Options" component={Options} />
    <MainStack.Screen
      name="CurrencyList"
      component={CurrencyList}
      options={({ route, navigation }) => ({
        title: route.params && `${route.params.title}: ${route.params.currency}`,
        presentation: 'modal',
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.pop()}>
            <Entypo name="cross" size={30} color={colors.slate8} />
          </TouchableOpacity>
        )
      })}
    />
  </MainStack.Navigator>
)

const Navigation = () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
)

export default Navigation