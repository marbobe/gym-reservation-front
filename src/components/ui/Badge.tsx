export type BadgeStatus = 'active' | 'deleted';

export interface BadgeProps {
    children: React.ReactNode;
    status?:BadgeStatus;
}

const diccionarioEstados = {
    active: "bg-white text-neutral-900 border-neutral-200",
    deleted: "bg-neutral-950 text-white border-neutral-950"
}

export const Badge = ({children, status='active'}: BadgeProps) => {

    return(
        <span className={`inline-block px-4 py-2 text-[10px] uppercase tracking-[0.2em] 
            font-semibold border backdrop-blur-sm ${diccionarioEstados[status]}`}>{children}</span>
    );
}