import Card from './Card';
import Header1 from './Header1';
import Backdrop from './Backdrop';

const Modal = ({ isShow, header, children, onClose, actions }) => {
    return (
        <Backdrop isShow={isShow}>
            <div className={'z-20 max-w-md p-4 w-full max-h-full'}>
                <Card className={'shadow-2xl theme-bg-color flex flex-col space-y-2 max-h-full'}>
                    <>
                        <div className={'flex justify-between mb-2'}>
                            <Header1>{header}</Header1>
                            <div className={'flex space-x-4'}>
                                {actions}
                                {onClose && <span className={'text-2xl font-bold cursor-pointer'} onClick={onClose}>{'✕'}</span>}
                            </div>
                        </div>
                        <div className={'overflow-y-scroll'}>
                            {children}
                        </div>
                    </>
                </Card>
            </div>
        </Backdrop>
    );
};

export default Modal;