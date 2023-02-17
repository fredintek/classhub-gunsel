import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  return (
    <div className="mx-auto min-[600px]:mx-0 border border-gray-400 text-gray-600 rounded-md flex items-center px-1">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Seach..."
        className="block ml-1 outline-none p-1"
      />
    </div>
  );
}

export default Search