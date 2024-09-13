import { callFetchScholarship } from '@/config/api';
import { LOCATION_LIST, convertSlug, getLocationName } from '@/config/utils';
import { IScholarship } from '@/types/backend';
import { EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Col, Empty, Pagination, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'styles/client.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

interface IProps {
    showPagination?: boolean;
}

const ScholarshipCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayScholarship, setDisplayScholarship] = useState<IScholarship[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchScholarship();
    }, [current, pageSize, filter, sortQuery]);

    const fetchScholarship = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}&populate=provider&fields=provider._id, provider.name,provider.logo`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchScholarship(query);
        if (res && res.data) {
            setDisplayScholarship(res.data.result);
            console.log("setdisplay",res.data);
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

    const handleViewDetailScholarship = (item: IScholarship) => {
        const slug = convertSlug(item.name);
        
        navigate(`/Scholarship/${slug}?id=${item._id}`)
    }

    return (
        <div className={`${styles["card-Scholarship-section"]}`}>
            <div className={`${styles["Scholarship-content"]}`}>
                <Spin spinning={isLoading} tip="Loading...">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className={isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]}>
                                <span className={styles["title"]}>Học Bổng Mới Nhất</span>
                                {!showPagination &&
                                    <Link to="Scholarship">Xem tất cả</Link>
                                }
                            </div>
                        </Col>

                        {displayScholarship?.map(item => {
                            return (
                                <Col span={24} md={12} key={item._id}>
                                    <Card size="small" title={null} hoverable
                                        onClick={() => handleViewDetailScholarship(item)}
                                    >
                                        <div className={styles["card-Scholarship-content"]}>
                                            <div className={styles["card-Scholarship-left"]}>
                                                <img
                                                    alt="example"
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${item?.provider?.logo}`}
                                                    style={{width:'70px',height:'70px'}}
                                                />
                                            </div>
                                            <div className={styles["card-Scholarship-right"]}>
                                                <div className={styles["Scholarship-title"]} style={{fontWeight:600}}>{item.name}</div>
                                                <div className={styles["Scholarship-location"]}><EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{(item.location)}</div>
                                                <div><ThunderboltOutlined style={{ color: 'orange' }} />&nbsp;{(item.level + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                <div className={styles["Scholarship-updatedAt"]}>{dayjs(item.updatedAt).fromNow()}</div>
                                            </div>
                                        </div>

                                    </Card>
                                </Col>
                            )
                        })}


                        {(!displayScholarship || displayScholarship && displayScholarship.length === 0)
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

export default ScholarshipCard;