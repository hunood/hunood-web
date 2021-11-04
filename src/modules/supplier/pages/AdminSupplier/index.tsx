import React, { FC, useContext } from 'react';
import { FindByBusinessService } from 'services/supplier';
import { AuthContext } from 'assets/context/AuthContext';
import "./style.less";

const AdminSupplier: FC = () => {

    const { auth } = useContext(AuthContext);
    const findByBusinessService = new FindByBusinessService().useAsHook();

    React.useEffect(() => {
        findByBusinessService.send({ idEmpresa: auth.empresas[0].id });  // eslint-disable-next-line
    }, []);

    return (
        <>{"AdminSupplier"}</>
    );

}

export default AdminSupplier;