import { Col, Row } from 'antd';
import styles from 'styles/client.module.scss';
// import CompanyCard from '@/components/client/card/provider.card';
import ProviderCard from '@/components/client/card/provider.card';


const ClientProviderPage = (props: any) => {
    return (
        <div className={styles["container"]} style={{ marginTop: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <ProviderCard
                        showPagination={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ClientProviderPage;