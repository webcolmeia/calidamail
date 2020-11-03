import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from "@material-ui/core";
import { InboxTwoTone, Replay } from "@material-ui/icons";
import ListItemLink from '../../Components/ListItemLink';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const Sidebar = () =>{

    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
            <List>
                <ListItemLink to="/inbox" primary="Caixa de entrada" icon={<InboxTwoTone />} />
                <ListItem button>
                    <ListItemIcon><Replay /></ListItemIcon>
                    <ListItemText primary="Atualizar" />
                </ListItem>
            </List>
            </div>
        </Drawer>
    );
}

export default Sidebar;