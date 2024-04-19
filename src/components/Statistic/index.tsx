import React from 'react'

import './index.scss'
import { toThousand } from '../../utilities'
interface Props{
  bgColor: string
  total: number
  currency?: string
  name: string
  imgSrc: string
}

const Box = ({bgColor, total, currency, name, imgSrc} : Props) => {
  return (
    <div className='statistic' style={{'--bg-color': bgColor} as React.CSSProperties}>
        <img src={imgSrc}/>
        <p>{name}</p>
        <div><span>{currency}</span>{currency? toThousand(total) : total}</div>
    </div>
  )
}

export default Box