import React from 'react'

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core'

function Field(props) {
  const {
    onChange,
    onBlur,
    onKeyDown,
    id,
    name,
    error,
    className,
    type,
    helperText,
    label,
    placeholder,
    maskedField,
    endAdornment,
    startAdornment,
    value,
    fullWidth
  } = props
  const labelEl = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  const handleFocus = () => setLabelWidth(labelEl.current.clientWidth)

  const handleBlur = (e) => {
    if (e.currentTarget.value === '' && !startAdornment) {
      setLabelWidth(0)
    }
  }

  React.useEffect(() => {
    if (startAdornment) {
      setLabelWidth(labelEl.current.clientWidth)
    }

    if (value !== '') {
      setLabelWidth(labelEl.current.clientWidth)
    }

    return () => {}
  }, [])

  return (
    <FormControl variant="outlined" className={className} error={error}>
      <InputLabel ref={labelEl}>{label}</InputLabel>
      <OutlinedInput
        type={type}
        placeholder={placeholder}
        notched
        labelWidth={labelWidth}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
        onFocus={handleFocus}
        onBlur={(e) => {
          handleBlur(e)
          onBlur(e)
        }}
        onKeyDown={(e) => {
          onKeyDown(e)
        }}
        value={value}
        inputComponent={maskedField}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        fullWidth={fullWidth}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

Field.defaultProps = {
  endAdornment: null,
  startAdornment: null,
  onChange: () => false,
  onFocus: () => false,
  onBlur: () => false,
  onKeyDown: () => false
}

export default Field
