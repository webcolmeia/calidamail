import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ListItemLink = (props) =>{

    const { primary, icon, to } = props;

    const CustonLink = React.useMemo(
        () => 
            React.forwardRef((linkprops, ref)=> (
                <Link ref={ref} to={to} {...linkprops} />
            )),
        [to],
    );

    return (
        <ListItem button component={CustonLink}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    )
}

export default ListItemLink;