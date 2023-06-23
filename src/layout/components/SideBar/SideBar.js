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
import { useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react';
import LocalStorageManager from '../../../utils/LocalStorageManager';
const cx = classNames.bind(styles);
function SideBar({ className, sideBarShrink }) {
    const logoRef = useRef();
    const localStorageManage = LocalStorageManager.getInstance();
    const userRole = localStorageManage.getItem('userInfo').role;
    useEffect(() => {
        if (logoRef.current) {
            if (sideBarShrink) {
                logoRef.current.style.height = '40px';
            } else {
                logoRef.current.style.height = '50px';
            }
        }
    }, [sideBarShrink]);
    return (
        <aside className={cx('wrapper', className)}>
            <Menu>
                <div className={cx('logo-img-wrapper')}>
                    <Image ref={logoRef} src={images.logo} className={cx('logo-img')} />
                </div>
                <Tippy content="Đơn hàng" placement="right" disabled={!sideBarShrink} duration={0}>
                    <div>
                        <MenuItem
                            title={!sideBarShrink && 'Đơn hàng'}
                            to={config.routes.order}
                            icon={<RiFileList3Fill />}
                            activeIcon={<RiFileList3Fill />}
                        />
                    </div>
                </Tippy>
                <Tippy content="Nguyên liệu" placement="right" disabled={!sideBarShrink} duration={0}>
                    <div>
                        <MenuItem
                            title={!sideBarShrink && 'Nguyên liệu'}
                            to={config.routes.ingredient}
                            icon={<GiMilkCarton />}
                            activeIcon={<GiMilkCarton />}
                        />
                    </div>
                </Tippy>
                {userRole > 1 && (
                    <Tippy content="Cửa hàng" placement="right" disabled={!sideBarShrink} duration={0}>
                        <div>
                            <MenuItem
                                title={!sideBarShrink && 'Cửa hàng'}
                                to={config.routes.shop}
                                icon={<AiFillShop />}
                                activeIcon={<AiFillShop />}
                            />
                        </div>
                    </Tippy>
                )}
                <Tippy content="Menu" placement="right" disabled={!sideBarShrink} duration={0}>
                    <div>
                        <MenuItem
                            title={!sideBarShrink && 'Menu'}
                            to={config.routes.menu}
                            icon={<RiCake3Fill />}
                            activeIcon={<RiCake3Fill />}
                        />
                    </div>
                </Tippy>
                {userRole > 1 && (
                    <Tippy content="Thống kê" placement="right" disabled={!sideBarShrink} duration={0}>
                        <div>
                            <MenuItem
                                title={!sideBarShrink && 'Thống kê'}
                                to={config.routes.report}
                                icon={<BsFillClipboard2DataFill />}
                                activeIcon={<BsFillClipboard2DataFill />}
                            />
                        </div>
                    </Tippy>
                )}
                {userRole > 1 && (
                    <Tippy content="Tài khoản" placement="right" disabled={!sideBarShrink} duration={0}>
                        <div>
                            <MenuItem
                                title={!sideBarShrink && 'Tài khoản'}
                                to={config.routes.account}
                                icon={<RiAccountCircleFill />}
                                activeIcon={<RiAccountCircleFill />}
                            />
                        </div>
                    </Tippy>
                )}
                <Tippy content="Log Out" placement="right" disabled={!sideBarShrink} duration={0}>
                    <div>
                        <MenuItem
                            onClick={() => localStorage.clear()}
                            separate
                            title={!sideBarShrink && 'Log Out'}
                            to={config.routes.login}
                            icon={<IoLogOut />}
                            activeIcon={<IoLogOut />}
                        />
                    </div>
                </Tippy>
            </Menu>
        </aside>
    );
}

export default SideBar;
