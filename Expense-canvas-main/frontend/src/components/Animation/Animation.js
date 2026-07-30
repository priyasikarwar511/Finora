import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Animation(){
    const {width, height} = useWindowSize()

    console.log(width, height)
    const move=keyframes`
        0%{
            tranform:translate(0,0);
        }
        50%{
            transform:translate(${width/1.2}px,${height/1.5}px)
        }
        100%{
            tranform:translate(0,0);
        }
    `

    const Styled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px);
        animation: ${move} 15s alternate linear infinite;
    `;
    return(
        <Styled></Styled>
    )
}
export default Animation
