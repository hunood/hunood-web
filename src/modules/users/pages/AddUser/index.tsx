import React, { FC, useContext, useState } from 'react';
import { Form, Button, Layout, Modal } from 'antd';
import { UserForm, User } from 'components/forms';
import { VerifyAssociationUserService, CreateAndAssociateUserService } from 'services/user';
import { AuthContext } from 'assets/context/AuthContext';
import "./style.less"

const { Footer } = Layout;

const AddUser: FC = () => {
    React.useEffect(() => { return; });

    const [form] = Form.useForm();
    const { auth } = useContext(AuthContext);
    const [ehNovoUsuario, setEhNovoUsuario] = useState(false);
    const [dadosUsuario, setDadosUsuario] = useState({} as User);
    
    const verifyAssociationUserService = new VerifyAssociationUserService().useAsHook();
    const createAndAssociateUserService = new CreateAndAssociateUserService().useAsHook();

    const onFinish = async (user: User) => {
        console.log(user);
        setDadosUsuario(user);
        if(ehNovoUsuario) {
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
        createAndAssociateUserService.send({ idEmpresa: auth.empresas[0].id, ...dadosUsuario});
    }

    verifyAssociationUserService.onSuccess(() => {
        const res = verifyAssociationUserService.response;

        if (!res?.cpfCadastrado && !res?.emailCadastrado) {
            setEhNovoUsuario(true);
        }
        else if (res.associadoNaEmpresa) {
            Modal.info({
                title: 'Usuário associado nessa empresa!',
                content: 'Este usuário já está associado nessa empresa.',
                okText: "Fechar"
            });

        }
        else if (res.associacao) {
            Modal.confirm({
                title: 'CPF e e-mail já cadastrados!',
                content: 'Deseja associar esse usuário nessa empresa?',
                okText: "Associar",
                cancelText: "Cancelar",
                onOk: criarAssociacao
            });
        }
        else if (res.cpfCadastrado && !res.emailCadastrado) {
            Modal.confirm({
                title: 'CPF já cadastrado!',
                content: 'Deseja cadastrar uma nova conta de e-mail e associar a esta empresa?',
                okText: "Cadastrar e Associar",
                cancelText: "Cancelar",
                onOk: criarAssociacao
            });
        }
        else if (res.cpfCadastrado && res.emailCadastrado) {
            Modal.info({
                title: 'E-mail já cadastrado em outro CPF!',
                content: 'Por favor, escolha outro e-mail ou associe o CPF correto.',
                okText: "Fechar"
            });
        }
    });

    const resetarForm = () => {
        setEhNovoUsuario(false);
    };

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
                        {'Adcionar'}
                    </Button>

                    {ehNovoUsuario &&
                        <Button htmlType="reset" className="addUser-btn-add" onClick={resetarForm}>
                            {'Resetar'}
                        </Button>
                    }
                </Footer>
            </Form>
        </>
    );

}
export default AddUser;