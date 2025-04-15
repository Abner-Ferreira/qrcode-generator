import React, { useContext } from 'react'
import styles from './forms.module.css'
import Dropdown from '../dropdown/Dropdown'
import Input from '../input/Input'
import { QRCodeContext } from '../../context/QRCodeContext'
import Button from '../button/Button'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from '@mui/material'

export default function Forms() {

  const { bu, countries, shop, sendUrl, formDropdown, loading, errors } = useContext(QRCodeContext)

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000", // Cor personalizada para a borda ao focar
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C50022", // Cor do contorno para erro
            },
            "&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C50022", // Cor do contorno ao focar em um campo inválido
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: "#000000 ", // Cor do rótulo ao focar
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            "&.MuiSelect-icon": {
              transition: "color 0.3s ease", // Animação opcional
            },
            "&.Mui-error": {
              color: "#C50022 !important", // Força a cor vermelha no estado de erro
            },
          },
        },
      },
    },
  });



  return (
    <>
      <ThemeProvider theme={theme}>
        <main className={styles.formContainer}>
          <h1 id={styles.title}>QR Code Generator BASF</h1>

          <form className={styles.forms} onSubmit={sendUrl} noValidate method={"POST"}>
            <div className={styles.inputBox}>
              <Input title="Url" name="url" helperText={"Url to redirect when scan the QR Code"} errorMessage={"Example: https://shop.basf.com.br/pt-BR/"} hasError={errors.url} required />
            </div>
            <div className={styles.inputBox}>
              <Input title="Campaign Title" name="campaignTitle" helperText={"QR Code campaign name"} errorMessage={"Example: Cetiol CC Promotion"} hasError={errors.campaignTitle} required />
            </div>
            <div className={styles.inputBox}>
              <Input title="Description" name="campaignDescription" required hasError={errors.campaignDescription} errorMessage={
                <>
                  {formDropdown["campaignDescription"].length}/20 characters
                  <br />
                  Example: Product promotion
                </>}

                helperText={
                  <>
                    {formDropdown["campaignDescription"].length}/20 characters
                    <br />
                    Description of the QR Code
                  </>} />
            </div>
            <div className={styles.inputBox}>
              <Input title="Product Name" name="prodName" helperText={"Leave blank if it's not a product"} />
            </div>
            <div className={styles.inputBox}>
              <Dropdown title="Country" name="country" content={countries} helperText={"Choose the country of QR Code"} errorMessage={"Example: Brazil (BR)"} hasError={errors.country} />
            </div>
            <div className={styles.inputBox}>
              <Dropdown title="Business Unit" name="businessUnit" content={bu} helperText={"Choose the business unit of QR Code"} errorMessage={"Example: EM"} hasError={errors.businessUnit} />
            </div>
            <div className={styles.inputBox}>
              <Dropdown title="Shop" name="shop" content={shop} helperText={"Choose the store of QR Code"} errorMessage={"Example: Personal Care BR"} hasError={errors.shop} />
            </div>
            <div className={styles.btnBox}>
              <Button type="submit" title={loading ? "Generating QR Code..." : "Send"} disabled={loading} />
            </div>

          </form>
        </main>
      </ThemeProvider>
    </>
  )
}
