import React, { useContext, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { QRCodeContext } from '../../context/QRCodeContext';
import styles from './dropdown.module.css'
import { FormHelperText } from '@mui/material';

export default function Dropdown({ title, content, name, helperText, errorMessage, hasError }) {

  const { handleDropdownValue, formDropdown, handleInvalid, handleInput } = useContext(QRCodeContext)


  return (
    <FormControl required className={styles.dropdownContainer} error={hasError} >
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name={name}
        value={formDropdown[name] || ""}
        label={title}
        onChange={handleDropdownValue}
        onInput={handleInput}
      >
        {content.map(item => {
          return <MenuItem value={item.value} id={item.name} key={item.value}>{item.name}</MenuItem>
        })}

      </Select>
      <FormHelperText>{hasError ? errorMessage : helperText}</FormHelperText>
    </FormControl>
  )
}
