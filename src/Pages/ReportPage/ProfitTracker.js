import styles from './ReportPage.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';
import { formatNumber } from '../../utils/format';
Chart.register(...registerables);

const cx = classNames.bind(styles);
// const allProfit = [500, 900, 1200, 1500.2, 1400.8, 1300, 1900.5];
const ProfitTracker = ({ className, allProfit, allImport }) => {
    const labels = useMemo(() => {
        const listMonths = allProfit && allProfit.map((item, index) => item.date);
        return listMonths;
    }, [allProfit]); //['January', 'February', 'March', 'April', 'May', 'June', 'July']
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Doanh thu',
                data: allProfit.map((item) => item.total),
                borderColor: '#f8a647',
                backgroundColor: '#f8a64780',
                color: 'black',
            },
            {
                fill: true,
                label: 'Phí nhập hàng',
                data: allImport.map((item) => item.total),
                borderColor: '#3e72c7',
                backgroundColor: '#3e72c780',
                color: 'black',
            },
        ],
    };
    const options = {
        // responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'black',
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
            {allProfit && <Line height={450} data={data} options={options} />}
        </div>
    );
};

export default ProfitTracker;
