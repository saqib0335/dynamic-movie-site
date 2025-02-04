import React from 'react'

const Search = ({searchParam, setSearchParam}) => {
  return (
    <div className='search'>
       <div>
       <img src='./search.png' alt='search'/>
        <input type="text" placeholder='Search For Latest Movies'
        value={searchParam} 
        onChange={(e) => setSearchParam(e.target.value)} 
        />
       </div>
    </div>
  )
}

export default Search