import { callFetchProvider } from '@/config/api';
import { convertSlug } from '@/config/utils';
import { IProvider } from '@/types/backend';
import { Card, Col, Divider, Empty, Pagination, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'styles/client.module.scss';

interface IProps {
    showPagination?: boolean;
}

const ProviderCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayProvider, setDisplayProvider] = useState<IProvider[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    // const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProvider();
    }, [current, pageSize, filter]);

    const fetchProvider = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }

        const res = await callFetchProvider(query);
        if (res && res.data) {
            setDisplayProvider(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }


    const handleOnchangePage = (pagination: { current: number, pageSize: number }) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
    }

    const handleViewDetailJob = (item: IProvider) => {
        if (item.name) {
            const slug = convertSlug(item.name);
            navigate(`/Provider/${slug}?id=${item._id}`)
        }
    }

    return (
        <div className={`${styles["Provider-section"]}`}>
            <div className={styles["Provider-content"]}>
                <Spin spinning={isLoading} tip="Loading...">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className={isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]}>
                                <span className={styles["title"]}>Nhà Tuyển Dụng Hàng Đầu</span>
                                {!showPagination &&
                                    <Link to="Provider">Xem tất cả</Link>
                                }
                            </div>
                        </Col>

                        {displayProvider?.map(item => {
                            return (
                                <Col span={25} md={5} key={item._id}>
                                    
                                    <Card
                                        onClick={() => handleViewDetailJob(item)}
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
                    {showPagination && <>
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
                    </>}
                </Spin>
            </div>
        </div>
    )
}

export default ProviderCard;