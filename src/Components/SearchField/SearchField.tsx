import React from 'react'
import './searchField.css'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '../../assets/img/Vector.png'
function SearchField(props:any){
  const { onSearch } = props
  return(
    <TextField
    id="margin-none"
    className='textField'
    label="Search"
    onChange={(e) => onSearch(e.target.value)}
    autoComplete='off'
    InputProps={{
      endAdornment: <InputAdornment position="end"><img src={Search} alt="Search"/></InputAdornment>,
    }}
  />
  )
}

export default SearchField