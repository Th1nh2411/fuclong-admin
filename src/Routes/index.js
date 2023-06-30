import Login from '../Pages/Login';
import Home from '../Pages/Home';
import IngredientPage from '../Pages/IngredientPage';
import StaffPage from '../Pages/StaffPage';
import MenuPage from '../Pages/MenuPage';
import ShopPage from '../Pages/ShopPage';
import config from '../config';
import ReportPage from '../Pages/ReportPage';
import AdminReportPage from '../Pages/AdminReportPage';

export const publicRoutes = [{ path: config.routes.login, component: Login, layout: null }];
export const privateRoutes = [
    { path: config.routes.order, component: Home },
    { path: config.routes.ingredient, component: IngredientPage },
    { path: config.routes.staff, component: StaffPage },
    { path: config.routes.menu, component: MenuPage },
    { path: config.routes.report, component: ReportPage },
    { path: config.routes.adminReport, component: AdminReportPage },
    { path: config.routes.shop, component: ShopPage },
];
