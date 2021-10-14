import React, { FC, useContext, useState } from 'react';
import { Table } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { FindByBusinessService } from 'services/user';
import { Usuario } from 'services/user/FindByBusiness/interfaces/response';
import { AuthContext } from 'assets/context/AuthContext';
import { TipoUsuario } from 'typing/enums';
import { AlterUserModal } from 'components/modals';
import "./style.less";

const AdminUsers: FC = () => {

    const [users, setUsers] = useState<Usuario[]>();
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({} as Usuario);
    const [visible, setVisible] = useState<boolean>(false);
    const findByBusinessService = new FindByBusinessService().useAsHook();
    const { auth } = useContext(AuthContext);

    React.useEffect(() => {
        findByBusinessService.send({ idEmpresa: auth.empresas[0].id }); // eslint-disable-next-line
    }, []);

    findByBusinessService.onSuccess(() => {
        setUsers(findByBusinessService.response?.usuarios);
    });

    const detalharUsuario = (usuario: Usuario) => {
        setUsuarioSelecionado(usuario);
        setVisible(true);
    };

    const columns = [
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },
        { title: 'Tipo usuário', dataIndex: 'tipousuario', key: 'tipousuario' },
        { title: 'Usuário', dataIndex: 'usuario', key: 'usuario' },
        { title: 'Ativo', dataIndex: 'ativo', key: 'ativo' },
        { title: 'Ação', dataIndex: 'acao', key: 'acao' },
    ];

    return (
        <>
            <Table
                columns={columns}
                pagination={false}
                dataSource={users?.map((usuario: Usuario, key: number) => {
                    return {
                        key: 1,
                        nome: usuario.nome,
                        tipousuario: (TipoUsuario as any)[usuario.tipoUsuario.toString()],
                        usuario: usuario.nomeUsuario.toLowerCase(),
                        acao: <a href="Detalhar" onClick={(event) => {
                            event.preventDefault();
                            detalharUsuario(usuario)
                        }}>Detalhar</a>,
                        ativo: usuario.usuarioAtivo ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#eb2f2f" }} />
                    }
                })}
            />

            {
                visible && (
                    <AlterUserModal
                        user={{ ...usuarioSelecionado }}
                        visible={visible}
                        onCancelar={() => {
                            setVisible(false);
                            console.log('Cancelar');
                        }}
                        onSalvar={() => {
                            setVisible(false)
                            console.log('Salvar');
                        }}
                    />
                )
            }
        </>
    );

}
export default AdminUsers;