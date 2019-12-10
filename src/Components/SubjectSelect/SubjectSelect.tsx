import React , {useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles((theme:any) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SubjectSelect: React.FC<any> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation()
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    subject: 'Subject',
  });
  let id = null;
  const {subjects, changeSubjectId, subjectId} = props
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const handleChange = (name:any) => (event:any) => {
    if(event.target.value === null || event.target.value === undefined){
      changeSubjectId(null)
    }else if(event.target.value === ''){
      changeSubjectId(subjectId)
    }else{
      id = subjects.filter((subject:any) => subject.name === event.target.value)[0].id
      setState({
        ...state,
        [name]: event.target.value,
      });
      changeSubjectId(id)
    }
  };
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth!);
  }, []);
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
      {t('Subject')}
    </InputLabel>
    <Select
      native
      value={state.subject}
      onChange={handleChange('subject')}
      labelWidth={labelWidth}
      inputProps={{
        subejct: 'subject',
        id: 'outlined-age-native-simple',
      }}
    >
      <option value="" />
      {
        subjects && subjects.map((subject:any) => {
          return(
            <option key={subject.id} value={subject.name}>{subject.name}</option>
          )
        })
      }
    </Select>
  </FormControl>
  )
}

export default SubjectSelect