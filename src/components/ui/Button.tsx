
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const diccionarioColores = {
    primary: "bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-950",
    secondary: "bg-white hover:border-neutral-950 text-neutral-900 border border-neutral-200",
    danger: "bg-rose-950 hover:bg-rose-900 text-white border border-rose-950"
};

export const Button = ({children, variant='primary', disabled = false, type = 'button', onClick}: ButtonProps) => {

    return(
        <button className={`px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none 
            ${diccionarioColores[variant]} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
            type={type}
            disabled={disabled} 
            onClick={onClick}
        >{children}</button>
    );
}


