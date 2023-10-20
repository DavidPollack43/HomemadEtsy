import { useState } from "react";
import { useHistory } from "react-router-dom";
import magGlass from './searchBarGrey.svg';
import "./index.css";

const SearchBar = (props) => {
    debugger
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/products/search/${searchTerm}`);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSearchSubmit}>
                    <input 
                        type="text"
                        placeholder="Search for anything"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSearchSubmit(e); }}
                    />
                    <button type="submit" className="search-button"><img src={magGlass} alt="magGlass" /></button>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
