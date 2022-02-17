import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import ConversionInput from '../components/ConversionInput'
import Button from '../components/Button'
import { Fontisto } from '@expo/vector-icons'
import colors from '../constants/colors'
import { format } from 'date-fns'
import { ScreenProps } from '../config/Navigation'
import { useMemo, useState } from 'react'
import { useConversionContext } from '../utils/ConversionContext'

const screen = Dimensions.get('window')

const Home = ({ navigation }: ScreenProps<'Home'>) => {
  const { baseCurrency, targetCurrency, swapCurrencies, date, convert, conversionRate, loading } =
    useConversionContext()
  const [baseValue, setBaseValue] = useState<string>('1')

  const targetValue = useMemo(() => {
    const baseAmount = parseFloat(baseValue)
    const result = !isNaN(baseAmount) && convert(baseAmount)
    return result ? result.toFixed(2) : ''
  }, [baseValue, convert])

  const formattedDate = useMemo(() => {
    return date ? format(new Date(date), 'dd MMM yyyy') : ''
  }, [date])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.slate1} />
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

        {loading ? (
          <ActivityIndicator color={colors.white} size={28} />
        ) : (
          <>
            <ConversionInput
              onButtonPress={() =>
                navigation.push('CurrencyList', {
                  title: 'Base currency',
                  currency: baseCurrency,
                  name: 'base-currency'
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
                  currency: targetCurrency,
                  name: 'target-currency'
                })
              }}
              text={targetCurrency}
              value={targetValue}
              editable={false}
            />

            <Text style={styles.text}>
              {`1 ${baseCurrency} = ${conversionRate} ${targetCurrency} as of ${formattedDate}`}
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
          </>
        )}
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
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate1
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: -1 * screen.width * 0.3
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
    fontSize: 17,
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
  }
})
