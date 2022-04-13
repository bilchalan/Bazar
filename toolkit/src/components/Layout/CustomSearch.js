import React from 'react';
import './CustomSearch.css';

const CustomSearch = ({handleSearch}) => {
  return (
    <div className='search-wrapper'>
        <div className="search-container left-search-container">
            <input className="search expandright" 
                    id="searchright" 
                    type="search" 
                    name="q" 
                    placeholder="Search"
                    onChange={handleSearch}/>
            <label className="button searchbutton" htmlFor="searchright"><span className="mglass">&#9906;</span></label>
        </div>
        <div className="search-container right-search-container">
            <input className="search" 
                    id="searchleft" 
                    type="search" 
                    name="q" 
                    placeholder="Search"
                    onChange={handleSearch}/>
            <label className="button searchbutton" htmlFor="searchleft"><span className="mglass">&#9906;</span></label>
        </div>
    </div>
  )
}

export default CustomSearch