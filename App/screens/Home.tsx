import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import ConversionInput from '../components/ConversionInput'
import Button from '../components/Button'
import { Fontisto, Entypo } from '@expo/vector-icons'
import colors from '../constants/colors'
import { format } from 'date-fns'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenProps } from '../config/Navigation'
import { useCallback, useMemo, useState } from 'react'

const screen = Dimensions.get('window')

const Home = ({ navigation }: ScreenProps<'Home'>) => {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [targetCurrency, setTargetCurrency] = useState('IDR')
  const [conversionRate, setConversionRate] = useState(14000)
  const [baseValue, setBaseValue] = useState<string>('1')

  const targetValue = useMemo(
    () => (baseValue.trim() !== '' ? (parseFloat(baseValue) * conversionRate).toFixed(2) : ''),
    [baseValue, conversionRate]
  )
  const todayDate = format(new Date(), 'dd MMM yyyy')

  const swapCurrencies = useCallback(() => {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
    setConversionRate((c) => 1 / c)
  }, [baseCurrency, targetCurrency])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.darkblue} />

      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.push('Options')}>
          <Entypo name="cog" size={30} color={colors.white} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoBackground}
            source={require('../assets/imgs/background.png')}
            resizeMode="contain"
          />
          <Image
            style={styles.logo}
            source={require('../assets/imgs/logo.png')}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.textHeader}>Curreny converter</Text>

        <ConversionInput
          onButtonPress={() =>
            navigation.push('CurrencyList', {
              title: 'Base currency',
              currency: baseCurrency
            })
          }
          text={baseCurrency}
          onChangeText={(text) => setBaseValue(text.trim())}
          value={baseValue}
        />
        <ConversionInput
          onButtonPress={() => {
            navigation.push('CurrencyList', {
              title: 'Target currency',
              currency: targetCurrency
            })
          }}
          text={targetCurrency}
          value={targetValue}
          editable={false}
        />

        <Text style={styles.text}>
          {`1 ${baseCurrency} = ${conversionRate} ${targetCurrency} as of ${todayDate}`}
        </Text>

        <Button
          icon={
            <Fontisto
              style={styles.reverseIcon}
              name="arrow-swap"
              size={15}
              color={colors.slate11}
            />
          }
          onPress={swapCurrencies}
        >
          Reverse currencies
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.slate1,
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoBackground: {
    width: screen.width * 0.3,
    height: screen.width * 0.3
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.15,
    height: screen.width * 0.15
  },
  textHeader: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
    marginVertical: 30
  },
  text: {
    textAlign: 'center',
    color: colors.slate10,
    marginVertical: 16
  },
  reverseIcon: {
    transform: [
      {
        rotate: '90deg'
      }
    ]
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8
  }
})
