


function Search({search, setSearch, handleSearch}){

    return(<>
    <div>
        <input className="search-bar" type="text" name="search" value={search} placeholder="Enter your place..." onChange={(e)=>
            setSearch(e.target.value)}></input>
        <button onClick={handleSearch} className="search-btn">Submit</button>
    </div>
    </>)
}

export default Search