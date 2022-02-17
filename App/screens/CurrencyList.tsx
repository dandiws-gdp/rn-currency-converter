import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RowDivider, RowItem } from '../components/RowItem'
import { ScreenProps } from '../config/Navigation'
import colors from '../constants/colors'
import _currencies from '../data/currencies.json'
import { Entypo } from '@expo/vector-icons'
import { useConversionContext } from '../utils/ConversionContext'

const currencies = Object.entries(_currencies)
const CurrencyList = ({ navigation, route }: ScreenProps<'CurrencyList'>) => {
  const insets = useSafeAreaInsets()
  const { setBaseCurrency, setTargetCurrency } = useConversionContext()

  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
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
        ListFooterComponent={() => <View style={{ paddingBottom: insets.bottom }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  checkIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: colors.green10
  }
})

export default CurrencyList
