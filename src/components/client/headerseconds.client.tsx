import { useState, useEffect } from 'react';
import { CodeOutlined, ContactsOutlined, DashOutlined, LogoutOutlined, MenuFoldOutlined, RiseOutlined, TwitterOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Dropdown, MenuProps, Space, message } from 'antd';
import { Menu, ConfigProvider } from 'antd';
import styles from '@/styles/client.module.scss';
import { isMobile } from 'react-device-detect';
import { FaReact } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { callLogout } from '@/config/api';
import { setLogoutAction } from '@/redux/slice/accountSlide';
import ManageAccount from './modal/manage.account';
import { text } from 'stream/consumers';

const Header = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    const user = useAppSelector(state => state.account.user);
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

    const [current, setCurrent] = useState('home');
    const location = useLocation();

    const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location])

    const items: MenuProps['items'] = [
        {
            label: (
                <>
                    <Link to={'/'}>Các bước để du học</Link>
                    <span style={{ margin: '0 8px' }}></span>
                </>
            ),
            key: '/event',

            // icon: <TwitterOutlined />,
        },
        {
            label: (
                <>
                    <Link to={'/event'}>Du Học</Link>
                    <span style={{ margin: '0 8px' }}></span>
                </>
            ),
            key: '/event',
            // icon: <TwitterOutlined />,
        },
        {
            label: (
                <>
                    <Link to={'/job'}>Tìm Khóa Học</Link>
                    <span style={{ margin: '0 8px' }}></span>
                </>
            ),
            key: '/job',
        },
        {
            label: <Link to={'/company'}>IELTS</Link>,
            key: '/company',
            icon: <RiseOutlined />,
        }
        ,
        {
            label: <Link to={'/company'}>Dịch Vụ Sinh Viên</Link>,
            key: '/company',
            icon: <RiseOutlined />,
        }
        ,
        {
            label: <Link to={'/company'}>Giới thiệu về SFMS</Link>,
            key: '/company',
            icon: <RiseOutlined />,
        }
    ];



    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const itemsDropdown = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenManageAccount(true)}
            >Quản lý tài khoản</label>,
            key: 'manage-account',
            icon: <ContactsOutlined />
        },
        {
            label: <Link
                to={"/admin"}
            >Trang Quản Trị</Link>,
            key: 'admin',
            icon: <DashOutlined />
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
            icon: <LogoutOutlined />
        },
    ];
    const itemsMobiles = [...items, ...itemsDropdown];

    return (
        <>

            <div className={styles["header-section2"]} style={{ display: 'flex', alignItems: 'center'}}>
                <div>
                        
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/logo/logo.jpg`} alt="Logo" style={{ width: '150px', height: '150px', paddingTop: '30px', paddingLeft: '30px' }} />
                </div>
                <div className={styles["container"]}>

                    {!isMobile ?
                        <div style={{ display: "flex", gap: 30 }}>
                            {/* <div className={styles['brand']} >
                                <FaReact onClick={() => navigate('/')} title='Hỏi Dân IT' />
                            </div> */}

                            <div className={styles['top-menu2']}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#fff',
                                            colorBgContainer: '#fff',
                                            colorText: '#000000',
                                            fontSize: 16,
                                            lineHeight: 2,
                                            fontFamily: '"BuenosAiresVN", sans-serif',
                                        },
                                    }}
                                >

                                    <Menu
                                        // onClick={onClick}
                                        selectedKeys={[current]}
                                        mode="horizontal"
                                        items={items}
                                    />
                                </ConfigProvider>
                            </div>

                        </div>

                        :
                        <div className={styles['header-mobile']}>
                            <span>Your APP</span>
                            <MenuFoldOutlined onClick={() => setOpenMobileMenu(true)} />
                        </div>
                    }
                </div>
                <div style={{ display: 'flex', paddingTop: '30px', marginRight: '150px' }}>
                    <button style={{ backgroundColor: 'rgb(214, 65, 5)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '108px', fontSize: 18, lineHeight: 1.5 }}>
                        Liên Hệ SFMS
                    </button>
                    <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '108px', display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 18 18" fill="none"><g id="Frame 1000004578"><path id="Icon" d="M16.7137 16.7137L11.5709 11.5709M13.2852 7.28516C13.2852 10.5989 10.5989 13.2852 7.28516 13.2852C3.97145 13.2852 1.28516 10.5989 1.28516 7.28516C1.28516 3.97145 3.97145 1.28516 7.28516 1.28516C10.5989 1.28516 13.2852 3.97145 13.2852 7.28516Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                    </button>
                </div>
            </div>
            <Drawer title="Chức năng"
                placement="right"
                onClose={() => setOpenMobileMenu(false)}
                open={openMobileMenu}
            >
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="vertical"
                    items={itemsMobiles}
                />
            </Drawer>
            <ManageAccount
                open={openMangeAccount}
                onClose={setOpenManageAccount}
            />
        </>
    )
};

export default Header;