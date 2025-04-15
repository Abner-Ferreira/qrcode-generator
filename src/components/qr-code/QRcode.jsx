import React, { useContext } from 'react'
import { QRCodeContext } from '../../context/QRCodeContext'
import Button from '../button/Button'
import Loading from '../loading/Loading'
import styles from './qrcode.module.css'

export default function QRcode() {

  const { loading, send, qrCode, cleanForm } = useContext(QRCodeContext)

  return (
    <>
      <div className={styles.container}>
        {send && loading === false ?
          <div className={styles.newQRContainer}>
            <Button title={"New"} onClick={cleanForm} />
          </div>
          : <></>
        }
        <div className={styles.qrCodeContainer}>
          {send && loading ?
            <Loading />
            : send && loading === false ?
              <img src={qrCode} alt='QR Code' className={styles.imgQrCode} />
              :
              <div className={styles.qrCode}>
                <span>The QR Code will be generated here</span>
              </div>
          }
        </div>
        {send && loading === false ?
          <div className={styles.download}>
            <Button title={"Download QR Code"} url={qrCode} download={true} />
          </div>
          : <></>
        }

      </div>
    </>
  )
}
