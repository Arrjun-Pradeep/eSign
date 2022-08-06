import React from 'react'
import MINERS from '../header/MINERS.png'
import headCSS from './head.module.css';
export default function head() {
  return (
    <div className={headCSS.mainDiv}>
        <div className={headCSS.imgDiv}>
            <img className={headCSS.img} src={MINERS} alt="miners" />
        </div>
    </div>
  )
}
