import React, { createContext, useState } from 'react'
import QRCodeLink from 'qrcode'

export const QRCodeContext = createContext({})

export const QRCodeProvider = ({ children }) => {

  const [qrCode, setQrCode] = useState('')
  const [send, setSend] = useState(false)
  const [loading, setLoading] = useState(false)

  // Variavel com todos os paises
  var countries = [
    { name: "Argentina (AR)", value: "AR" }, { name: "Bolivia (BO)", value: "BO" }, { name: "Brazil (BR)", value: "BR" }, { name: "CC-Andes (CC)", value: "CC" }, { name: "CC-South (CCS)", value: "CCS" }, { name: "Chile (CL)", value: "CL" }, { name: "Colombia (CO)", value: "CO" }, { name: "Ecuador (EC)", value: "EC" }, { name: "Paraguay (PY)", value: "PY" }, { name: "Peru (PE)", value: "PE" }, { name: "Uruguay (UY)", value: "UY" }, { name: "Venezuela (VE)", value: "VE" }
  ]

  // Variavel com todas as BU's
  var bu = [
    { name: "AP", value: "AP" }, { name: "CI", value: "CI" }, { name: "CM", value: "CM" }, { name: "CP", value: "CP" }, { name: "EC", value: "EC" }, { name: "ED", value: "ED" }, { name: "EM", value: "EM" }, { name: "EN", value: "EN" }, { name: "EV", value: "EV" }, { name: "PM", value: "PM" }
  ]

  // Variavel com todos os shops
  var shop = [
    { name: "Agnique", value: "AGN" }, { name: "Agro", value: "AGR" }, { name: "Calcados", value: "CA" }, { name: "Chemetall", value: "CHM" }, { name: "Clean Care BR", value: "HC" }, { name: "Clean Care Co", value: "CCC" }, { name: "Clean Care Pe", value: "CCP" }, { name: "Farma", value: "FA" }, { name: "Formuladores", value: "EMUF" }, { name: "Formuladores Colombia", value: "EMUFC" }, { name: "LP Mineria", value: "MI" }, { name: "Materias Primas para Pinturas", value: "MPP" }, { name: "Nutricao Humana", value: "NH" }, { name: "Nutricion y Salud Ar", value: "ENCCS" }, { name: "Nutricion y Salud CC Andes", value: "ENCCA" }, { name: "Personal Care Ar", value: "CCA" }, { name: "Personal Care Br", value: "PC" }, { name: "Pet Care", value: "PET" }, { name: "Plasticos de Engenharia", value: "PE" }, { name: "Poliuretanos Arg", value: "PUAR" }, { name: "Quimicos Industriais", value: "QI" }, { name: "Quimicos Industriales", value: "QICCA" }, { name: "Repintura BR", value: "REBR" }, { name: "Repintura Pe", value: "REP" }, { name: "Revestimentos", value: "REV" }, { name: "Shop Paraguay", value: "SPY" }, { name: "Soluciones para Pinturas AR", value: "TA" }, { name: "Surfactantes", value: "ST" }, { name: "Ultramid Extrusao", value: "UE" }
  ]

  function generateQR(url) {
    setSend(true);
    setLoading(true);
    console.log("Iniciando o gerador QR Code")
    // Inicia o timeout para simular o tempo de carregamento
    setTimeout(() => {
      setLoading(false);
      console.log("Gerando QR Code")

      QRCodeLink.toDataURL(url, {
        errorCorrectionLevel: 'L',
        width: 600,
        margin: 5,

      }, function (err, url) {
        setQrCode(url);
        console.log("Finalizou gerador de QR Code")
      });

    }, 3000);

  }

  const initialFormDropdown = { country: "", businessUnit: "", shop: "", prodName: "", campaignTitle: "", campaignDescription: "", url: "" };
  const initialErrorForm = { country: false, businessUnit: false, shop: false, prodName: false, campaignTitle: false, campaignDescription: false, url: false };

  const [errors, setErrors] = useState(initialErrorForm);
  const [formDropdown, setFormDropdown] = useState(initialFormDropdown);
  function handleDropdownValue(e) {

    const { name, value } = e.target
    setFormDropdown((prev) => {
      if (name === "campaignDescription" && value.length > 20) {
        return { ...prev, [name]: value.slice(0, 20) }
      } else {
        return { ...prev, [name]: value }
      }
    })

    setErrors({
      ...errors,
      [name]: false,
    });

    replaceSpacesWithScore()
  };

  function replaceSpacesWithScore() {
    setFormDropdown((prev) => {
      const updatedForm = {};
      Object.keys(prev).forEach(key => {
        updatedForm[key] = prev[key].replace(/\s+/g, "-"); // Substitui espaços por -
      });
      return updatedForm;
    });
  }

  // Link de direcionamento?Nao muda & BU+Offline-Promotion+País+Shop+Nome do produto(se tiver)+TRA+Titulo & QR+None+Single-Image+Descricao(limite de 20 caracteres) & Nao muda & Nao muda & Descricao(limite de 20 caracteres)
  // https://formuladorescolombia.basf.com/dehyton-ke-as?at_medium=qr&at_campaign=EN_Offline-Promotion_BR_FA_none_TRA_texto&at_creation=QR_None_Single-Image_teste&at_channel=None&at_format=Single-Image&at_variant=teste 
  function sendUrl(e) {
    e.preventDefault()

    // Verifica os campos vazios
    const newErrors = {
      country: formDropdown.country.trim() === "",
      businessUnit: formDropdown.businessUnit.trim() === "",
      shop: formDropdown.shop.trim() === "",
      campaignTitle: formDropdown.campaignTitle.trim() === "",
      campaignDescription: formDropdown.campaignDescription.trim() === "",
      url: formDropdown.url.trim() === ""

    }
    setErrors(newErrors)

    // Verificar se existem erros
    const hasErrors = Object.values(newErrors).some((error) => error)

    if (!hasErrors) {

      let url = formDropdown.url
      let at_medium = "qr"
      let at_campaign = `${formDropdown.businessUnit}_Offline-Promotion_${formDropdown.country}_${formDropdown.shop}_${formDropdown.prodName ? formDropdown.prodName : "none"}_TRA_${formDropdown.campaignTitle}`
      let at_creation = `QR_None_Single-Image_${formDropdown.campaignDescription}`
      let at_channel = "None"
      let at_format = "Single-Image"
      let at_variant = `${formDropdown.campaignDescription}`

      let unifiedUrl = `${url}?at_medium=${at_medium}&at_campaign=${at_campaign}&at_creation=${at_creation}&at_channel=${at_channel}&at_format=${at_format}&at_variant=${at_variant}`

      generateQR(unifiedUrl)

    }
  }

  function cleanForm() {
    setFormDropdown(initialFormDropdown)
    setLoading(false)
    setSend(false)
  }


  return (
    <>
      <QRCodeContext.Provider value={{ handleDropdownValue, send, generateQR, qrCode, loading, countries, bu, shop, formDropdown, sendUrl, cleanForm, errors }}>
        {children}
      </QRCodeContext.Provider>
    </>
  )
}
