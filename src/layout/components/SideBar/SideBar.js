import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '../../../config';

import { QRIcon } from '../../../components/Icons/Icons';
import { IoLogOut } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
const cx = classNames.bind(styles);
function SideBar({ className }) {
    return (
        <aside className={cx('wrapper', className)}>
            <Menu>
                <MenuItem
                    title="Home"
                    to={config.routes.home}
                    icon={<QRIcon height="2.4rem" width="2.4rem" />}
                    activeIcon={<QRIcon height="2.4rem" width="2.4rem" />}
                />
                <MenuItem title="Exercise" to={config.routes.exercise} icon={<QRIcon />} activeIcon={<QRIcon />} />
                <MenuItem title="Recipe" to={config.routes.recipe} icon={<QRIcon />} activeIcon={<QRIcon />} />
                <MenuItem
                    title="Account"
                    to={config.routes.profile}
                    icon={<FaRegUserCircle />}
                    activeIcon={<FaRegUserCircle />}
                />
                <MenuItem title="HWNet" to={config.routes.HWNet} icon={<QRIcon />} activeIcon={<QRIcon />} />
                <MenuItem
                    onClick={() => localStorage.clear()}
                    separate
                    title="Log Out"
                    to={config.routes.login}
                    icon={<IoLogOut />}
                    activeIcon={<IoLogOut />}
                />
            </Menu>
        </aside>
    );
}

export default SideBar;
