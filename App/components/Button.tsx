import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import colors from '../constants/colors'

export interface ButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.slate11,
    fontSize: 16
  },
  icon: {
    marginRight: 8
  }
})

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button
