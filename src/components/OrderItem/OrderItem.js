import styles from './OrderItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import { Col, Form } from 'react-bootstrap';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import LocalStorageManager from '../../utils/LocalStorageManager';
import * as menuService from '../../services/menuService';
import Tippy from '@tippyjs/react';
import { AiFillEdit } from 'react-icons/ai';
import { priceFormat } from '../../utils/format';
import { StoreContext, actions } from '../../store';

const cx = classNames.bind(styles);

function OrderItem({ data = {} }) {
    const { Recipe, discount, isActive } = data;
    const [active, setActive] = useState(isActive);
    const [showEditForm, setShowEditForm] = useState();
    const [nameValue, setNameValue] = useState(Recipe.name);
    const [priceValue, setPriceValue] = useState(Recipe.price);
    const [discountValue, setDiscountValue] = useState(100 - discount);
    const [valueChange, setValueChange] = useState(false);
    const [state, dispatch] = useContext(StoreContext);
    const localStorageManage = LocalStorageManager.getInstance();
    const userRole = localStorageManage.getItem('userInfo').role;
    const editMenuItem = async (activeValue = active) => {
        const token = localStorageManage.getItem('token');
        if (token) {
            const results = await menuService.editMenuItem(Recipe.idRecipe, activeValue, 100 - discountValue, token);
        }
    };
    const onlyNumber = (input) => {
        console.log(input);
        var regex = /^(\d+(\.\d*)?|)$/;
        return regex.test(input);
    };
    const handleCheckBoxActive = (e) => {
        if (e.target.checked) {
            setActive(true);
            editMenuItem(true);
        } else {
            setActive(false);
            editMenuItem(false);
        }
    };
    const handleCancelEdit = () => {
        setNameValue(Recipe.name);
        setPriceValue(Recipe.price);
        setDiscountValue(100 - discount);
    };
    const handleClickConfirm = () => {
        editMenuItem();
        dispatch(actions.setToast({ show: true, title: 'Sửa món', content: 'Sửa món thành cống' }));
        setShowEditForm(false);
    };
    useEffect(() => {
        if (
            Recipe.name !== nameValue ||
            Recipe.price !== Number(priceValue) ||
            100 - discount !== Number(discountValue)
        ) {
            setValueChange(true);
        } else {
            setValueChange(false);
        }
    }, [nameValue, priceValue, discountValue]);
    return (
        <>
            {showEditForm && (
                <Modal handleClickOutside={() => setShowEditForm(false)} className={cx('edit-form-wrapper')}>
                    <div className={cx('form-header')}></div>
                    <div className={cx('form-body')}>
                        <div className={cx('form-img-wrapper')}>
                            <Image src={Recipe.image} className={cx('form-img')} />
                        </div>
                        <div className={cx('form-info')}>
                            <Input
                                disable={userRole !== 3}
                                onChange={(event) => {
                                    setNameValue(event.target.value);
                                    setValueChange(true);
                                }}
                                value={nameValue}
                                title="Tên món"
                                type="text"
                            />
                            <div className={cx('item-price-wrapper')}>
                                <Input
                                    disable={userRole !== 3}
                                    className={cx('price-input')}
                                    onChange={(event) => {
                                        if (onlyNumber(event.target.value)) {
                                            setPriceValue(event.target.value);
                                            setValueChange(true);
                                        }
                                    }}
                                    value={priceValue}
                                    unit=".000 vnđ"
                                    title="Giá món"
                                    type="text"
                                />
                                <Input
                                    className={cx('price-input')}
                                    onChange={(event) => {
                                        if (onlyNumber(event.target.value)) {
                                            setDiscountValue(event.target.value);
                                            setValueChange(true);
                                        }
                                    }}
                                    value={discountValue.toString()}
                                    unit="%"
                                    title="Discount"
                                    type="text"
                                />
                            </div>
                            <div className={cx('form-actions')}>
                                {valueChange && <Button onClick={handleCancelEdit}>Hủy</Button>}
                                <Button
                                    onClick={handleClickConfirm}
                                    className={cx('confirm-btn')}
                                    primary
                                    disable={!valueChange}
                                >
                                    Thay đổi
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            <div className={cx('order-item', { inactive: !active })}>
                {discountValue !== 0 && <div className={cx('sale-off')}>-{discountValue}%</div>}
                <div className={cx('order-content')}>
                    <div className={cx('order-img-wrapper')}>
                        <Image src={Recipe.image} className={cx('order-img')} />
                    </div>
                    <div className={cx('order-info')}>
                        <div className={cx('order-name')}>{Recipe.name}</div>
                        <div className={cx('order-price')}>{Recipe.price}.000đ</div>
                    </div>
                </div>
                <div className={cx('order-actions')}>
                    <Tippy content={active ? 'Ngưng bán' : 'Mở bán'} placement="bottom" duration={0}>
                        <Form.Check
                            className={cx('policy-check')}
                            checked={active}
                            type="checkbox"
                            isValid
                            onChange={(e) => handleCheckBoxActive(e)}
                            disabled={userRole < 2}
                        />
                    </Tippy>
                    <Tippy content="Chỉnh sửa" placement="bottom" duration={0}>
                        <div
                            onClick={() => {
                                if (userRole < 2) {
                                    alert('You are not authorized');
                                } else {
                                    setShowEditForm(true);
                                }
                            }}
                            className={cx('order-edit')}
                        >
                            <AiFillEdit />
                        </div>
                    </Tippy>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
