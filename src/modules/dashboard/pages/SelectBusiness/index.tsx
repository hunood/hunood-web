import { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import { Card, Col, Row } from 'antd';
import { SimpleHeaderLayout } from 'components/layouts';
import { AuthContext } from 'assets/context/AuthContext';
import { Empresa } from 'services/authentication/AuthenticateService/interfaces/response';
import "./style.less";

const { Meta } = Card;

const SelectBusiness: FC = () => {
    const history = useHistory();

    const { auth, updateAuth } = useContext(AuthContext);
    const empresas = auth.empresas.slice().sort(dynamicSort('nomeFantasia'));

    const atualizarEmpresa = (empresa: Empresa) => {
        empresas.splice(empresas.indexOf(empresa), 1);
        empresas.unshift(empresa);
        updateAuth({ empresas });
        history.push('/dashboard');
    }

    function dynamicSort(property: string) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a: any, b: any) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };

    return (
        <SimpleHeaderLayout>
            <div className="site-card-wrapper" style={{ margin: 20 }}>
                <Row gutter={[24, 12]} >
                    {
                        empresas.map((empresa) => (
                            <Col span={12} key={empresa.id}>
                                <Card bordered={true}
                                    actions={[
                                        <p onClick={() => atualizarEmpresa(empresa)}>Entrar</p>
                                    ]}>
                                    <Meta
                                        title={empresa.nomeFantasia}
                                        description={empresa.tipoUsuario}
                                    />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </SimpleHeaderLayout>
    )
}

export default SelectBusiness;

