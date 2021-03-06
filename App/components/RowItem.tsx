import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: colors.text,
    fontSize: 16
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    marginHorizontal: 24
  }
})

export interface RowItemProps {
  text?: string
  rightIcon?: React.ReactNode
  onPress?: () => void
}

export const RowItem: React.FC<RowItemProps> = ({ rightIcon, text, onPress, children }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {children || <Text style={styles.text}>{text}</Text>}
      {rightIcon}
    </TouchableOpacity>
  )
}

export const RowDivider: React.VFC = () => {
  return <View style={styles.divider} />
}
