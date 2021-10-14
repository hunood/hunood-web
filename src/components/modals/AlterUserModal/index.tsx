import React, { FC } from 'react';
import { Modal, Descriptions, Switch } from 'antd';
import { Usuario } from 'services/user/FindByBusiness/interfaces/response';
import { SituacaoUsuario, TipoUsuario, TratarComo } from 'typing/enums';
import { useState } from 'react';
import { invertEnum } from 'assets/utils/general';
import moment from 'moment';
import './style.less';

interface AlterUserModalProps {
    user: Usuario,
    visible: boolean,
    onCancelar: () => void,
    onSalvar?: () => void,
}

const AlterUserModal: FC<AlterUserModalProps> = ({ user, visible, onCancelar, onSalvar }) => {

    const TipoUsuarioInvert = invertEnum<typeof TipoUsuario>(TipoUsuario);
    const SituacaoUsuarioInvert = invertEnum<typeof SituacaoUsuario>(SituacaoUsuario);

    const [tipoUsuario, setTipoUsuario] = useState<keyof TipoUsuario>(user.tipoUsuario);
    const [situacaoUsuario, setSituacaoUsuario] = useState<keyof SituacaoUsuario>(SituacaoUsuarioInvert.Ativo as keyof SituacaoUsuario);

    React.useEffect(() => { return; });

    return (
        <>
            <Modal
                visible={visible}
                title={"Detalhes do usuário"}
                onCancel={onCancelar}
                onOk={onSalvar}
                okText="Salvar"
                okButtonProps={{
                    disabled: user.tipoUsuario === tipoUsuario && (SituacaoUsuarioInvert.Ativo as any) === situacaoUsuario,
                }}
            >
                <Descriptions bordered>
                    <Descriptions.Item label="Nome completo" span={4}>
                        {user.nome}
                    </Descriptions.Item>

                    <Descriptions.Item label="Usuário" span={4}>
                        {user.nomeUsuario}
                    </Descriptions.Item>

                    <Descriptions.Item label="Data nascimento" span={4}>
                        {moment(user.dataNascimento).format("DD/MM/YYYY").toString()}
                    </Descriptions.Item>

                    <Descriptions.Item label="CPF" span={4}>
                        {user.cpf}
                    </Descriptions.Item>

                    <Descriptions.Item label="Tratar como" span={4}>
                        {(TratarComo as any)[(user?.tratarPor || "").toString()]}
                    </Descriptions.Item>

                    <Descriptions.Item label="Tratar como" span={4}>
                        {(TipoUsuario as any)[(user?.tipoUsuario || "").toString()]}
                    </Descriptions.Item>

                    <Descriptions.Item label="Tipo usuário" span={4}>
                        <Switch
                            style={{ width: "100%", height: 22 }}
                            checkedChildren={TipoUsuario.ADMINISTRADOR}
                            unCheckedChildren={TipoUsuario.COLABORADOR}
                            defaultChecked={(TipoUsuario as any)[user.tipoUsuario] === TipoUsuario.ADMINISTRADOR}
                            onChange={(checked: boolean) => {
                                setTipoUsuario((TipoUsuarioInvert[checked ? TipoUsuario.ADMINISTRADOR : TipoUsuario.COLABORADOR]) as keyof TipoUsuario);
                            }}

                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Tipo usuário" span={4}>
                        <Switch
                            style={{ width: "100%", height: 22 }}
                            checkedChildren={SituacaoUsuario.ATIVO}
                            unCheckedChildren={SituacaoUsuario.INATIVO}
                            defaultChecked={(SituacaoUsuario as any)[situacaoUsuario] === SituacaoUsuario.ATIVO}
                            onChange={(checked: boolean) => {
                                console.log((SituacaoUsuarioInvert[checked ? SituacaoUsuario.ATIVO : SituacaoUsuario.INATIVO]));
                                setSituacaoUsuario((SituacaoUsuarioInvert[checked ? SituacaoUsuario.ATIVO : SituacaoUsuario.INATIVO]) as keyof SituacaoUsuario);
                            }}

                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Última modificação" span={4}>
                        {moment(user.ultimaAtualizacaoAssociacao).format("DD/MM/YYYY HH:MM:ss A").toString()}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
};


export { AlterUserModal };