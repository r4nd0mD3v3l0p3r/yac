import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MenuAppBar from './MenuAppBar'
import { withCookies } from 'react-cookie'
import compose from 'recompose/compose'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
})

class Home extends React.Component {
    render() {

        return (
            <MenuAppBar>
                <Typography variant="h4" style={{ flex: 1 }}>Yet Another Chat</Typography>
            </MenuAppBar>
        )
    }
}

export default compose(withStyles(styles, { name: 'Home' }), withCookies)(Home)