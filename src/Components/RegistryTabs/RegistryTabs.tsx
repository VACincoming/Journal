import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SetRegistry from '../SetRegistry'
import GetRegistry from '../GetRegistry'
import { useTranslation } from 'react-i18next'
import GroupListTable from '../../Components/GroupListTable'
import ExportToExcelTab from '../ExportToExcelTab'
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#A6D3EC",
  },
}));

export default function RegistryTabs(props:any) {
  const { t } = useTranslation()
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {users, role, exportToExcel, language} = props
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          {role === "MONITOR" && <LinkTab label={t('SetAbsent')}{...a11yProps(0)} />}
          {role === "ADMIN" && <LinkTab label={t('GroupList')} {...a11yProps(0)} />}
          <LinkTab label={t('GetAbsent')}{...a11yProps(1)} />
          {(role === "ADMIN" || role === "MONITOR") && <LinkTab label={t('ExportToExcel')}{...a11yProps(2)} />}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       {role === "MONITOR" && <SetRegistry subjects={props.subjects} users={props.users}/>}
       {role === "ADMIN" && <GroupListTable users={users}/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GetRegistry />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <>
          <ExportToExcelTab exportToExcel={(dateFrom:any, dateTo:any) => exportToExcel(dateFrom, dateTo)}/>
        </>
      </TabPanel>

    </div>
  );
}
