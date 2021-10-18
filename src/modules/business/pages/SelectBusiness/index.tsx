import { FC, useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { Card, Col, Row } from 'antd';
import { SimpleHeaderLayout } from 'components/layouts';
import { AuthContext } from 'assets/context/AuthContext';
import { FindByUserService } from 'services/business';
import { UsuarioEmpresa } from 'services/business/FindByUserService/interfaces/response';
import { t } from 'i18n';
import "./style.less";

const { Meta } = Card;

const SelectBusiness: FC = () => {
    const history = useHistory();

    const { auth, updateAuth } = useContext(AuthContext);
    const findByUserService = new FindByUserService().useAsHook();
    const [empresas, setEmpresas] = useState<UsuarioEmpresa[]>([])
    
    useEffect(() => {
        findByUserService.send({ idAutenticacao: auth.id }); // eslint-disable-next-line
    }, []);

    findByUserService.onSuccess(() => {
        const emp = findByUserService.response?.empresas || [];
        emp.sort(dynamicSort('nomeFantasia'));
        setEmpresas(emp);
    });

    const atualizarEmpresa = (empresa: UsuarioEmpresa) => {
        const novaOrdem = auth.empresas.slice();
        const index = novaOrdem.findIndex(emp => emp.id === empresa.id);
        novaOrdem.unshift(novaOrdem.splice(index, 1)[0]);
        updateAuth({ empresas: novaOrdem });
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
                            <Col span={12} sm={12} xs={24} key={empresa.id}>
                                <Card bordered={true}
                                    actions={[
                                        <p onClick={() => atualizarEmpresa(empresa)}>{t('business:select-business.entrar')}</p>
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

