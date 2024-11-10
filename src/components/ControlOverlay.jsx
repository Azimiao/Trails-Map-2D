import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Divider, Drawer, FormControlLabel, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
        right: (props) => (props.drawerState ? 240 : -10),
        transition: "right 225ms cubic-bezier(0, 0, 0.2, 1)",
        top: 20,
        zIndex: 99999,
        pointerEvents: "auto"
    },
    list: {
        width: 250,
        // pointerEvents:"auto"
    },
    fullList: {
        width: 'auto',
    },
    heading: {
    }
}));


function ControlOverlay() {

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
                图层控制
            </h1>
            <Accordion
                defaultExpanded={true}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>展示控制</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">施工中</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                                label="Gilad Gray"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                                label="Jason Killian"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                label="Antoine Llorca"
                            />
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
                    <Typography className={classes.heading}>特殊</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        施工中
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>关于</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        梓喵出没出品
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );


    return (
        <div>
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
                    drawerState ? "收起" : "图层控制"
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
        </div>
    )
}

export default ControlOverlay;