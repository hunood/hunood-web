import { FC, useContext, useState } from 'react';
import { Button, Descriptions, Drawer, Form, Space, Switch } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { useWindowSize } from 'assets/hooks/useWindowResize';
import { invertEnum } from 'assets/utils/general';
import { Usuario } from 'services/user/FindByBusiness/interfaces/response';
import { SituacaoUsuario, TipoUsuario, TratarComo } from 'typing/enums';
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

const AlterUserModal: FC<AlterUserModalProps> = ({ visible, user, onCancel, onSave }) => {

    const { auth } = useContext(AuthContext);
    const ehMaster = user.nomeUsuario.toLowerCase() === "master";
    const proprioUsuario = auth.id === user.idAutenticacao;

    const [usuarioAtivo, setUsuarioAtivo] = useState<boolean>(user.usuarioAtivo);
    const TipoUsuarioInvert = invertEnum<typeof TipoUsuario>(TipoUsuario);
    const [tipoUsuario, setTipoUsuario] = useState<keyof TipoUsuario>(user.tipoUsuario);

    const window = useWindowSize();

    const salvar = () => {
        onSave({ tipoUsuario, usuarioAtivo }, user);
    };

    return (
        <>
            <Drawer
                width={window.width < 700 ? "100%" : 700}
                onClose={onCancel}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                placement={'right'}
                extra= {
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button onClick={salvar} type="primary">Salvar</Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
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

                </Form>
            </Drawer>
        </>
    );
};


export { AlterUserModal };
