import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as orderService from '../../services/orderService';
import { StoreContext, actions } from '../../store';
import LocalStorageManager from '../../utils/LocalStorageManager';
import dayjs from 'dayjs';
import { timeGap } from '../../utils/format';
const cx = classNames.bind(styles);

function Home() {
    const [incompleteOrders, setIncompleteOrders] = useState();
    const localStorageManager = LocalStorageManager.getInstance();
    const getAllOrder = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await orderService.getAllOrder(token);
            if (results) {
                setIncompleteOrders(results.invoices);
            }
        }
    };
    const completeOrder = async (idInvoice) => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await orderService.completeOrder(idInvoice, token);
        }
    };
    useEffect(() => {
        getAllOrder();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content-header')}>
                    <div className={cx('content-title')}>Đơn hàng chưa hoàn thành</div>
                    <div className={cx('content-subtitle')}></div>
                </div>
                <div className={cx('content-body')}>
                    {incompleteOrders &&
                        incompleteOrders.map((item, index) => (
                            <div key={index} className={cx('order-list')}>
                                <div className={cx('order-title')}>{timeGap(item.date)}</div>
                                {item.detail.map((item, index) => (
                                    <div key={index} className={cx('order-item-wrapper')}>
                                        {/* <Image src={item.image} className={cx('order-item-img')} /> */}
                                        <div className={cx('order-item-info')}>
                                            <div className={cx('order-item-name')}>
                                                {item.name}({item.size ? 'L' : 'M'}) x{item.quantityProduct}
                                            </div>
                                            {item.listTopping.length !== 0 && (
                                                <div className={cx('order-item-topping')}>
                                                    Topping :{' '}
                                                    {item.listTopping.map((topping) => topping.name).join(', ')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
