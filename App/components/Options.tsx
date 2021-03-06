import { Alert, Linking, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { RowItem, RowDivider } from './RowItem'
import colors from '../constants/colors'

const openUrl = (url: string) => {
  Linking.openURL(url).catch(() => {
    Alert.alert('Something went wrong', 'Please stand by!')
  })
}

const Options = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowItem text="Themes" rightIcon={<Entypo name="chevron-right" size={20} />} />
        <RowDivider />
        <RowItem
          onPress={() => openUrl('https://react-native.org')}
          text="React Native"
          rightIcon={<Entypo name="export" size={20} />}
        />
        <RowDivider />
        <RowItem
          onPress={() => openUrl('https://dandiws.vercel.app/blog')}
          text="Blog"
          rightIcon={<Entypo name="export" size={20} />}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Options
