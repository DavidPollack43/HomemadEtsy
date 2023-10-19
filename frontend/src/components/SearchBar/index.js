import React, {useState} from "react";
import magGlass from './searchBarGrey.svg';
import "./index.css";

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return(
        <>
            <div>
                <input 
                    type="text"
                    placeholder="Search for anything"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button className="search-button"><img src={magGlass} alt="magGlass" /></button>
            </div>
        </>
    )
}

export default SearchBar;