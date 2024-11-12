import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Divider, Drawer, FormControlLabel, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LayerDataHelper from '@/assets/LayerDataHelper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { observer } from 'mobx-react';
import I18nHelper from '@/utils/I18nHelper';
import StateCache from '@/assets/StateCache';
import GuideOverlay from './GuideOverlay';


const useStyles = makeStyles((theme) => ({
    controlOverlay: {
        position: "absolute",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
    },
    drawer: {
        pointerEvents: "none",
        "& .MuiPaper-root": {
            pointerEvents: "auto"
        }
    },
    button: {
        position: "fixed",
        right: (props) => (props.drawerState ? 270 : -10),
        transition: "right 225ms cubic-bezier(0, 0, 0.2, 1)",
        top: 20,
        zIndex: 99999,
        pointerEvents: "auto"
    },
    list: {
        width: 280,
        // pointerEvents:"auto"
    },
    fullList: {
        width: 'auto',
    },
    heading: {
    }
}));


const ControlOverlay = observer(function () {

    const [drawerState, setDrawerState] = React.useState(false);
    const classes = useStyles({ drawerState });

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    const toggleDrawer = (open) => {
        console.log(open);
        setDrawerState(open);
    };


    const list = () => (
        <div
            className={classes.list}
            role="presentation"
        // onClick={() => toggleDrawer(false)}
        >
            <h1 style={{
                textAlign: "center"
            }}>
                {I18nHelper.GetTranslateString("control_panel")}
            </h1>
            <Accordion
                defaultExpanded={true}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{I18nHelper.GetTranslateString("view_layer")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" className={classes.formControl}>
                        {/* <FormLabel component="legend">展示的层</FormLabel> */}
                        <FormGroup
                        // row sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                        >
                            <Grid container spacing={0}>
                                {
                                    LayerDataHelper.data.map((item, index) => {
                                        return (
                                            <Grid item xs={6}>
                                                <FormControlLabel
                                                    item key={item.key}
                                                    control={<Checkbox checked={item.show} onChange={(event, checked) => {
                                                        LayerDataHelper.setShowStatus(item.id, checked);
                                                    }} name={item.key} />}
                                                    label={I18nHelper.GetTranslateString(item.key)}
                                                />
                                            </Grid>)
                                    })
                                }
                            </Grid>
                        </FormGroup>
                        {/* <FormHelperText>Be careful</FormHelperText> */}
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>
                        {I18nHelper.GetTranslateString("special")}
                        </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    <FormControlLabel
                        item key={"open3D"}
                        control={<Checkbox checked={StateCache.is3D} onChange={(event, checked) => {
                            StateCache.Set3DMode(checked);
                        }} name={"open3D"} />}
                        label={I18nHelper.GetTranslateString("fake3d")}
                    />
                    <FormControlLabel
                        item key={"editormode"}
                        control={<Checkbox checked={StateCache.IsEditorMode} onChange={(event, checked) => {
                            StateCache.SetEditorMode(checked);
                        }} name={"editormode"} />}
                        label={I18nHelper.GetTranslateString("editor_mode")}
                    />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>{I18nHelper.GetTranslateString("about")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <h3>Trails Map Demo</h3>
                            Powered by 梓喵出没<br/>
                            Based on React & MUI & React-Leaflet & ByteMD<br/>
                            Icon licensed by veryicon.com's jackyyhj (Free for personal and commercial purpose.)<br/>
                            Map resources owned by Falcom
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );


    return (
        <React.Fragment>
            <Button
                className={classes.button}
                onClick={() => toggleDrawer(!drawerState)}
                variant="contained"
                color="secondary"
            >
                {
                    drawerState ? <ArrowForwardIcon /> : <ArrowBackIcon />
                }
                {
                    drawerState ? I18nHelper.GetTranslateString("fold_up") : I18nHelper.GetTranslateString("control_panel")
                }
            </Button>
            <React.Fragment key={"right"}>
                <Drawer
                    className={classes.drawer}
                    hideBackdrop={true}
                    BackdropProps={{ invisible: true }}
                    anchor={"right"}
                    open={drawerState}
                    onClose={(event, reason) => { }}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
            <GuideOverlay/>
        </React.Fragment>
    )
});

export default ControlOverlay;