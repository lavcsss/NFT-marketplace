import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';




const scrollableTabs = () => {

    interface TabPanelProps {
        children?: React.ReactNode;
        index: any;
        value: any;
      }

      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}      
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      function a11yProps(index: any) {
        return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,        
        };
      }

      const useStyles = makeStyles((theme: Theme) => ({
        root: {
          flexGrow: 1,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
        },
      }));

      const [value, setValue] = React.useState(0);
    
      const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
      };
      
      function renderData(tab_id: string) {
        var i, tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
          }
        document.getElementById(tab_id).style.display = "block";

        var onSaleElement = document.getElementsByClassName("listings-mob");
        if (tab_id != "On-Sale")
        {
        onSaleElement[0].classList.remove('on-sale-active');
        }
      }

    return (<div className={"tablinks mob-view-profile-tab"}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"  
            aria-label="scrollable force tabs example"
          >
          <Tab label="Listings"  {...a11yProps(0)} onClick={() => {renderData("On-Sale");}}/>
          <Tab label="Created"  {...a11yProps(1)} onClick={() => {renderData("Created");}}/>
          <Tab label="Collected" {...a11yProps(2)} onClick={() => {renderData("Collectibles");}}/>
          <Tab label="Collections" {...a11yProps(3)} onClick={() => {renderData("My-Collections");}}/>
          <Tab label="Favorite"  {...a11yProps(4)} onClick={() => {renderData("Favorite");}}/>
          <Tab label="Import NFTs" {...a11yProps(5)} onClick={() => {renderData("imported-nfts");}}/>
          <Tab label="Activity"  {...a11yProps(6)} onClick={() => {renderData("Activity");}}/>
          </Tabs>
        </AppBar>

        
        
      </div>);

}

export default scrollableTabs

