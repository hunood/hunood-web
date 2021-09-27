import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Layout, Modal, Result } from 'antd';
import { UserForm, User } from 'components/forms';
import { VerifyAssociationUserService, CreateAndAssociateUserService } from 'services/user';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import "./style.less"

const { Footer } = Layout;

const AddUser: FC = () => {
    React.useEffect(() => { return; });
    const history = useHistory();

    const [form] = Form.useForm();
    const { auth } = useContext(AuthContext);
    const [ehNovoUsuario, setEhNovoUsuario] = useState(false);
    const [exibirSucesso, setExibirSucesso] = useState(false);
    const [dadosUsuario, setDadosUsuario] = useState({} as User);

    const verifyAssociationUserService = new VerifyAssociationUserService().useAsHook();
    const createAndAssociateUserService = new CreateAndAssociateUserService().useAsHook();

    const onFinish = async (user: User) => {
        console.log(user);
        setDadosUsuario(user);
        if (ehNovoUsuario) {
            criarAssociacao();
        }
        else {
            verifyAssociationUserService.send({
                email: user.email || '',
                cpf: user.cpf,
                idEmpresa: auth.empresas[0].id
            });
        }
    }

    const criarAssociacao = () => {
        createAndAssociateUserService.send({ idEmpresa: auth.empresas[0].id, ...dadosUsuario });
    }

    createAndAssociateUserService.onSuccess(() => {
        setExibirSucesso(true);
    });

    verifyAssociationUserService.onSuccess(() => {
        const res = verifyAssociationUserService.response;

        if (!res?.cpfCadastrado && !res?.emailCadastrado) {
            setEhNovoUsuario(true);
        }
        else if (res.associadoNaEmpresa) {
            Modal.info({
                title: t("users:usuario-associado"),
                content: t("users:msg-usuario-associado"),
                okText: t("users:fechar")
            });

        }
        else if (res.associacao) {
            Modal.confirm({
                title: t("users:cpf-email-cadastrados"),
                content: t("users:msg-cpf-email-cadastrados"),
                okText: t("users:associar"),
                cancelText: t("users:cancelar"),
                onOk: criarAssociacao
            });
        }
        else if (res.cpfCadastrado && !res.emailCadastrado) {
            Modal.confirm({
                title: t("users:cpf-cadastrado"),
                content: t("users:msg-cpf-cadastrado"),
                okText: t("users:cadastrar-associar"),
                cancelText: t("users:cancelar"),
                onOk: criarAssociacao
            });
        }
        else if (res.cpfCadastrado && res.emailCadastrado) {
            Modal.info({
                title: t("users:email-cadastrado"),
                content: t("users:msg-email-cadastrado"),
                okText: t("users:fechar")
            });
        }
    });

    const resetarForm = () => {
        setEhNovoUsuario(false);
    };

    if (exibirSucesso) {
        return (
            <Result
                status="success"
                title={t("users:sucesso-associacao")}
                subTitle={t("users:sucesso-usuario-associado", { email: dadosUsuario.email })}
                extra={[
                    <Button type="primary" key="associar" onClick={() => setExibirSucesso(false)}>
                        {t("users:nova-associacao")}
                    </Button>,
                    <Button key="consultar" onClick={() => history.push('/users')}>
                        {t("users:consultar-lista-associados")}
                    </Button>
                ]}
            />
        )
    }

    return (
        <>
            <Form
                name="user"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <UserForm form={form} novoUsuario={ehNovoUsuario} />
                <Footer className="addUser-footer">
                    <Button type="primary" htmlType="submit" className="addUser-btn-add">
                        {t("users:associar")}
                    </Button>

                    {ehNovoUsuario &&
                        <Button htmlType="reset" className="addUser-btn-add" onClick={resetarForm}>
                            {t("users:resetar")}
                        </Button>
                    }
                </Footer>
            </Form>
        </>
    );

}
export default AddUser;