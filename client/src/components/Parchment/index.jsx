import React from "react";
import './styles.css';
function Parchment() {
    return (
        <>
            <div id="parchment"></div>
            <svg style={{display:'none'}}>
                <filter id="wavy2">
                    <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"/>
                    <feDisplacementMap in="SourceGraphic" scale="20"/>
                </filter>
            </svg>

        </>
    );
}

export default Parchment;