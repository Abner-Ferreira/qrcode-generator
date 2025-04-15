import React from 'react'
import logo from '../../assets/logo.png'
import styles from './header.module.css'

export default function Header() {
  return (
    <>
      <header className={styles.container}>
        <img src={logo} alt="Logo da BASF" className={styles.logo}/>
      </header>
    </>
  )
}
