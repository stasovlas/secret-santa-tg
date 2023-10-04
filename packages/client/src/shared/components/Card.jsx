const Card = ({ className, children }) => {
    return (
        <div className={`shadow-sm p-4 theme-secondary-bg-color rounded-xl ${className || ''}`}>
            {children}
        </div>
    );
};

export default Card;