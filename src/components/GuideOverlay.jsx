import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, createTheme, Dialog, DialogContent, DialogTitle, IconButton, makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import { Folder as FolderIcon, Close as CloseIcon, LocalDining } from '@material-ui/icons';

import { Viewer as ByteMDViewer } from '@bytemd/react';

import FirstStartMD from "../assets/docs/FirstStart.md";
import ControlPanelMD from "../assets/docs/ControlPanel.md";
import EditorModeMD from "../assets/docs/EditorMode.md";
import ThreeDModeMD from "../assets/docs/ThreeDMode.md";
import OtherMD from "../assets/docs/Other.md";
import StateCache from '@/assets/StateCache';
import { observer } from 'mobx-react';


// 记得图片的 minheight

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}




const useStyles = makeStyles((theme) => ({

    overlay: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#00000051",
        zIndex: 8888888
    },
    tabroot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // position:"absolute",
        // left:"50%",
        // top:"50%",
        width: "100%",
        // transform:'translate(-50%,-50%)',
        // zIndex:9999999,
        // borderRadius:"5px",
        height: "350px",
        maxHeight: "90vh",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,

    },
    tabPanel: {
        width: "75%",
        // height:"calc(100% - 24px)",
        height: "100%",
        overflowY: "scroll"

    },
    dialog: {
        // height:"350px"
    },
    dialogTitle: {
        padding: '0.2em 0.2em 0.2em 0.5em !important',

    },

    dialogContent: {
        boxSizing: "border-box",
        maxWidth: '600px',
        width: 'auto',
        //  margin: '0 auto',
        // padding: '8',
        paddingLeft: 0,
        paddingRight: 0
    },
    dialogTitleLayout: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "1.5em"
    },
    dialogTitleIcon: {
        width: "1em",
        height: "1em",
    },
    dialogTitleText: {
        fontSize: "1em !important",
    },
    dialogBookmarkTitle: {
        fontSize: "0.85em !important",
        color: "black",
        maxWidth: "80px",
    }
}));

function TabPanel(props) {
    const { children, value, index,targetMDFile, ...other } = props;
    const classes = useStyles();
    const [markdownStr,SetMarkDownStr] = useState("");

    useEffect(()=>{
        if(targetMDFile){
            fetch(targetMDFile).then(res=>res.text().then(text=>{
            SetMarkDownStr(text);
            }));
        }
    },[]);
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            className={classes.tabPanel}
        >
            {value === index && (
                <Box style={{
                    paddingTop: 0,
                    paddingBottom: 0
                }} p={3}>
                    <Typography>
                        {targetMDFile != null && markdownStr.length > 0 ? 
                        <ByteMDViewer value={markdownStr}></ByteMDViewer>
                            : children
                        }
                    </Typography>
                </Box>
            )}
        </div>
    );
}

const GuideOverlay = observer(function() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    useEffect(()=>{
        var a = localStorage.getItem("guideShowd");
        if(a == null || a.length <= 0){
            // Open
            StateCache.SetGuideLayerValues(false);
        }
    },[]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const onClose = () => {
        StateCache.SetGuideLayerValues(true);
        localStorage.setItem("guideShowd","1");
    };

    return (
        <Dialog open={!StateCache.guideShowd} onClose={onClose} maxWidth="sm" fullWidth className={classes.dialog}>
            <DialogTitle component={"h5"} className={classes.dialogTitle}>
                <div className={classes.dialogTitleLayout}>
                    <FolderIcon className={classes.dialogTitleIcon} />
                    <Typography variant="h6" className={classes.dialogTitleText}>
                        新手引导(🪧施工中🚧)
                    </Typography>
                    <IconButton onClick={onClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                <div className={classes.tabroot}>
                    <Tabs
                        orientation="vertical"
                        variant="fullWidth"
                        // indicatorColor="primary"
                        // textColor="primary"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}

                    >
                        <Tab label="地图操作" {...a11yProps(0)} />
                        <Tab label="控制面板" {...a11yProps(1)} />
                        <Tab label="编辑模式" {...a11yProps(2)} />
                        <Tab label="伪3D模式" {...a11yProps(3)} />
                        <Tab label="进阶" {...a11yProps(4)} />
                    </Tabs>
                    <TabPanel value={value} index={0} targetMDFile={FirstStartMD}>
                        <CircularProgress/>
                    </TabPanel>
                    <TabPanel value={value} index={1} targetMDFile={ControlPanelMD}>
                    <CircularProgress/>
                    </TabPanel>
                    <TabPanel value={value} index={2} targetMDFile={EditorModeMD}>
                    <CircularProgress/>
                    </TabPanel>
                    <TabPanel value={value} index={3} targetMDFile={ThreeDModeMD}>
                    <CircularProgress/>
                    </TabPanel>
                    <TabPanel value={value} index={4} targetMDFile={OtherMD}>
                    <CircularProgress/>
                    </TabPanel>
                </div>
            </DialogContent>
        </Dialog>
    )
});

export default GuideOverlay;