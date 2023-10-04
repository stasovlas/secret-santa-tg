import data from './data.json';
import LottieAnimation from '../LottieAnimation';

const Tg = (props) => {
    return (
        <LottieAnimation data={data} {...props} />
    );
};

export default Tg;