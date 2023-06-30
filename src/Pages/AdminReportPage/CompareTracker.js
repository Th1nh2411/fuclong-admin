import styles from './AdminReportPage.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';
import { formatNumber } from '../../utils/format';
import LocalStorageManager from '../../utils/LocalStorageManager';
import * as adminService from '../../services/adminService';
Chart.register(...registerables);

const cx = classNames.bind(styles);
const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CompareTracker = ({ className }) => {
    const [reportAllShop, setReportAllShop] = useState([]);
    const localStorageManager = LocalStorageManager.getInstance();
    const getIngredientReport = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const listShopResults = await adminService.getListShop(token);
            if (listShopResults) {
                for (let i = 0; i < listShopResults.listShops.length; i++) {
                    const results = await adminService.getDataForChartByShop(
                        listShopResults.listShops[i].idShop,
                        token,
                    );
                    if (results) {
                        const shopReport = results.listTotalAndTotalAmountImport;
                        setReportAllShop((prev) => [...prev, shopReport]);
                    }
                }
            }
        }
    };
    useEffect(() => {
        getIngredientReport();
    }, []);
    const labels = useMemo(() => {
        const listMonths =
            reportAllShop && reportAllShop[1] && reportAllShop[1].map((item, index) => months[item.month]);
        return listMonths;
    }, [reportAllShop]); //['January', 'February', 'March', 'April', 'May', 'June', 'July']
    const data = useMemo(() => {
        return {
            labels,
            datasets:
                reportAllShop &&
                reportAllShop.map((shop, index) => {
                    return {
                        // fill: true,
                        label: `shop ${index}`,
                        data: shop && shop.map((month) => month.total),
                        borderColor: '#4e72c780',
                        backgroundColor: '#4e72c780',
                        color: 'black',
                        fontSize: '16px',
                    };
                }),
        };
    }, [labels]);
    const options = {
        // responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'black',
                    font: {
                        size: 16,
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: 'black',
                    // padding: 10,
                    font: { size: 16 },
                    // autoSkipPadding: 10,
                    //  stepSize: 10
                    callback: function (value, index, ticks) {
                        return formatNumber(value);
                    },
                },
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: { color: 'black', padding: 10, font: { size: 16 } },
                grid: {
                    display: false,
                },
            },
        },
    };
    return (
        <div className={cx('chart-wrapper', className)}>
            {reportAllShop && <Line height={450} data={data} options={options} />}
        </div>
    );
};

export default CompareTracker;
