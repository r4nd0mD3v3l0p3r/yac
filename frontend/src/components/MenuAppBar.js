import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import history from './History'
import { Helmet } from 'react-helmet'
import compose from 'recompose/compose'
import { withCookies } from 'react-cookie'
import { logoutRequest } from '../actions/actions'

const drawerWidth = 240

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

class MenuAppBar extends React.Component {

    state = { open: false }

    handleLogout = () => {
        const { dispatch } = this.props

        dispatch(logoutRequest())
        history.push("/")
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes, title, loggedIn, fetching } = this.props
        let button

        if (loggedIn) {
            button = (
                <Button color="inherit" onClick={this.handleLogout} disabled={fetching}>Logout</Button>
            )
        } else {
            button = (
                <Button color="inherit" component={Link} to="/login" disabled={fetching}>Login</Button>
            )
        }
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        {loggedIn && <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>}
                        <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }} />
                        <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>{title}</Typography>
                        {button}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key="Chat" component={Link} to="/chat">
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat" />
                        </ListItem>
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const loggedIn = state.getIn(['user', 'loggedIn'])
    const fetching = state.getIn(['user', 'fetching'])

    return { loggedIn, fetching }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string
}

MenuAppBar.defaultProps = {
    title: 'YAC - Yet Another Chat'
}

export default compose(withStyles(styles, { name: 'Login' }), withCookies, connect(mapStateToProps, null))(MenuAppBar)