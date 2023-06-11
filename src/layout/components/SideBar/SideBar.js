import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '../../../config';
import Image from '../../../components/Image';

import { IoLogOut } from 'react-icons/io5';
import { BsFillClipboard2DataFill } from 'react-icons/bs';
import { AiFillShop } from 'react-icons/ai';
import { RiAccountCircleFill, RiCake3Fill, RiFileList3Fill } from 'react-icons/ri';
import { GiMilkCarton } from 'react-icons/gi';
import images from '../../../assets/images';
const cx = classNames.bind(styles);
function SideBar({ className }) {
    return (
        <aside className={cx('wrapper', className)}>
            <Menu>
                <div className={cx('logo-img-wrapper')}>
                    <Image src={images.logo} className={cx('logo-img')} />
                </div>
                <MenuItem
                    title="Đơn hàng"
                    to={config.routes.order}
                    icon={<RiFileList3Fill />}
                    activeIcon={<RiFileList3Fill />}
                />
                <MenuItem
                    title="Nguyên liệu"
                    to={config.routes.ingredient}
                    icon={<GiMilkCarton />}
                    activeIcon={<GiMilkCarton />}
                />
                <MenuItem title="Cửa hàng" to={config.routes.shop} icon={<AiFillShop />} activeIcon={<AiFillShop />} />
                <MenuItem title="Menu" to={config.routes.menu} icon={<RiCake3Fill />} activeIcon={<RiCake3Fill />} />
                <MenuItem
                    title="Thống kê"
                    to={config.routes.report}
                    icon={<BsFillClipboard2DataFill />}
                    activeIcon={<BsFillClipboard2DataFill />}
                />
                <MenuItem
                    title="Tài khoản"
                    to={config.routes.account}
                    icon={<RiAccountCircleFill />}
                    activeIcon={<RiAccountCircleFill />}
                />
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
