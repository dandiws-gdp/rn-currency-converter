import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RowDivider, RowItem } from '../components/RowItem'
import { ScreenProps } from '../config/Navigation'
import colors from '../constants/colors'
import _currencies from '../data/currencies.json'
import { Entypo } from '@expo/vector-icons'
import { useConversionContext } from '../utils/ConversionContext'
import { useMemo, useState } from 'react'

const currencies = Object.entries(_currencies)
const SEARCH_HEIGHT = 56
const low = (str: string) => str.toLowerCase()

const CurrencyList = ({ navigation, route }: ScreenProps<'CurrencyList'>) => {
  const insets = useSafeAreaInsets()
  const { setBaseCurrency, setTargetCurrency } = useConversionContext()
  const [term, setTerm] = useState('')

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(([code, name]) => {
      return low(code).includes(low(term)) || low(name).includes(low(term))
    })
  }, [term])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={term}
        onChangeText={setTerm}
        returnKeyType="search"
      />
      <FlatList
        data={filteredCurrencies}
        renderItem={({ item }) => (
          <RowItem
            rightIcon={
              item[0] === route.params?.currency && (
                <View style={styles.checkIcon}>
                  <Entypo name="check" size={16} color={colors.white} />
                </View>
              )
            }
            onPress={() => {
              if (route.params?.name === 'base-currency') {
                setBaseCurrency(item[0])
              }

              if (route.params?.name === 'target-currency') {
                setTargetCurrency(item[0])
              }
              navigation.goBack()
            }}
          >
            <Text>
              <Text style={{ fontWeight: 'bold' }}>{item[0]}</Text> - {item[1]}
            </Text>
          </RowItem>
        )}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={RowDivider}
        contentContainerStyle={{
          paddingBottom: insets.bottom
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  checkIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: colors.green10
  },
  searchInput: {
    paddingHorizontal: 24,
    backgroundColor: colors.slateA2,
    fontSize: 15,
    height: SEARCH_HEIGHT
  }
})

export default CurrencyList
