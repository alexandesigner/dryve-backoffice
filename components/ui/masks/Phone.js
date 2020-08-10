import React from 'react'
import MaskedInput from 'react-text-mask'

function PhoneMaskedField(props) {
  const { inputRef, ...other } = props

  const phoneMask = (userInput) => {
    const numbers = userInput.match(/\d/g)
    let numberLength = 0

    if (numbers) {
      numberLength = numbers.join('').length
    }

    if (numberLength > 10) {
      return [
        '(',
        /[1-9]/,
        /[1-9]/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]
    } else {
      return [
        '(',
        /[1-9]/,
        /[1-9]/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]
    }
  }

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={phoneMask}
      placeholderChar={'\u2000'}
    />
  )
}

export default PhoneMaskedField
