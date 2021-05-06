import {  withStyles } from "@material-ui/core"


// withStyles & makeStyles

const styles = {
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0',
    width: '320px',
    height: '100%',
    backgroundColor: '#253035'
  }
}

const SideMenu = ({ classes }) => {

  return <div className={classes.sideMenu}>
    side menu
  </div>
}

export default withStyles(styles)(SideMenu)