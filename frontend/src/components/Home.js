import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuAppBar from './MenuAppBar';
import { withCookies } from 'react-cookie';
import compose from 'recompose/compose';
import * as Constants from '../Constants'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
})

class Home extends React.Component {
    render() {
        const { cookies } = this.props
        const logged = cookies.get(Constants.LOGIN_COOKIE) !== undefined

        let content

        if (logged) {
            content = (<Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>Welcome Back!</Typography>)
        }
        else {
            content = (<Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>Please login</Typography>)
        }

        return (
            <MenuAppBar>
                {content}
            </MenuAppBar>
        )
    }
}

export default compose(withStyles(styles, { name: 'Home' }), withCookies)(Home)