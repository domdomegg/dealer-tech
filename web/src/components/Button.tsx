import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

function Button({ children, variant = 'primary', onClick, to } : { children: React.ReactNode, variant?: 'primary' | 'secondary', onClick?: MouseEventHandler, to?: string }) {
    if (to) {
        return <Link to={to} className="button-link"><button className={'button-'+variant} onClick={onClick}>{children}</button></Link>
    }
    
    return (
        <button className={'button-'+variant} onClick={onClick}>{children}</button>
    );
}

export default Button;