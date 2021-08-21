import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    submitButton: {
        marginTop: 30
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        minWidth: "100%",
    },
}));

export default function PersonForm() {
    const classes = useStyles();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [sister, setSister] = React.useState('');
    const [relationship, setRelationship] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleSisterChange = (event) => {
        setSister(event.target.value);
    };
    const handleRelationshipChange = (event) => {
        setRelationship(event.target.value);
    };
    const handleAddress1Change = (event) => {
        setAddress1(event.target.value);
    };
    const handleAddress2Change = (event) => {
        setAddress2(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleStateChange = (event) => {
        setState(event.target.value);
    };
    const handleZipChange = (event) => {
        setZip(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    //
    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmission = (event) => {
        event.preventDefault();
        const person = {
            firstName: firstName,
            lastName: lastName,
            sister: sister,
            relationship: relationship,
            address1: address1,
            address2: address2,
            state: state,
            city: city,
            zip: zip,
        }

        axios.post('/api/v1/person', person)
            .then(res => {
                console.log(res);

                console.log(res.data);
                window.location = "/home" //This line of code will redirect you once the submission is succeed
            }).catch(err => {
                console.log(err.response.data.message)
            setOpen(true)
            setMessage(err.response.data.message)
            console.log('ERROR!!!!!!')

        })
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Family Member
                    </Typography>

                    <Grid container spacing={3}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                {message}
                            </Alert>
                        </Snackbar>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                value={lastName}
                                onChange={handleLastNameChange}
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="sister">Sister</InputLabel>
                                <Select
                                    width={2 / 4} labelId="sister"
                                    id="sister"
                                    value={sister}
                                    className="w5"
                                    onChange={handleSisterChange}>
                                    <MenuItem value={'BEA'}>BEA</MenuItem>
                                    <MenuItem value={'LOLA'}>LOLA</MenuItem>
                                    <MenuItem value={'EULA'}>EULA</MenuItem>
                                    <MenuItem value={'MERT'}>MERT</MenuItem>
                                    <MenuItem value={'BOO'}>BOO</MenuItem>
                                    <MenuItem value={'ELOISE'}>ELOISE</MenuItem>
                                    <MenuItem value={'PETIE'}>PETIE</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="relationship">Relationship</InputLabel>
                                <Select
                                    width={2 / 4} labelId="relationship"
                                    id="relationship"
                                    value={relationship}
                                    className="w5"
                                    onChange={handleRelationshipChange}>
                                    <MenuItem value={'SELF'}>SELF</MenuItem>
                                    <MenuItem value={'PARENT'}>PARENT</MenuItem>
                                    <MenuItem value={'CHILD'}>CHILD</MenuItem>
                                    <MenuItem value={'GRANDCHILD'}>GRANDCHILD</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                value={address1}
                                onChange={handleAddress1Change}
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                value={address2}
                                onChange={handleAddress2Change}
                                name="address2"
                                label="Address line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                value={city}
                                onChange={handleCityChange}
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="state"
                                       name="state"
                                       value={state}
                                       onChange={handleStateChange}
                                       label="State/Province/Region" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                value={zip}
                                onChange={handleZipChange}
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                        </Grid>
                    </Grid>
                    <Button type="submit"
                            className={classes.submitButton}
                            onClick={handleSubmission}
                            fullWidth
                            variant="contained"
                            color="primary">
                        Primary
                    </Button>
                </Paper>
                <Copyright/>
            </main>
        </React.Fragment>
    );
}
