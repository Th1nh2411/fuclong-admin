import { useContext } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import StoreContext from '../../../store/Context';
import { useLocation, useNavigate } from 'react-router';
import { IoLogOut } from 'react-icons/io5';
import config from '../../../config';

const cx = classNames.bind(styles);

function Header() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();
    const title = location.state ? location.state.title : 'Đơn hàng';
    const handleLogOut = () => {
        localStorage.clear();
        navigate(config.routes.login);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('greeting')}>
                    Chào {state.userInfo && state.userInfo.name}
                    {state.userInfo && (
                        <span>
                            ({state.userInfo.role === 1 ? 'Nhân viên' : state.userInfo.role === 2 ? 'Quản lý' : 'Admin'}
                            )
                        </span>
                    )}
                </div>
                <div onClick={handleLogOut} className={cx('actions')}>
                    Đăng xuất
                    <IoLogOut className={cx('icon')} />
                </div>
            </div>
            <div className={cx('page-route')}>Quản lý {title}</div>
        </div>
    );
}

export default Header;
