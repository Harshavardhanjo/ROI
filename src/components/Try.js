import Konva from 'konva'
import React, { useState } from 'react'
import { Rect,Stage,Layer } from 'react-konva'
import { Image } from './TryElements'

const Try = () => {

    const [width,setWidth] = useState(720)

    const [height,setHeight] = useState(1290)

    const[x,setX] = useState(20)

    const[y,setY] = useState(20)
    return (
        <div id = 'container'>
            <Image src = 'https://cdn.pixabay.com/photo/2015/05/03/18/39/www-751513__340.png'/>
            <Stage container = 'container' fill = 'blue' width = {width} height = {height}>
                <Layer>
                    <Rect x = {10} y = {10} width = {10} height = {20} fill = 'green' stroke = 'black' strokeWidth = {4}/>
                </Layer>  
            </Stage>
        </div>
    )
}

export default Try
