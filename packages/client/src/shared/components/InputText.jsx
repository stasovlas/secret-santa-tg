const InputText = ({ label, value, placeholder, icon, onChange }) => {
    return (
        <label className={'block'}>
            <div className={'flex items-center font-bold'}>
                {icon && <span className={'mr-2 text-2xl'}>{icon}</span> }
                {label}
            </div>
            <input
                onBlur={() => window.scrollTo(0, 0)}
                type={'text'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={'mt-1 px-3 py-2 theme-bg-color border theme-secondary-border-color focus:outline-none focus:theme-border-color block w-full rounded-xl sm:text-sm'}
                placeholder={placeholder}
            />
        </label>
    );
};

export default InputText;