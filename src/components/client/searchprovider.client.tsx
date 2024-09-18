import {useState, useEffect } from 'react';
import { callFetchProvider, callfetchOptions } from '@/config/api';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import { Card,Select,Divider,Empty, Button, Row, Col, Pagination,message, Spin } from 'antd';
import { IProvider } from '@/types/backend';
import { Link, useNavigate } from 'react-router-dom';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { MonitorOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from 'styles/client.module.scss';
import { convertSlug } from '@/config/utils';

interface ProviderData {
    city: string;
    name: string;
}

interface FormValues {
    location: string[];
    name: string[];
}

const MySearchComponent: React.FC = () => {
    const [form] = ProForm.useForm<FormValues>();
    const [displayProvider, setDisplayProvider] = useState<IProvider[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [locationOptions, setLocationOptions] = useState<{ label: string; value: string }[]>([]);
    const [nameOptions, setNameOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [selectedName, setSelectedName] = useState<string>("");
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await callfetchOptions();
                if (res && Array.isArray(res.data)) {
                    const cities = [...new Set(res.data.map((item: ProviderData) => item.city))].map(city => ({ label: city, value: city }));
                    const names = res.data.map((item: ProviderData) => ({ label: item.name, value: item.name }));
                    setNameOptions(names);
                    setLocationOptions(cities);
                }

            } catch (error) {
                message.error('Failed to load options');
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        if (shouldFetch) {
            fetchProvider();
            setShouldFetch(false); // Reset after calling
            
        }
    }, [shouldFetch, current]);

    const fetchProvider = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=5`; // Assuming pageSize is fixed at 5
        if (selectedLocation) {
            query += `&city=/${selectedLocation}/i`;
        }
        if (selectedName) {
            query += `&name=/${selectedName}/i`;
        }
        const res = await callFetchProvider(query);
        if (res && res.data) {
            console.log("Response Data: ", res);
            setDisplayProvider(res.data.result);
        }
        setIsLoading(false);
    };

    const onFinish = async (values: FormValues) => {
        const { location, name } = values;
        if ((!location || location.length === 0) && (!name || name.length === 0)) {
            message.warning('Please select at least one location and one name.');
            return;
        }
        setSelectedLocation(location ? location.join(',') : ''); // Lưu trữ vị trí đã chọn
        setSelectedName(name ? name.join(',') : ''); // Store selected names
        setShouldFetch(true); // Trigger fetch
        setIsResultsVisible(true);
    };
    const handleViewDetailJob = (item: IProvider) => {
        if (item.name) {
            const slug = convertSlug(item.name);
            navigate(`/Provider/${slug}?id=${item._id}`)
        }
    }
    return (
        <>
<ProForm
                form={form}
                onFinish={onFinish}
                submitter={{
                    render: () => <></>
                }}
            >
                <Row gutter={[20, 20]}>
                    <Col span={24}><h2>Search University</h2></Col>
                    <Col span={24} md={16}>
                        <ProFormItem name="name">
                            <Select
                                mode="multiple"
                                allowClear
                                showArrow={false}
                                style={{ width: '100%' }}
                                placeholder={
                                    <>
                                        <MonitorOutlined /> Search school name...
                                    </>
                                }
                                optionLabelProp="label"
                                options={nameOptions} // Populate this with available names
                            />
                        </ProFormItem>
                    </Col>
                    <Col span={12} md={4}>
                        <ProFormItem name="location">
                            <Select
                                mode="multiple"
                                allowClear
                                showArrow={false}
                                style={{ width: '100%' }}
                                placeholder={
                                    <>
                                        <EnvironmentOutlined /> Location...
                                    </>
                                }
                                optionLabelProp="label"
                                options={locationOptions}
                            />
                        </ProFormItem>
                    </Col>
                    <Col span={12} md={4}>
                        <Button type='primary' onClick={() => {
                            form.submit();
                        }}>Search</Button>
                    </Col>
                </Row>
            </ProForm>
{isResultsVisible && (
<div style={{ marginTop: '20px' }}>
    <h3>Kết quả tìm kiếm:</h3>
    <h3>
    <div className={`${styles["Provider-section"]}`}>
    <Spin spinning={isLoading} tip="Loading...">
        <Row gutter={[20, 20]}>
            {displayProvider && displayProvider.length > 0 ? (
                displayProvider.map(item => (
                    <Col span={25} md={5} key={item._id}>
                        <Card
                            style={{ height: 250, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                            hoverable
                            onClick={() => handleViewDetailJob(item)}
                            cover={
                                <div className={styles["card-customize"]}>
                                    <img
                                        alt="example"
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${item?.logo}`}
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                    />
                                </div>
                            }
                        >
                            <Divider />
                            <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                        </Card>
                    </Col>
                ))
            ) : null}
        </Row>
    </Spin>
    
    {/* Hiển thị phần empty bên ngoài Provider-content */}
    {!isLoading && displayProvider && displayProvider.length === 0 && (
        <div className={styles["empty"]} style={{
            display: 'flex',
            justifyContent: 'center', // Căn giữa theo chiều ngang
            alignItems: 'center', // Căn giữa theo chiều dọc
            height: '100%', // Đảm bảo chiều cao là 100% của phần chứa
            textAlign: 'center'
        }}>
            <Empty description="Không có dữ liệu" />
        </div>
    )}
</div>
                </h3>
            </div>
)}
        </>
    );
};

export default MySearchComponent;