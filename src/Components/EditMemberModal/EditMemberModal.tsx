import React, {useState, useEffect, useCallback} from 'react'
import Dialog from '@material-ui/core/Dialog';
import './editMemberModal.css'
import Button from '@material-ui/core/Button';
import searchImg from '../../assets/img/searchImg.png'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

function EditMemberModal(props:any){
  const {onClose, open, users, handleChangeRole} = props
  const handleClose = () => {
    onClose()
    setSearchText('');
  } 
  console.log(users)
  const [filterArray, setFilterArray] = useState(users)
  const [searchText, setSearchText] = useState('')
  let elements = null
  const search = 
    useCallback((filterText:any) => {
      setFilterArray(users.filter((item:any) => {
        return ((item.firstName.toLowerCase() + '' + item.lastName.toLowerCase()).indexOf(filterText.toLowerCase()) > -1)
      }))
    }, [users])
  function onSearch(text:any){
    console.log(text, filterArray, users, searchText)
    setSearchText(text);
    search(text);
  }
  useEffect(() => {
    setFilterArray(users);
  }, [])
  useEffect(() => {
    search(searchText)
  }, [search, searchText])
  const changeRole = (id:number, role:string, email:string, username:string) => {
    handleChangeRole(id, role, email, username).then(()=>onSearch(searchText))
  }
  elements = (
    users && users.length > 0 ?
    <>
    <TextField
      id="margin-none"
      className='textField'
      label="Search"
      onChange={(e) => onSearch(e.target.value)}
      autoComplete='off'
      InputProps={{
        endAdornment: <InputAdornment position="end"><img src={searchImg} alt="Search"/></InputAdornment>,
      }}
    />{
      filterArray.map((el:any) => {
        if(el.id !== null){
          return(
            <div className='listItemWrapper' key={el.id}>
              <h4>{el.firstName} {el.lastName}</h4>
              <Button variant="contained" className="blueBtn" onClick={()=>changeRole(el.id, el.role, el.email, el.username)}>Change role</Button>
            </div>
          )
        }
    })
  }</> : <h3>no users</h3>)
  return(
    <Dialog onClose={handleClose} open={open} className='DialogWidth'>
      <div className='wrapperEditMember'>
          {elements}
      </div>
    </Dialog>
  )
}

export default EditMemberModal