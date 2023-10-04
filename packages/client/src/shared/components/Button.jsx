const Button = ({ children, onClick, mode, isDisabled, isSmall, className }) => {
    const smallClass = 'h-8 px-4';
    const baseClass = 'h-10 px-6 font-semibold rounded-xl';
    const fillClass = isDisabled ? '' : 'theme-button-color theme-button-text-color';
    const outlineClass = isDisabled ? '' : 'border theme-border-color';
    const disabledClass = 'border theme-secondary-border-color theme-secondary-text-color cursor-default';

    return (
        <button className={`${baseClass} ${isSmall ? smallClass : ''} ${mode === 'outline' ? outlineClass : fillClass} ${isDisabled ? disabledClass : ''} ${className || ''}`} type={'submit'} onClick={isDisabled ? () => null : onClick}>
            {children}
        </button>
    );
};

export default Button;