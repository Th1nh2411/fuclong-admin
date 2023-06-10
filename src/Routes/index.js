import Home from '../Pages/Home';
import Login from '../Pages/Login';
import config from '../config';

export const publicRoutes = [{ path: config.routes.login, component: Login, layout: null }];
export const privateRoutes = [{ path: config.routes.home, component: Home }];
