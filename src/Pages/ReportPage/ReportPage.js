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
    ChartIcon,
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
import ProfitTracker from './ProfitTracker';
const cx = classNames.bind(styles);

function ReportPage() {
    const [reports, setReports] = useState();
    const [allProfit, setAllProfit] = useState([]);
    const [allImport, setAllImport] = useState([]);
    const [loading, setLoading] = useState(false);
    const localStorageManager = LocalStorageManager.getInstance();
    const getReport = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            setLoading(true);
            const results = await reportService.getReportByDate(dayjs().format('YYYY-MM-DD'), token, 5);
            if (results) {
                setReports(results);
                setAllProfit([{ total: results.total, date: dayjs().format('MMM') }]);
                setAllImport([{ total: results.totalAmountImport, date: dayjs().format('MMM') }]);
            }
            setLoading(false);
        }
    };
    const getPrevReport = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            for (let monthGap = 1; monthGap < 7; monthGap++) {
                const results = await reportService.getReportByDate(
                    dayjs().subtract(monthGap, 'month').format('YYYY-MM-DD'),
                    token,
                    0,
                );
                if (results) {
                    setAllProfit((prev) => [
                        { total: results.total, date: dayjs().subtract(monthGap, 'month').format('MMM') },
                        ...prev,
                    ]);
                    setAllImport((prev) => [
                        { total: results.totalAmountImport, date: dayjs().subtract(monthGap, 'month').format('MMM') },
                        ...prev,
                    ]);
                }
            }
        }
    };
    useEffect(() => {
        getReport();
        getPrevReport();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div className={cx('loader')}>
                    <span />
                    <span />
                </div>
            ) : (
                <>
                    <Row>
                        <Col md={6} xl={3}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <ProfitIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Doanh thu</div>
                                        <div className={cx('report-num')}>{formatNumber(reports && reports.total)}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} xl={3}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <DrinkIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Sản phẩm bán ra</div>
                                        <div className={cx('report-num')}>
                                            {formatNumber(reports && reports.countProducts)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} xl={3}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <JellyIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Topping dùng</div>
                                        <div className={cx('report-num')}>
                                            {formatNumber(reports && reports.countToppings)}{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} xl={3}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('report-wrapper')}>
                                    <TruckDeliveryIcon height="8rem" width="8rem" />
                                    <div className={cx('report-info')}>
                                        <div className={cx('report-title')}>Tổng đơn hàng</div>
                                        <div className={cx('report-num')}>
                                            {formatNumber(reports && reports.countInvoices)}{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('content-header')}>
                                    <div className={cx('content-title')}>
                                        <RankingIcon height="3rem" width="3rem" className={cx('icon')} />
                                        Các món bán chạy
                                    </div>
                                    <div className={cx('content-subtitle')}></div>
                                </div>
                                <div className={cx('content-body')}>
                                    {reports &&
                                        reports.topNames &&
                                        reports.topNames.map((item, index) => (
                                            <div key={index} className={cx('product-wrapper')}>
                                                <div className={cx('product-content')}>
                                                    {index === 0 ? (
                                                        <FirstIcon className={cx('ranking-icon')} />
                                                    ) : index === 1 ? (
                                                        <SecondIcon className={cx('ranking-icon')} />
                                                    ) : index === 2 ? (
                                                        <ThirdIcon className={cx('ranking-icon')} />
                                                    ) : (
                                                        <div className={cx('ranking-icon')}>{index + 1}. </div>
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
                                                <div className={cx('product-quantity')}>{item.count}sp</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('content-header')}>
                                    <div className={cx('content-title')}>
                                        <RankingIcon height="3rem" width="3rem" className={cx('icon')} />
                                        Các món bán chạy
                                    </div>
                                    <div className={cx('content-subtitle')}></div>
                                </div>
                                <div className={cx('content-body')}>
                                    {reports &&
                                        reports.topToppings &&
                                        reports.topToppings.map((item, index) => (
                                            <div key={index} className={cx('product-wrapper')}>
                                                <div className={cx('product-content')}>
                                                    {index === 0 ? (
                                                        <FirstIcon className={cx('ranking-icon')} />
                                                    ) : index === 1 ? (
                                                        <SecondIcon className={cx('ranking-icon')} />
                                                    ) : index === 2 ? (
                                                        <ThirdIcon className={cx('ranking-icon')} />
                                                    ) : (
                                                        <div className={cx('ranking-icon')}>{index + 1}. </div>
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
                                                <div className={cx('product-quantity')}>{item.count}sp</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('content-header')}>
                                    <div className={cx('content-title')}>
                                        <ChartIcon height="3rem" width="3rem" className={cx('icon')} />
                                        Biểu đồ lợi nhuận
                                    </div>
                                    <div className={cx('content-subtitle')}></div>
                                </div>
                                <div className={cx('content-body')}>
                                    <ProfitTracker allImport={allImport} allProfit={allProfit} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default ReportPage;
