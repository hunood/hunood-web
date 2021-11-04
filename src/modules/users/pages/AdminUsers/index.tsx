import React, { FC, useContext, useState } from 'react';
import { Table } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { FindByBusinessService } from 'services/user';
import { UpdateAssociationService } from 'services/association';
import { Usuario } from 'services/user/FindByBusiness/interfaces/response';
import { EventSave } from 'components/modals/AlterUserModal';
import { AuthContext } from 'assets/context/AuthContext';
import { TipoUsuario } from 'typing/enums';
import { AlterUserModal } from 'components/modals';
import { t } from 'i18n';
import "./style.less";

const AdminUsers: FC = () => {

    const { auth } = useContext(AuthContext);

    const [users, setUsers] = useState<Usuario[]>([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({} as Usuario);
    const [visible, setVisible] = useState<boolean>(false);

    const findByBusinessService = new FindByBusinessService().useAsHook();
    const updateAssociationService = new UpdateAssociationService().useAsHook();

    React.useEffect(() => {
        findByBusinessService.send({ idEmpresa: auth.empresas[0].id }); // eslint-disable-next-line
    }, []);

    findByBusinessService.onSuccess(() => {
        const usuarios = findByBusinessService.response?.usuarios || [];
        usuarios.sort(function (a, b) {
            return a.nomeUsuario.localeCompare(b.nomeUsuario, undefined, { ignorePunctuation: true, numeric: true });
        });

        const index = usuarios.findIndex(user => user.nomeUsuario.toLowerCase() === "master");

        if (index > -1) {
            usuarios.unshift(usuarios.splice(index, 1)[0]);
        }

        setUsers(usuarios);
    });

    const detalharUsuario = (usuario: Usuario) => {
        setUsuarioSelecionado(usuario);
        setVisible(true);
    };

    const salvar = (event: EventSave, user: Usuario) => {
        updateAssociationService.send({
            idEmpresa: auth.empresas[0].id,
            idAutenticacao: user.idAutenticacao,
            dados: { ...event }
        });
        setVisible(false);
    };

    updateAssociationService.onSuccess(() => {
        const res = updateAssociationService.response;
        const index = users.findIndex(user => user.idAutenticacao === res?.idAutenticacao);

        if (index > -1) {
            users[index] = Object.assign(users[index], { ...res });
            setUsers(users.slice());
        }
    });

    const columns = [
        { title: t("users:adminUser.nome"), dataIndex: 'nome', key: 'nome' },
        { title: t("users:adminUser.tipo-usuario"), dataIndex: 'tipousuario', key: 'tipousuario' },
        { title: t("users:adminUser.usuario"), dataIndex: 'usuario', key: 'usuario' },
        { title: t("users:adminUser.ativo"), dataIndex: 'ativo', key: 'ativo' },
        { title: t("users:adminUser.acao"), dataIndex: 'acao', key: 'acao' },
    ];

    return (
        <>
            <Table
                columns={columns}
                pagination={false}
                scroll={{ x: true }}
                dataSource={users?.map((usuario: Usuario, key: number) => {
                    return {
                        key,
                        nome: usuario.nome,
                        tipousuario: (TipoUsuario as any)[usuario.tipoUsuario.toString()],
                        usuario: usuario.nomeUsuario.toLowerCase(),
                        acao: <a href="Detalhar" onClick={(event) => {
                            event.preventDefault();
                            detalharUsuario(usuario)
                        }}>{t("users:adminUser.detalhar")}</a>,
                        ativo: usuario.usuarioAtivo ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#eb2f2f" }} />
                    }
                })}
            />

            {
                visible && (
                    <AlterUserModal
                        user={{ ...usuarioSelecionado }}
                        visible={visible}
                        onCancel={() => { setVisible(false); }}
                        onSave={salvar}
                    />
                )
            }
        </>
    );

}
export default AdminUsers;