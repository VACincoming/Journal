import React, {useState, useEffect, useCallback} from 'react'
import Dialog from '@material-ui/core/Dialog';
import './editMemberModal.css'
import Button from '@material-ui/core/Button';
import searchImg from '../../assets/img/searchImg.png'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const EditMemberModal: React.FC<any> = props => {
  const {onClose, open, users, handleChangeRole, loading} = props
  const handleClose = () => {
    onClose()
    setSearchText('');
  } 
  const [filterArray, setFilterArray] = useState(users)
  const [searchText, setSearchText] = useState('')
  let elements = null
  const search = 
    useCallback((filterText:string) => {
      setFilterArray(users.filter((item:any) => {
        return ((item.firstName.toLowerCase() + '' + item.lastName.toLowerCase()).indexOf(filterText.toLowerCase()) > -1)
      }))
    }, [users])
  function onSearch(text:string){
    setSearchText(text);
    search(text);
  }
  useEffect(() => {
    setFilterArray(users);
  }, [])
  useEffect(() => {
    search(searchText)
  }, [search, searchText])
  async function changeRole(id:number, role:string, email:string, username:string){
    await handleChangeRole(id, role, email, username)
    onSearch(searchText)
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
      filterArray.filter((user:any) => user.id !== null)
        .map((user:any) => {
          return(
            <div className='listItemWrapper' key={user.id}>
              <h4>{user.firstName} {user.lastName}</h4>
              <Button variant="contained" className="blueBtn" onClick={()=>changeRole(user.id, user.role, user.email, user.username)}>Change role</Button>
            </div>
          )
        })
  }</> : <h3>no users</h3>)
  return(
    <Dialog onClose={handleClose} open={open} className='DialogWidth'>
      {
      loading ? <p>Loading...</p> : 
      <div className='wrapperEditMember'>
          {elements}
      </div>
      } 
    </Dialog>
  )
}

export default EditMemberModal