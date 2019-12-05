import React , {useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme:any) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SubjectSelect: React.FC = () => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const handleChange = (name:any) => (event:any) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth!);
  }, []);
  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
      Age
    </InputLabel>
    <Select
      native
      value={state.age}
      onChange={handleChange('age')}
      labelWidth={labelWidth}
      inputProps={{
        name: 'age',
        id: 'outlined-age-native-simple',
      }}
    >
      <option value="" />
      <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option>
    </Select>
  </FormControl>
  )
}

export default SubjectSelect