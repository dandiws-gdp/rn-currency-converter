import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'

export interface ConversionInputProps extends TextInputProps {
  text: string
  onButtonPress?: () => void
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.slate3,
    marginHorizontal: 20,
    marginBottom: 8
  },
  containerDisabled: {
    backgroundColor: colors.slate5
  },
  button: {
    width: 60,
    paddingVertical: 12,
    backgroundColor: colors.slate7
  },
  buttonText: {
    color: colors.slate11,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    paddingHorizontal: 16,
    color: colors.white,
    fontSize: 16,
    flex: 1
  },
  inputDisabled: {
    color: colors.slate11
  }
})

const ConversionInput: React.VFC<ConversionInputProps> = ({ text, onButtonPress, ...props }) => {
  const containerStyles: Record<string, unknown>[] = [styles.container]
  const inputStyles: Record<string, unknown>[] = [styles.input]

  if (props.editable === false) {
    containerStyles.push(styles.containerDisabled)
    inputStyles.push(styles.inputDisabled)
  }

  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={inputStyles} keyboardType="numeric" {...props} />
    </View>
  )
}

export default ConversionInput
