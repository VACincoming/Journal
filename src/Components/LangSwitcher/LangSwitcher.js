import React from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './langSwitch.css'
import { bindActionCreators } from 'redux';
import {fetchLanguage} from '../../actions'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageSelector = ({language, fetchLanguage}) => {
  const classes = useStyles();
  const { i18n } = useTranslation()
  const handleLanguage = (event) =>{
    i18n.changeLanguage(event.target.value)
    fetchLanguage(event.target.value)
  }

  return (
    <div className='langSwitcher'>
      <FormControl className={classes.formControl}>
        <Select value={language} onChange={handleLanguage} displayEmpty className={classes.selectEmpty}>
          <MenuItem value={'ua'}>UA</MenuItem>
          <MenuItem value={'en'}>EN</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchLanguage: fetchLanguage()
  }, dispatch)
}
const mapStateToProps = ({language}) => {
  return {language}
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)