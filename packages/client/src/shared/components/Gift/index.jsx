import data from './data.json';
import LottieAnimation from '../LottieAnimation';

const Gift = (props) => {
    return (
        <LottieAnimation data={data} {...props} />
    );
};

export default Gift;