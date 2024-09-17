import {useState, useEffect } from 'react';
import { callFetchProvider } from '@/config/api';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import { Card,Select,Divider,Empty, Button, Row, Col, Pagination,message, Spin } from 'antd';
import { IProvider } from '@/types/backend';
import { Link, useNavigate } from 'react-router-dom';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { MonitorOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from 'styles/client.module.scss';
import { isMobile } from 'react-device-detect';

interface FormValues {
    skills: string[];
    location: string[];
}
interface IProps {
    showPagination?: boolean;
}

const MySearchComponent: React.FC = () => {
    const [form] = ProForm.useForm<FormValues>();
    const [displayProvider, setDisplayProvider] = useState<IProvider[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resultsdetail, setResults] = useState<any[]>([]); // Trạng thái để lưu kết quả
    const optionsSkills = SKILLS_LIST; // Thay thế bằng danh sách kỹ năng của bạn
    const optionsLocations = LOCATION_LIST; // Thay thế bằng danh sách địa điểm của bạn
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        fetchProvider();
    }, [current, pageSize, location]);

    const fetchProvider = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (location) {
            query += `&address=/${location}/i`; // Thay đổi ở đây để sử dụng location
        }

        const res = await callFetchProvider(query);
        if (res && res.data) {
            console.log("cccc",res);
            setDisplayProvider(res.data.result);
            
        }
        setIsLoading(false);
    };

    const onFinish = async (values: FormValues) => {
        console.log('Biểu mẫu đã được gửi với giá trị:', values);
        const { location } = values;
        if (!location || location.length === 0) {
            message.warning('Vui lòng chọn ít nhất một địa điểm.');
            return;
        }

        setLocation(location.join(',')); // Lưu các địa điểm đã chọn vào state
        await fetchProvider(); // Gọi lại fetchProvider sau khi cập nhật location
    };

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
                    <Col span={24}><h2>Tìm Kiểm Trường Đại Học</h2></Col>
                    <Col span={24} md={16}>
                        <ProFormItem name="skills">
                            <Select
                                mode="multiple"
                                allowClear
                                showArrow={false}
                                style={{ width: '100%' }}
                                placeholder={
                                    <>
                                        <MonitorOutlined /> Tìm tên trường...
                                    </>
                                }
                                optionLabelProp="label"
                                options={[]}
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
                                        <EnvironmentOutlined /> Địa điểm...
                                    </>
                                }
                                optionLabelProp="label"
                                options={LOCATION_LIST}
                            />
                        </ProFormItem>
                    </Col>
                    <Col span={12} md={4}>
                        <Button type='primary' onClick={() => {
                            console.log('Nút Search đã được nhấn');
                            form.submit();
                        }}>Search</Button>
                    </Col>
                </Row>
            </ProForm>

            <div style={{ marginTop: '20px' }}>
                <h3>Kết quả tìm kiếm:</h3>
                <h3>
                <div className={`${styles["Provider-section"]}`}>
            <div className={styles["Provider-content"]}>
                <Spin spinning={isLoading} tip="Loading...">
                    <Row gutter={[20, 20]}>
                        {displayProvider?.map(item => {
                            return (
                                <Col span={25} md={5} key={item._id}>
                                    
                                    <Card
                                        // onClick={() => handleViewDetailJob(item)}
                                        style={{ height: 350 ,position:'relative',display: 'flex', flexDirection: 'column',justifyContent: 'space-between'}}
                                        hoverable
                                        cover={
                                            <div className={styles["card-customize"]} >
                                                <img
                                                    alt="example"
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${item?.logo}`}
                                                    style={{width:'100%',height:'auto',objectFit:'cover'}}
                                                />
                                            </div>
                                        }
                                    >
                                        <Divider />
                                        <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                                    </Card>
                                </Col>
                            )
                        })}

                        {(!displayProvider || displayProvider && displayProvider.length === 0)
                            && !isLoading &&
                            <div className={styles["empty"]}>
                                <Empty description="Không có dữ liệu" />
                            </div>
                        }
                    </Row>
                    {/* {showPagination && <>
                        <div style={{ marginTop: 30 }}></div>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                current={current}
                                total={total}
                                pageSize={pageSize}
                                responsive
                                onChange={(p: number, s: number) => handleOnchangePage({ current: p, pageSize: s })}
                            />
                        </Row>
                    </>} */}
                </Spin>
            </div>
        </div>
                </h3>
            </div>
        </>
    );
};

export default MySearchComponent;