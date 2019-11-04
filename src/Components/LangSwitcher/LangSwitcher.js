import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './langSwitch.css'
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageSelector = () => {
  const classes = useStyles();
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState('en')

  const changeLanguage = (event) =>{
    i18n.changeLanguage(event.target.value)
    setLanguage(event.target.value)
  }

  return (
    <div className='langSwitcher'>
      <FormControl className={classes.formControl}>
        <Select value={language} onChange={changeLanguage} displayEmpty className={classes.selectEmpty}>
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'ua'}>UA</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default LanguageSelector