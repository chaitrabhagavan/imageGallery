import React, {useState} from "react";

function Header(props) {
  const [search, setSearch] = useState("");
  function onSearchChange(event){
    setSearch(event.target.value);
  }
  function handleSubmit (){
    props.onSearch(search);
  }
  return (
    <div>
      <h1 className="header">Gallery</h1>
      <div className="search">
        <input className="search-input"value={search} placeholder="Search" onChange={onSearchChange}/>
        <button className="search-button" onClick={handleSubmit} >Search</button>
      </div>
    </div>
  );
}

export default Header;
