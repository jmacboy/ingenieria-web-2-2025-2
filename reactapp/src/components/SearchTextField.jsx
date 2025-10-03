import { FormControl } from 'react-bootstrap';
import lupa from '../assets/lupa.png';
const SearchTextField = ({ text, className }) => {
    return (
        <div className={`searchTextField ${className}`}>
            <FormControl type="text" placeholder="Buscar..." value={text} />
            <img src={lupa} alt="Buscar" />
        </div>
    );
}

export default SearchTextField;