import styles from './AdminMenuPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';
import { StoreContext, actions } from '../../store';
import LocalStorageManager from '../../utils/LocalStorageManager';
import Tippy from '@tippyjs/react';
import RecipeItem from './RecipeItem';
import { RiAddCircleFill } from 'react-icons/ri';
import { GiCoffeeBeans } from 'react-icons/gi';
import { TbPaperBag } from 'react-icons/tb';
import { SiBuymeacoffee, SiCakephp } from 'react-icons/si';
import RecipeForm from './RecipeForm';
const cx = classNames.bind(styles);

function AdminMenuPage() {
    const [loading, setLoading] = useState();
    const [menuType1, setMenuType1] = useState([]);
    const [menuType2, setMenuType2] = useState([]);
    const [menuType3, setMenuType3] = useState([]);
    const [menuType4, setMenuType4] = useState([]);
    const [allTopping, setAllTopping] = useState();
    const [showEditForm, setShowEditForm] = useState();
    const [selectedRecipe, setSelectedRecipe] = useState();
    const localStorageManage = LocalStorageManager.getInstance();
    const getMenuDataByType = async (idType) => {
        const token = localStorageManage.getItem('token');
        if (token) {
            setLoading(true);
            const results = await adminService.getAllRecipe(idType, token);
            if (results && results.isSuccess) {
                idType === 1
                    ? setMenuType1(results.listRecipes)
                    : idType === 2
                    ? setMenuType2(results.listRecipes)
                    : idType === 3
                    ? setMenuType3(results.listRecipes)
                    : setMenuType4(results.listRecipes);
            }
            setLoading(false);
        }
    };
    useEffect(() => {
        getMenuDataByType(1);
        getMenuDataByType(2);
        getMenuDataByType(3);
        getMenuDataByType(4);
    }, []);
    const getListToppingByType = async () => {
        const results = await adminService.getListToppingByType();
        if (results && results.isSuccess) {
            setAllTopping(results.listType);
        }
    };
    useEffect(() => {
        getListToppingByType();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {showEditForm && (
                <RecipeForm
                    idRecipe={selectedRecipe.idRecipe}
                    onCloseModal={(updated) => {
                        if (updated) {
                            getMenuDataByType(1);
                            getMenuDataByType(2);
                            getMenuDataByType(3);
                            getMenuDataByType(4);
                        }
                        setShowEditForm(false);
                        setSelectedRecipe(false);
                    }}
                />
            )}
            {loading ? (
                <div className={cx('loader')}>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                <Row>
                    <Col md={6}>
                        <ContentWrapper
                            idType={1}
                            titleIcon={<SiBuymeacoffee className={cx('icon')} />}
                            topping={allTopping && allTopping.find((type) => type.idType === 1).listToppings}
                            menu={menuType1}
                            title="Thức uống"
                            onShowEditForm={(data) => {
                                setShowEditForm(true);
                                setSelectedRecipe(data);
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <ContentWrapper
                            idType={2}
                            titleIcon={<GiCoffeeBeans className={cx('icon')} />}
                            topping={allTopping && allTopping.find((type) => type.idType === 2).listToppings}
                            menu={menuType2}
                            title="Cà phê"
                            onShowEditForm={(data) => {
                                setShowEditForm(true);
                                setSelectedRecipe(data);
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <ContentWrapper
                            idType={3}
                            titleIcon={<TbPaperBag className={cx('icon')} />}
                            topping={allTopping && allTopping.find((type) => type.idType === 3).listToppings}
                            menu={menuType3}
                            title="Trà túi"
                            onShowEditForm={(data) => {
                                setShowEditForm(true);
                                setSelectedRecipe(data);
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <ContentWrapper
                            idType={4}
                            titleIcon={<SiCakephp className={cx('icon')} />}
                            topping={allTopping && allTopping.find((type) => type.idType === 4).listToppings}
                            menu={menuType4}
                            title="Bakery"
                            onShowEditForm={(data) => {
                                setShowEditForm(true);
                                setSelectedRecipe(data);
                            }}
                        />
                    </Col>
                </Row>
            )}
        </div>
    );
}
function ContentWrapper({ title, titleIcon, menu, topping, onShowEditForm, idType, onUpdateRecipe = () => {} }) {
    const [tab, setTab] = useState(0);

    return (
        <div className={cx('content-wrapper')}>
            <div className={cx('content-header')}>
                <div className={cx('content-title')}>
                    {/* <HiDocumentMinus className={cx('icon', 'warning')} /> */}
                    <div className={cx('content-tab', { active: tab === 0 })} onClick={() => setTab(0)}>
                        {titleIcon}
                        {title}
                    </div>
                    <div className={cx('content-tab', 'extra', { active: tab === 1 })} onClick={() => setTab(1)}>
                        Topping
                    </div>
                </div>
                <div className={cx('content-subtitle')}>
                    {tab === 0 ? menu && menu.length : topping && topping.length} món
                    <div onClick={() => onShowEditForm(true)} className={cx('icon')}>
                        <RiAddCircleFill />
                    </div>
                </div>
            </div>
            <div className={cx('content-body')}>
                <div className={cx('content-pane', { active: tab === 0 })}>
                    {menu && menu.length !== 0 ? (
                        menu.map((item, index) => (
                            <RecipeItem
                                data={item}
                                key={index}
                                onClickEditRecipe={() => {
                                    onShowEditForm(item);
                                }}
                            />
                        ))
                    ) : (
                        <div className={cx('empty-order-wrapper')}>
                            <Image src={images.emptyCart} className={cx('empty-order-img')} />
                            <div className={cx('empty-order-title')}>Chưa có món nào</div>
                        </div>
                    )}
                </div>
                <div className={cx('content-pane', { active: tab === 1 })}>
                    {topping && topping.length !== 0 ? (
                        topping.map((item, index) => (
                            <RecipeItem
                                data={item}
                                key={index}
                                onClickEditRecipe={() => {
                                    onShowEditForm(item);
                                }}
                            />
                        ))
                    ) : (
                        <div className={cx('empty-order-wrapper')}>
                            <Image src={images.emptyCart} className={cx('empty-order-img')} />
                            <div className={cx('empty-order-title')}>Chưa có món nào</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminMenuPage;
