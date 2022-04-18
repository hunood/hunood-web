import React, { FC, useState, useContext } from 'react';
import { Modal, Descriptions, Switch } from 'antd';
import { Usuario } from 'services/user/FindByBusiness/interfaces/response';
import { SituacaoUsuario, TipoUsuario, TratarComo } from 'typing/enums';
import { invertEnum } from 'assets/utils/general';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import moment from 'moment';
import './style.less';

export type EventSave = {
    tipoUsuario: keyof TipoUsuario,
    usuarioAtivo: boolean
};

interface AlterUserModalProps {
    user: Usuario,
    visible: boolean,
    onCancel: () => void,
    onSave: (event: EventSave, user: Usuario) => void,
}

const AlterUserModal: FC<AlterUserModalProps> = ({ user, visible, onCancel, onSave }) => {

    React.useEffect(() => { return; });

    const { auth } = useContext(AuthContext);

    const TipoUsuarioInvert = invertEnum<typeof TipoUsuario>(TipoUsuario);
    const [tipoUsuario, setTipoUsuario] = useState<keyof TipoUsuario>(user.tipoUsuario);
    const [usuarioAtivo, setUsuarioAtivo] = useState<boolean>(user.usuarioAtivo);
    
    const ehMaster = user.nomeUsuario.toLowerCase() === "master";
    const proprioUsuario = auth.id === user.idAutenticacao;

    const ok = () => {
        onSave({ tipoUsuario, usuarioAtivo }, user);
    };

    const cancel = () => {
        onCancel();
    };

    return (
        <>
            <Modal
                visible={visible}
                title={t('modals:alter-user.detalhes-usuario')}
                onCancel={cancel}
                onOk={ok}
                okText={t('modals:alter-user.salvar')}
                cancelText={t('modals:alter-user.cancelar')}
                okButtonProps={{
                    disabled: user.tipoUsuario === tipoUsuario && user.usuarioAtivo === usuarioAtivo,
                }}
            >
                <Descriptions bordered column={2}>
                    <Descriptions.Item label={t('modals:alter-user.nome-completo')} span={2}>
                        {user.nome}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.usuario')} span={2}>
                        {user.nomeUsuario}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.data-nascimento')} span={2}>
                        {moment(user.dataNascimento).format("DD/MM/YYYY").toString()}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.cpf')} span={2}>
                        {user.cpf}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.tratar-como')} span={2}>
                        {(TratarComo as any)[(user?.tratarPor || "").toString()]}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.tipo-usuario')} span={2}>
                        {
                            (ehMaster || proprioUsuario) ? (
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    checkedChildren={TipoUsuario.ADMINISTRADOR}
                                    checked={true}
                                />
                            ) : (
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    checkedChildren={TipoUsuario.ADMINISTRADOR}
                                    unCheckedChildren={TipoUsuario.COLABORADOR}
                                    defaultChecked={(TipoUsuario as any)[user.tipoUsuario] === TipoUsuario.ADMINISTRADOR}
                                    onChange={(checked: boolean) => {
                                        setTipoUsuario((TipoUsuarioInvert[checked ? TipoUsuario.ADMINISTRADOR : TipoUsuario.COLABORADOR]) as keyof TipoUsuario);
                                    }}
                                />
                            )
                        }
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.status-usuario')} span={2}>
                        {
                            (ehMaster || proprioUsuario) ? (
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    checkedChildren={SituacaoUsuario.ATIVO}
                                    checked={true}
                                />
                            ) : (
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    checkedChildren={SituacaoUsuario.ATIVO}
                                    unCheckedChildren={SituacaoUsuario.INATIVO}
                                    defaultChecked={usuarioAtivo}
                                    onChange={(checked: boolean) => {
                                        setUsuarioAtivo(checked);
                                    }}
                                />
                            )
                        }
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:alter-user.ultima-modificacao')} span={2}>
                        {moment(user.ultimaAtualizacaoAssociacao).format("DD/MM/YYYY HH:MM:ss A").toString()}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
};


export { AlterUserModal };