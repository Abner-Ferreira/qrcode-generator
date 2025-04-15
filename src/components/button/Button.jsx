import React, { useContext } from 'react'
import styles from './button.module.css'
import { QRCodeContext } from '../../context/QRCodeContext'

export default function Button({ title, download, url, ...rest }) {

  const { formDropdown } = useContext(QRCodeContext)

  return (
    <>
      {download ?
        <button {...rest} className={styles.btn}>
          <a className={styles.btnDownload} href={url} download={`${formDropdown.campaignTitle}-QRcode.png`}>{title}</a>
        </button>
        :
        <button {...rest} className={styles.btn}>{title}</button>
      }
    </>
  )
}
