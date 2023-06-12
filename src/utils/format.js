import dayjs from 'dayjs';

export function priceFormat(number) {
    return (
        typeof number === 'number' &&
        number
            .toFixed(3)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
}
export const timeGap = (date) => {
    const today = dayjs();
    const pastDate = dayjs(date);
    const timeDiff = today.diff(pastDate, 'minutes');
    if (timeDiff < 1) {
        return 'mới đây';
    } else if (timeDiff < 60) {
        return `${timeDiff} phút trước`;
    } else if (timeDiff / 60 < 24) {
        return `${Math.floor(timeDiff / 60)} giờ trước `;
    } else {
        return `${Math.floor(timeDiff / 60 / 24)} ngày trước `;
    }
};
