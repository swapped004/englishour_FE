import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stat from './Stat';
import TopicStat from './TopicStat';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function StatTabs() {
  let query = useQuery();
  const token = query.get('token');
  const [value, setValue] = React.useState(0);

  const handleChange = (event , newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box className='Tab_label_container'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Exercise Stats" {...a11yProps(0)} />
          <Tab label="Topic Stats" {...a11yProps(1)} />
          <Tab label="Not yet done" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stat token = {token}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopicStat token = {token}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default StatTabs;
