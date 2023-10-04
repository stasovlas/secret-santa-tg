import data from './data.json';
import LottieAnimation from '../LottieAnimation';

const Party = (props) => {
    return (
        <LottieAnimation data={data} {...props} />
    );
};

export default Party;