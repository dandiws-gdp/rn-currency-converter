import { StatusBar, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RowDivider, RowItem } from '../components/RowItem'
import { ScreenProps } from '../config/Navigation'
import colors from '../constants/colors'
import currencies from '../data/currencies.json'
import { Entypo } from '@expo/vector-icons'

const CurrencyList = ({ navigation, route }: ScreenProps<'CurrencyList'>) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        renderItem={({ item }) => (
          <RowItem
            text={item}
            rightIcon={
              item === route.params?.currency && (
                <View style={styles.checkIcon}>
                  <Entypo name="check" size={20} color={colors.green10} />
                </View>
              )
            }
            onPress={() => navigation.goBack()}
          />
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={RowDivider}
        ListFooterComponent={() => <View style={{ paddingBottom: insets.bottom }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  checkIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: colors.slateA5
  }
})

export default CurrencyList
