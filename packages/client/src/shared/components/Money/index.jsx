import data from './data.json';
import LottieAnimation from '../LottieAnimation';

const Money = (props) => {
    return (
        <LottieAnimation data={data} {...props} />
    );
};

export default Money;