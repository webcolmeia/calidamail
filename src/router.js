import { Switch, Route, Redirect } from 'react-router-dom';
 
// BEGIN PAGES
import Inbox from './Pages/Inbox';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Message from './Pages/Message';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/login" component={Login} />
            <Route exact path="/message" render={() => <Redirect to="/inbox" />} />
            <Route path="/message/:id" component={Message} />
        </Switch>
    )
}

export default Router;