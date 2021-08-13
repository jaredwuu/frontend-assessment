import React from 'react'

const SearchBar = ({searchFunction, content }) => {
    return (
        <input
            className='w-full h-8 border-b focus:outline-none focus:ring focus:border-blue-300 px-2'
            placeholder={`Search by ${content}`}
            onChange ={(e)=>{
                searchFunction(e.target.value.toLocaleLowerCase().trim());
            }}        
        />
    )
}

export default SearchBar
