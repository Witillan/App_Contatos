import { Platform, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export function useDefaultStyleSheet() {

  return {
    defaultStyle: StyleSheet.create({
      input: {
        backgroundColor: 'transparent',
        color: 'black',
        height: 35,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: 'white',
        borderWidth: 0.7,
        borderRadius: 5
      }
    })
  }
}

export const InputDisabled = styled.TextInput`
  color: #6c757d;
`
