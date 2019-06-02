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
import { fetchRoomsRequest, joinRoomRequest, sendMessage, leaveRoomRequest } from '../actions/actions'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const classes = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {

    },
    messagesList: {
        overflow: 'auto',
        maxHeight: 300,
        minHeight: 300
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(),
    },
})

class Chat extends Component {

    state =
        {
            room: '',
            message: ''
        }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleRoomChange = (event) => {
        this.handleChange(event)

        const { dispatch, user } = this.props

        dispatch(joinRoomRequest({ room: event.target.value, user: user }))
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchRoomsRequest())
    }

    sendMessage = () => {
        const { message } = this.state
        const { dispatch } = this.props

        dispatch(sendMessage(message))
    }

    leaveRoom = () => {
        const { dispatch } = this.props
        dispatch(leaveRoomRequest())

        this.setState({ room: '' })
    }

    render() {
        const { room, message } = this.state
        const { rooms, onlineUsers, messages } = this.props

        return (
            <MenuAppBar>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={room}
                                onChange={this.handleRoomChange}
                                name="room"
                                displayEmpty
                                className={classes.selectEmpty}
                                disabled={!!room}
                            >
                                {!room && <MenuItem value="" disabled>
                                    Select a room
                                          </MenuItem>}
                                {rooms.map((x, index) => (<MenuItem key={index} value={x.name}>{x.name}</MenuItem>))}
                            </Select>
                            <FormHelperText>Selected Room</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} >
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                Online Users
                                        </Typography>
                            <List className={classes.messagesList}>
                                {onlineUsers.map((user, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary=''
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                                            {user}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>)
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <List className={classes.messagesList}>
                                {messages.length > 0 && messages.map((message, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={message.author}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                        </Typography>
                                                        {message.text}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>)
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>

                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={8}>
                                    <TextField
                                        id="message"
                                        label="Type your message here"
                                        className={classes.textField}
                                        value={message}
                                        name="message"
                                        margin="normal"
                                        onChange={this.handleChange}
                                        disabled={!room}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button className={classes.button} onClick={this.sendMessage} disabled={!room}>
                                        Send Message
                                    </Button>
                                    <Button className={classes.button} onClick={this.leaveRoom} disabled={!room}>
                                        Leave Room
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </MenuAppBar >
        )
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const rooms = state.getIn(['chat', 'rooms'])
    const onlineUsers = state.getIn(['chat', 'onlineUsers'])
    const messages = state.getIn(['chat', 'messages'])
    const user = state.getIn(['user', 'user'])

    return {
        rooms, onlineUsers, messages, user
    }
}

export default compose(withStyles(classes, { name: 'Chat' }), withCookies, connect(mapStateToProps))(Chat)