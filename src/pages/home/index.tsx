import { Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';

import ScholarshipCard from '@/components/client/card/scholarship.card';
import BackGroundImg from '@/components/client/card/background.card';
import Introduce from '@/components/client/card/introduce.card';
import ProviderCard from '@/components/client/card/provider.card';

const HomePage = () => {
    return (
        <div>
        <div style={{paddingTop:'30px'}}>
            <BackGroundImg />
            <Introduce />
        </div>
        <div className={`${styles["container"]} ${styles["home-section"]}`}>
            {/* <div className="search-content" style={{ marginTop: 20 }}>
                <SearchClient />
            </div> */}
            <ProviderCard />
            <div style={{ margin: 50 }}></div>
            <Divider />
            <ScholarshipCard />
        </div>
    </div>
    )
}

export default HomePage;