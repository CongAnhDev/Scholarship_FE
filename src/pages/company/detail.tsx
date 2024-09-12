import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IProvider } from "@/types/backend";
import { callFetchProviderById } from "@/config/api";
import styles from 'styles/client.module.scss';
import parse from 'html-react-parser';
import { Col, Divider, Row, Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";


const ClientProviderDetailPage = (props: any) => {
    const [ProviderDetail, setProviderDetail] = useState<IProvider | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true)
                const res = await callFetchProviderById(id);
                if (res?.data) {
                    setProviderDetail(res.data)
                }
                setIsLoading(false)
            }
        }
        init();
    }, [id]);

    return (
        <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
            {isLoading ?
                <Skeleton />
                :
                <Row gutter={[20, 20]}>
                    {ProviderDetail && ProviderDetail._id &&
                        <>
                            <Col span={24} md={16}>
                                <div className={styles["header"]}>
                                    {ProviderDetail.name}
                                </div>

                                <div className={styles["location"]}>
                                    <EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{(ProviderDetail?.address)}
                                </div>

                                <Divider />
                                {parse(ProviderDetail?.description ?? "")}
                            </Col>

                            <Col span={24} md={8}>
                                <div className={styles["Provider"]}>
                                    <div>
                                        <img
                                            alt="example"
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${ProviderDetail?.logo}`}
                                        />
                                    </div>
                                    <div>
                                        {ProviderDetail?.name}
                                    </div>
                                </div>
                            </Col>
                        </>
                    }
                </Row>
            }
        </div>
    )
}
export default ClientProviderDetailPage;