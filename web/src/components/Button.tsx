import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

function Button({ children, variant = 'primary', onClick, to, disabled = false } : { children: React.ReactNode, variant?: 'primary' | 'secondary', onClick?: MouseEventHandler, to?: string, disabled?: boolean }) {
    if (to) {
        return <Link to={to} className="button-link"><button className={'button-'+variant} onClick={onClick} disabled={disabled}>{disabled ? <div className="loader" /> : children}</button></Link>
    }
    
    return (
        <button className={'button-'+variant} onClick={onClick} disabled={disabled}>{disabled ? <div className="loader" /> : children}</button>
    );
}

export default Button;