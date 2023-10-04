const Tab = ({ label, isActive, isDisabled, onClick, badge }) => {
    const baseClass = 'h-8 px-4 font-semibold rounded-xl relative';
    const activeClass = isDisabled ? '' : 'theme-button-color theme-button-text-color';
    const notActiveClass = isDisabled ? '' : 'border theme-border-color theme-bg-color';
    const disabledClass = 'border theme-secondary-border-color theme-bg-color theme-secondary-text-color cursor-default';

    return (
        <button
            className={`${baseClass} ${isActive ? activeClass : notActiveClass} ${isDisabled ? disabledClass : ''}`}
            onClick={isDisabled ? null : onClick}
        >
            {label}
            {badge && (
                <div
                    className={'absolute inline-flex items-center justify-center px-1 h-6 text-xs font-medium text-white bg-red-500 border border-white rounded-full -top-3 -right-2'}>
                {badge.caption}
                </div>
            )}
        </button>
    );
};

const Tabs = ({ items, selectedItemId, onChange }) => {
    return (
        <div className={'flex space-x-2'}>
            { items.map((props) => (
                <Tab
                    isActive={props.id === selectedItemId}
                    onClick={() => onChange(props.id)}
                    key={props.id}
                    { ...props }
                />
            ))}
        </div>
    );
};

export default Tabs;