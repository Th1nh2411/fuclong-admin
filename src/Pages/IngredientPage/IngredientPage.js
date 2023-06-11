import styles from './IngredientPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as shopService from '../../services/shopService';
import { StoreContext, actions } from '../../store';
const cx = classNames.bind(styles);

function IngredientPage() {
    return <div className={cx('wrapper')}>IngredientPage page</div>;
}

export default IngredientPage;
