import data from './data.json';
import LottieAnimation from '../LottieAnimation';

const Santa = (props) => {
    return (
        <LottieAnimation data={data} {...props} />
    );
};

export default Santa;