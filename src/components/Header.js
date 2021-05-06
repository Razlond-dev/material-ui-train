import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from "@material-ui/core"
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
      cursor: 'pointer',
    },
  },
  searchIcon: {
    marginRight: theme.spacing(1)
  }
  // btnRoot: {
  //   backgroundColor: 'green',
  // },
  // btnLabel: {
  //   backgroundColor: 'red',
  // }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar> F
        <Grid alignItems="center" container>
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder="Search.."
              startAdornment={<SearchIcon className={classes.searchIcon} fontSize="small" />}
            />
          </Grid>
          <Grid item sm>
          </Grid>
          <Grid item>
            <IconButton classes={{ root: classes.btnRoot, label: classes.btnLabel }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton classes={{ root: classes.btnRoot, label: classes.btnLabel }}>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header