import React, { FC, useContext } from 'react';
import { Empty } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import "./style.less";

const Dashboard: FC = () => {
    const { auth } = useContext(AuthContext);
    // const [nomeEmpresa, setNomeEmpresa] = React.useState(auth2().empresas[0].nomeFantasia);
    React.useEffect(() => { 
        // setNomeEmpresa(auth2().empresas[0].nomeFantasia);
        
    },[]);
    
    console.log(auth);

    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={auth.empresas[0].nomeFantasia}

        />
    );

}
export default Dashboard;