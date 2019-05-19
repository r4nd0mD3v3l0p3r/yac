import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MenuAppBar from './MenuAppBar'
import compose from 'recompose/compose'
import { withCookies } from 'react-cookie'
import { loginRequest } from '../actions/actions'

const classes = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        flexGrow: 1
    },
    loginButton: {
        marginLeft: -12,
        marginRight: 20,
    },
})

class Login extends Component {

    state =
        {
            name: '',
            password: ''
        }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLogin = () => {
        const { name, password } = this.state
        const { dispatch } = this.props

        dispatch(loginRequest({ user: name, password }))
    }

    render() {
        const { invalidCredentials, loggedIn, fetching } = this.props
        const { name, password } = this.state
        let content

        if (!loggedIn) {
            content = (
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography variant="h3">
                        Welcome. Please Login
                    </Typography>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={name}
                        name="name"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        margin="normal"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                    {invalidCredentials && <Typography variant="h6" color="secondary">
                        Invalid Credentials
                    </Typography>}
                    <Button variant="contained" className={classes.loginButton} onClick={this.handleLogin} disabled={fetching}>
                        Login
                    </Button>
                </Grid>)
        }
        else {
            content = (
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography variant="h3">
                        Welcome back!
                    </Typography>
                </Grid>
            )
        }
        return (
            <MenuAppBar>
                {content}
            </MenuAppBar>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const loggedIn = state.getIn(['user', 'loggedIn'])
    const fetching = state.getIn(['user', 'fetching'])
    const invalidCredentials = state.getIn(['user', 'invalidCredentials'])

    return {
        loggedIn, invalidCredentials, fetching
    }
}

export default compose(withStyles(classes, { name: 'Login' }), withCookies, connect(mapStateToProps, null))(Login)