import React, { FC, useState, useContext } from 'react';
import { Modal, Descriptions, Switch } from 'antd';
import { Usuario } from 'services/user/FindByBusiness/interfaces/response';
import { SituacaoUsuario, TipoUsuario, TratarComo } from 'typing/enums';
import { invertEnum } from 'assets/utils/general';
import { AuthContext } from 'assets/context/AuthContext';
import moment from 'moment';
import './style.less';
import { t } from 'i18n';

export type EventSave = {
    tipoUsuario: keyof TipoUsuario,
    usuarioAtivo: boolean,

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
                title={t('modals:detalhes-usuario')}
                onCancel={cancel}
                onOk={ok}
                okText={t('modals:salvar')}
                cancelText={t('modals:cancelar')}
                okButtonProps={{
                    disabled: user.tipoUsuario === tipoUsuario && user.usuarioAtivo === usuarioAtivo,
                }}
            >
                <Descriptions bordered>
                    <Descriptions.Item label={t('modals:nome-completo')} span={4}>
                        {user.nome}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:usuario')} span={4}>
                        {user.nomeUsuario}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:data-nascimento')} span={4}>
                        {moment(user.dataNascimento).format("DD/MM/YYYY").toString()}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:cpf')} span={4}>
                        {user.cpf}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:tratar-como')} span={4}>
                        {(TratarComo as any)[(user?.tratarPor || "").toString()]}
                    </Descriptions.Item>

                    <Descriptions.Item label={t('modals:tipo-usuario')} span={4}>
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

                    <Descriptions.Item label={t('modals:status-usuario')} span={4}>
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

                    <Descriptions.Item label={t('modals:ultima-modificacao')} span={4}>
                        {moment(user.ultimaAtualizacaoAssociacao).format("DD/MM/YYYY HH:MM:ss A").toString()}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
};


export { AlterUserModal };