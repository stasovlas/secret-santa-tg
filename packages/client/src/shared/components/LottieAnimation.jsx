import Lottie from 'lottie-react';

const LottieAnimation = ({ data, size = 70, isAnimate, isLoop = false }) => {
    return (
        <Lottie animationData={data} style={{ width: size, height: size }} autoplay={isAnimate} loop={isLoop}/>
    );
};

export default LottieAnimation;