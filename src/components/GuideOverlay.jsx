import React from 'react'
import { Box, createTheme, Dialog, DialogContent, DialogTitle, IconButton, makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import { Folder as FolderIcon, Close as CloseIcon } from '@material-ui/icons';



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
    const { children, value, index, ...other } = props;
    const classes = useStyles();

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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function GuideOverlay() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [openStatus,setOpenStatus] = React.useState(true);
    const onClose = () => {
        setOpenStatus(false)
    };

    return (
        <Dialog open={openStatus} onClose={onClose} maxWidth="sm" fullWidth className={classes.dialog}>
            <DialogTitle component={"h5"} className={classes.dialogTitle}>
                <div className={classes.dialogTitleLayout}>
                    <FolderIcon className={classes.dialogTitleIcon} />
                    <Typography variant="h6" className={classes.dialogTitleText}>
                        新手引导
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
                        <Tab label="伪3D模式" {...a11yProps(2)} />
                        <Tab label="编辑模式" {...a11yProps(3)} />
                        <Tab label="进阶" {...a11yProps(4)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        👨‍🏭施工中🚧🚧🚧🚧🚧<br />
                        🏗️施工中🚧🚧🚧🚧🚧<br />
                        测试文本👇<br/>
                        整个轨迹系列的剧情围绕塞姆利亚大陆展开，不同作品的故事舞台为大陆的不同国家/地区，每部作品的主角与配角会随着系列整个故事剧情的推进而邂逅
                        <br />
                        🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                        每部作品的详细介绍可以在作品一览页面查看，其中包含了目前登录的游戏平台 (例如: Steam)，是否存在中文版, 预计发售日期等信息
                        <br />
                        🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                        按照游戏发布顺序的完整攻略顺序应为:
                        <br />
                        🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                        空之轨迹FC → 空之轨迹SC → 空之轨迹3RD → 零之轨迹 → 碧之轨迹 → 闪之轨迹I → 闪之轨迹II → 闪之轨迹III → 闪之轨迹IV → 创之轨迹 → 黎之轨迹 → 黎之轨迹II
                        <br />
                        🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                        其中空之轨迹→碧之轨迹都是3D/2.5D像素小人，从闪之轨迹开始改变为真正的3D建模
                        <br />
                        🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                        如果想要从比较新的作品开始入坑，可以从闪轨I开始。可能会有一些支线剧情无法理解，但是并不影响游戏体验。但是在开始创轨之前最好把零之轨迹补完，因为创轨三条主线中的一条和零碧有很大关系。另外, 空之轨迹的角色也会在闪之轨迹的后期以及创之轨迹中登场
                        <br />
                        🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️<br />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                    🧱🧱🧱🧱🧱🧱🧱🏗️<br />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                    🔨🔨🔨🔨🔨🔨🔨🔨🔨<br />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                    🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧<br />
                    </TabPanel>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GuideOverlay;