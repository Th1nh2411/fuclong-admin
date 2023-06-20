import styles from './IngredientPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as shopService from '../../services/shopService';
import { StoreContext, actions } from '../../store';
import Tippy from '@tippyjs/react';
import { BsClipboardCheckFill } from 'react-icons/bs';
const cx = classNames.bind(styles);

const incompleteOrders = [];
function IngredientPage() {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('content-header')}>
                            <div className={cx('content-title')}>
                                {/* <HiDocumentMinus className={cx('icon', 'warning')} /> */}
                                Danh sách nguyên liệu
                            </div>
                            <div className={cx('content-subtitle')}>20 nguyên liệu</div>
                        </div>
                        <div className={cx('content-body')}>
                            {incompleteOrders && incompleteOrders.length !== 0 ? (
                                incompleteOrders.map((order, index) => (
                                    <div key={index} className={cx('order-list')}>
                                        <div className={cx('order-header')}>
                                            <div className={cx('order-title')}>Nguyên liệu {index}</div>
                                            <Tippy content="Hoàn thành đơn" placement="bottom" duration={0}>
                                                <div onClick={() => alert('hehe')} className={cx('order-item-actions')}>
                                                    <BsClipboardCheckFill />
                                                </div>
                                            </Tippy>
                                        </div>
                                        {order.detail.map((item, index) => (
                                            <div key={index} className={cx('order-item-wrapper')}>
                                                <Image src={item.image} className={cx('order-item-img')} />
                                                <div className={cx('order-item-info')}>
                                                    <div className={cx('order-item-name')}>
                                                        {item.name}({item.size ? 'L' : 'M'}) x{item.quantityProduct}
                                                    </div>
                                                    <div className={cx('order-item-topping')}>
                                                        Topping :{' '}
                                                        {item.listTopping.map((topping) => topping.name).join(', ') ||
                                                            'Không'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className={cx('empty-order-wrapper')}>
                                    <Image src={images.emptyCart} className={cx('empty-order-img')} />
                                    <div className={cx('empty-order-title')}>Không có đơn hàng nào</div>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default IngredientPage;
