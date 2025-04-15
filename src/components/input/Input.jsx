import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import { QRCodeContext } from '../../context/QRCodeContext'
import styles from './input.module.css'

export default function Input({ title, name, helperText, errorMessage, hasError, ...rest }) {

  const { handleDropdownValue, formDropdown, handleInvalid, handleInput, send } = useContext(QRCodeContext)



  return (
    <>
      <TextField id="outlined-basic" className={styles.inputContainer} label={title} error={hasError} value={formDropdown[name]} onChange={handleDropdownValue} name={name} variant="outlined" helperText={hasError ? errorMessage : helperText} {...rest} />

    </>
  )
}
