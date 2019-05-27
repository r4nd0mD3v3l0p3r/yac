import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuAppBar from './MenuAppBar'
import compose from 'recompose/compose'
import { withCookies } from 'react-cookie'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const classes = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
    },
})

class Chat extends Component {

    state =
        {
            room: ''
        }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    componentDidMount()
    {
        
    }

    render() {
        const { room } = this.state

        return (
            <MenuAppBar>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={room}
                                onChange={this.handleChange}
                                name="room"
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="" disabled>
                                    Select a room
                                </MenuItem>
                                <MenuItem value={10}>Sport</MenuItem>
                                <MenuItem value={20}>Music</MenuItem>
                            </Select>
                            <FormHelperText>Selected Room</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </MenuAppBar>
        )
    }
}

Chat.propTypes = {
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

export default compose(withStyles(classes, { name: 'Chat' }), withCookies, connect(mapStateToProps, null))(Chat)