import Login from '../Pages/Login';
import Home from '../Pages/Home';
import IngredientPage from '../Pages/IngredientPage';
import ShopPage from '../Pages/ShopPage';
import MenuPage from '../Pages/MenuPage';
import config from '../config';
import ReportPage from '../Pages/ReportPage/ReportPage';
import AccountPage from '../Pages/AccountPage/AccountPage';

export const publicRoutes = [{ path: config.routes.login, component: Login, layout: null }];
export const privateRoutes = [
    { path: config.routes.order, component: Home },
    { path: config.routes.ingredient, component: IngredientPage },
    { path: config.routes.shop, component: ShopPage },
    { path: config.routes.menu, component: MenuPage },
    { path: config.routes.report, component: ReportPage },
    { path: config.routes.account, component: AccountPage },
];
