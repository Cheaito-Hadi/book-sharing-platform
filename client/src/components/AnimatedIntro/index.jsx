import React from 'react';
import './styles.css'
import Lottie from "lottie-react";
import animation from '../../assets/animation_llozb4ga.json'

function AnimatedIntro () {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="intro-container">
            <h1 className="title">BookShare Haven</h1>
            <h3>Welcome to BookShare Haven! </h3>
            <p className="description-title">Expand Your Literary Horizons: Share the Magic of Books with Fellow Readers!.
            </p>
            <div className="lotti-animation">
                <Lottie options={lottieOptions}  animationData={animation} height={50} width={50}/>
            </div>
        </div>

    );
}
export default AnimatedIntro;
