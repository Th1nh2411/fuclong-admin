import styles from './ReportPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import Calendar from '../../components/Calendar';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as reportService from '../../services/reportService';
import { StoreContext, actions } from '../../store';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { formatNumber, priceFormat, timeGap } from '../../utils/format';

import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import {
    DrinkIcon,
    FirstIcon,
    JellyIcon,
    ProfitIcon,
    RankingIcon,
    SecondIcon,
    ThirdIcon,
    TruckDeliveryIcon,
} from '../../components/Icons/Icons';
import { BsClipboardCheckFill } from 'react-icons/bs';
import OrderItem from '../../components/OrderItem';
const cx = classNames.bind(styles);

function ReportPage() {
    const [reports, setReports] = useState();
    const localStorageManager = LocalStorageManager.getInstance();
    const getReport = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await reportService.getReportByDate(dayjs().format('YYYY-MM-DD'), token);
            if (results) {
                setReports(results);
            }
        }
    };
    useEffect(() => {
        getReport();
    }, []);
    return (
        <>
            {reports && (
                <div className={cx('wrapper')}>
                    <Row>
                        <Col>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <ProfitIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Doanh thu</div>
                                        <div className={cx('report-num')}>{formatNumber(reports.total)}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <DrinkIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Sản phẩm bán ra</div>
                                        <div className={cx('report-num')}>{formatNumber(reports.countProducts)}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <JellyIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Topping sử dụng</div>
                                        <div className={cx('report-num')}>{formatNumber(reports.countToppings)} </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <TruckDeliveryIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Tổng số đơn hàng</div>
                                        <div className={cx('report-num')}>{formatNumber(reports.countInvoices)} </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('content-header')}>
                                    <div className={cx('content-title')}>
                                        <RankingIcon height="3rem" width="3rem" className={cx('icon')} />
                                        Top các món bán chạy
                                    </div>
                                    <div className={cx('content-subtitle')}></div>
                                </div>
                                <div className={cx('content-body')}>
                                    {reports.topNames &&
                                        reports.topNames.map((item, index) => (
                                            <div key={index} className={cx('product-content')}>
                                                {index === 0 ? (
                                                    <FirstIcon className={cx('ranking-icon')} />
                                                ) : index === 1 ? (
                                                    <SecondIcon className={cx('ranking-icon')} />
                                                ) : (
                                                    <ThirdIcon className={cx('ranking-icon')} />
                                                )}
                                                <div className={cx('product-img-wrapper')}>
                                                    <Image src={item.image} className={cx('product-img')} />
                                                </div>
                                                <div className={cx('product-info')}>
                                                    <div className={cx('product-name')}>{item.name}</div>
                                                    {item.price && (
                                                        <div className={cx('product-price')}>{item.price}.000đ</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default ReportPage;
