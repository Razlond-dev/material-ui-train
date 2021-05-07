import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0",
    width: "320px",
    height: "100%",
    backgroundColor: "#253035",
  },
}));

const SideMenu = () => {
  const classes = useStyles();

  return <div className={classes.sideMenu}>side menu</div>;
};

export default SideMenu;
