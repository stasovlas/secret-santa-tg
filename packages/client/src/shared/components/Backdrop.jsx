const Backdrop = ({ children, isShow }) => {
    return (
        <div className={`fixed h-full w-full backdrop-blur-md backdrop-brightness-90 z-10 top-0 left-0 flex flex-col justify-start items-center ${!isShow ? 'hidden' : ''}`}>
            {children}
        </div>
    );
};

export default Backdrop;