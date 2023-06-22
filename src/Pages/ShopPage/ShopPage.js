import styles from './ShopPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import images from '../../assets/images';
import { Col, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import LocalStorageManager from '../../utils/LocalStorageManager';
import * as shopService from '../../services/shopService';
import { BsShop } from 'react-icons/bs';
import { RiImageAddFill } from 'react-icons/ri';
import { IoPeopleSharp } from 'react-icons/io5';
import Tippy from '@tippyjs/react';
import Button from '../../components/Button/Button';
const cx = classNames.bind(styles);

function ShopPage() {
    const [loading, setLoading] = useState();
    const [shopInfo, setShopInfo] = useState();
    const [listStaff, setListStaff] = useState();
    const [active, setActive] = useState();
    const [imageValue, setImageValue] = useState('');
    const [showEditForm, setShowEditForm] = useState();

    const localStorageManager = LocalStorageManager.getInstance();
    const userRole = localStorageManager.getItem('userInfo').role;
    const [state, dispatch] = useContext(StoreContext);
    const getShopInfo = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            setLoading(true);
            const results = await shopService.getInfoShop(token);
            if (results) {
                setShopInfo(results.shop);
                setActive(results.shop.isActive);
            }
            setLoading(false);
        }
    };
    const getListStaff = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            setLoading(true);
            const results = await shopService.getListStaff(token);
            if (results) {
                setListStaff(results.listStaffs);
            }
            setLoading(false);
        }
    };
    const editShopInfo = async (isActive = shopInfo.isActive, image = shopInfo.image) => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await shopService.editInfoShop(image, isActive, token);
            if (results && results.isSuccess) {
                setActive(isActive);
                dispatch(
                    actions.setToast({
                        show: true,
                        content: 'Cập nhật thông tin cửa hàng thành công',
                        title: 'Thành công',
                    }),
                );
            }
        }
    };
    useEffect(() => {
        getShopInfo();
        getListStaff();
    }, []);
    const handleCheckBoxActive = (e) => {
        if (e.target.checked) {
            editShopInfo(true);
        } else {
            editShopInfo(false);
        }
    };
    const handleSubmitEdit = () => {
        if (userRole > 1) {
            editShopInfo(active, imageValue);
            setShowEditForm(false);
            setShopInfo({ ...shopInfo, image: imageValue });
        }
    };
    return (
        <div className={cx('wrapper')}>
            {showEditForm && (
                <Modal className={cx('edit-form-wrapper')} handleClickOutside={() => setShowEditForm(false)}>
                    <div className={cx('edit-form-title')}>Cập nhật thông tin cửa hàng</div>
                    <form onSubmit={handleSubmitEdit} className={cx('form-body')}>
                        <Input
                            onChange={(event) => {
                                setImageValue(event.target.value);
                            }}
                            value={imageValue}
                            title="Nhập đường dẫn ảnh"
                        />
                        <Button className={cx('custom-btn')} primary type="submit">
                            Cập nhật
                        </Button>
                    </form>
                </Modal>
            )}
            {loading ? (
                <div className={cx('loader')}>
                    <span />
                    <span />
                </div>
            ) : (
                <Row>
                    <Col>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content-header')}>
                                <div className={cx('content-title')}>
                                    <BsShop className={cx('icon', 'warning')} />
                                    Thông tin cửa hàng
                                </div>
                                <div className={cx('content-subtitle')}></div>
                            </div>
                            <div className={cx('content-body')}>
                                {shopInfo && (
                                    <div className={cx('shop-wrapper')}>
                                        <div className={cx('shop-img-wrapper')}>
                                            <Image src={shopInfo.image} className={cx('shop-img')} />
                                            <RiImageAddFill
                                                onClick={() => setShowEditForm(true)}
                                                className={cx('update-img-btn', { disable: userRole < 2 })}
                                            />
                                        </div>
                                        <div className={cx('shop-address')}>
                                            <span>Địa chỉ :</span> {shopInfo.address}
                                        </div>
                                        <div className={cx('shop-status')}>
                                            <span>Trạng thái :</span>
                                            <Tippy
                                                content={active ? 'Ngưng bán' : 'Mở bán'}
                                                placement="bottom"
                                                duration={0}
                                            >
                                                <Form.Check
                                                    className={cx('shop-active-check')}
                                                    checked={active}
                                                    type="checkbox"
                                                    isValid
                                                    onChange={(e) => handleCheckBoxActive(e)}
                                                    disabled={userRole < 2}
                                                />
                                            </Tippy>
                                            {active ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content-header')}>
                                <div className={cx('content-title')}>
                                    <IoPeopleSharp className={cx('icon')} />
                                    Danh sách nhân viên của quán
                                </div>
                                <div className={cx('content-subtitle')}></div>
                            </div>
                            <div className={cx('content-body')}>
                                <table className={cx('staff-table')}>
                                    <thead>
                                        <tr>
                                            <th>Họ và tên</th>
                                            <th className={cx('text-center')}>Chức danh</th>
                                            <th className={cx('staff-phone')}>Số điện thoại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listStaff &&
                                            listStaff.map((staff, index) => (
                                                <tr key={index} className={cx('staff-wrapper')}>
                                                    <td className={cx('staff-name')}>{staff.name}</td>
                                                    <td>
                                                        <div
                                                            className={cx('staff-role', {
                                                                blue: staff.role === 1,
                                                                yellow: staff.role === 2,
                                                            })}
                                                        >
                                                            {staff.role === 1
                                                                ? 'Nhân viên'
                                                                : staff.role === 2
                                                                ? 'Quản lý'
                                                                : 'Admin'}
                                                        </div>
                                                    </td>
                                                    <td className={cx('staff-phone')}>{staff.phone}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default ShopPage;
