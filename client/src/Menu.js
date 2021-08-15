import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    button: {
        color: '#eee'
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const menuItem = (title, path) => {
    return {
        title: title,
        path: path
    }
};

const menuItems = [
    menuItem("Home", "/"),
    menuItem("Album", "/album"),
    menuItem("Form", "/form"),
];

export default function SimpleMenu() {
    const history = useHistory();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (i) => {
        history.push(i);
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Vassar Family App
                        </Typography>
                        <div className={classes.menu}>
                            <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true"
                                    onClick={handleClick}>
                                Open Menu
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                {menuItems.map(i => <MenuItem onClick={() => handleClose(i.path)}>{i.title}</MenuItem>)}

                            </Menu></div>
                    </Toolbar>
                </AppBar>
            </div>

        </div>
    );
}
