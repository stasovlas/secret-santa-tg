import data from './data.json';
import LottieAnimation from '../LottieAnimation';

const Memo = (props) => {
    return (
        <LottieAnimation data={data} {...props} />
    );
};

export default Memo;