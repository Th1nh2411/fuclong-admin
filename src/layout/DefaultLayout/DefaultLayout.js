import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { StoreContext, actions } from '../../store';
import Toast from '../../components/Toast/Toast';
import config from '../../config';
import { useLocation } from 'react-router';
import SideBar from '../components/SideBar';
import Header from '../components/Header/Header';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const localStorageManager = LocalStorageManager.getInstance();
    const [state, dispatch] = useContext(StoreContext);
    const currentPath = useLocation().pathname;

    const setStorageData = () => {
        const userData = localStorageManager.getItem('userInfo');
        dispatch(actions.setUserInfo(userData));
    };
    useEffect(() => {
        setStorageData();
    }, []);
    return (
        <>
            <div className={cx('wrapper')}>
                <SideBar />
                <div className={cx('container')}>
                    <Header />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>

            {state.toast.show && (
                <Toast
                    content={state.toast.content}
                    title={state.toast.title}
                    type={state.toast.type}
                    onClose={() => dispatch(actions.setToast({ show: false }))}
                />
            )}
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
