import { FC, useContext, useState, useRef } from 'react';
import { Button, Descriptions, Drawer, Form, Space, Input, InputNumber } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { AuthContext } from 'assets/context/AuthContext';
import { useWindowSize } from 'assets/hooks/useWindowResize';
import { ContactForm } from 'components/forms';
import { UpdateSupplierService, DeleteSupplierService } from 'services/supplier';
import Fornecedor from "services/supplier/AddSupplierService/interfaces/response";
import { t } from 'i18n';
import './style.less';

interface AlterSupplierModalProps {
    fornecedor: Fornecedor,
    visible: boolean,
    onCancel?: () => void,
    onSave?: (fornecedor: Fornecedor) => void,
}

const AlterSupplierModal: FC<AlterSupplierModalProps> = ({ visible, fornecedor, onCancel: onCancel_, onSave: onSave_ }) => {

    const { auth } = useContext(AuthContext);

    const [form] = Form.useForm();
    const refFornecedor = useRef(fornecedor);
    const [fornecedorAtualizado, setFornecedorAtualizado] = useState(fornecedor as Fornecedor);
    const window = useWindowSize();

    const updateSupplierService = new UpdateSupplierService().useAsHook();
    const deleteSupplierService = new DeleteSupplierService().useAsHook();

    const onCancel = () => {
        if (onCancel_) {
            onCancel_();
        }
    }

    const onSave = () => {
        if (onSave_) {
            onSave_(fornecedorAtualizado);
        }
    }

    const defensivaNulo = (nomeCampo: string) => {
        if (nomeCampo === "observacoes" || nomeCampo === "complementoLogradouro") {
            return;
        }

        form.validateFields();

        if (String((fornecedorAtualizado as any)[nomeCampo]).trim() === "") {
            setFornecedorAtualizado(prod => {
                return {
                    ...prod,
                    [nomeCampo]: (refFornecedor.current as any)[nomeCampo]
                }
            });
        }
    }

    const atualizaValor = (event: any, nomeCampo: string) => {
        const valor = String(event.target.value).replaceAll("_", "").replaceAll("-", "");
        setFornecedorAtualizado((prod) => {
            return {
                ...prod,
                [nomeCampo]: valor
            }
        });
    }

    const salvar = () => {
        form.validateFields().then(() => {
            const formValues = form.getFieldsValue();
            const fornecedor = { ...fornecedorAtualizado, contatos: formValues.contatos } as Fornecedor;
            updateSupplierService.send({ idEmpresa: auth.empresas[0].id, dados: fornecedor });
        })
    };

    updateSupplierService.onFinish(() => {
        onSave();
    });

    const onDelete = () => {
        deleteSupplierService.send({ idFornecedor: fornecedor.id, idEmpresa: auth.empresas[0].id });
    }

    deleteSupplierService.onFinish(() => {
        onSave();
    });

    return (
        <>
            <Form layout="vertical" hideRequiredMark form={form} noValidate={false} >
                <Drawer
                    width={window.width < 700 ? "100%" : 700}
                    onClose={onCancel}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement={'right'}
                    extra={
                        <Space>
                            <Button onClick={onCancel}>Cancelar</Button>
                            <Button onClick={salvar} type="primary">Salvar</Button>
                        </Space>
                    }
                >

                    <Descriptions bordered column={2}>
                        <Descriptions.Item label={t('Nome Fantasia')} span={2}>
                            <Form.Item>
                                <Input className="alter" value={fornecedorAtualizado.nomeFantasia} onChange={(e) => atualizaValor(e, "nomeFantasia")} onBlur={() => defensivaNulo("nomeFantasia")} />
                            </Form.Item>
                        </Descriptions.Item>

                        <Descriptions.Item label={t('CNPJ')} span={2}>
                            <Form.Item>
                                <MaskedInput className="alter" value={fornecedorAtualizado.cnpj} mask="00.000.000/0000-00" placeholder='00.000.000/0000-00' onChange={(e) => atualizaValor(e, "cnpj")} onBlur={() => defensivaNulo("cnpj")} />
                            </Form.Item>
                        </Descriptions.Item>

                        <Descriptions.Item label={t('CEP')} span={2}>
                            <Form.Item rules={[{ len: 8 }]}>
                                <MaskedInput className="alter"
                                    value={fornecedorAtualizado.cepLogradouro}
                                    mask="00000-000" placeholder='00000-000'
                                    minLength={8}
                                    onInput={(e) => atualizaValor(e, "cepLogradouro")}
                                    onBlur={() => defensivaNulo("cepLogradouro")} />
                            </Form.Item>
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Logradouro')} span={2}>
                            <Form.Item>
                                <Input className="alter" value={fornecedorAtualizado.nomeLogradouro} onChange={(e) => atualizaValor(e, "nomeLogradouro")} onBlur={() => defensivaNulo("nomeLogradouro")} />
                            </Form.Item>
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Número')} span={2}>
                            <InputNumber className="alter" name='numeroLogradouro' value={fornecedorAtualizado.numeroLogradouro} min={0} style={{ width: '100%' }} onInput={(e) => atualizaValor({ target: { value: e } }, "numeroLogradouro")} onBlur={() => defensivaNulo("numeroLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Complemento')} span={2}>
                            <Input className="alter" value={fornecedorAtualizado.complementoLogradouro} onChange={(e) => atualizaValor(e, "complementoLogradouro")} onBlur={() => defensivaNulo("complementoLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Bairro')} span={2}>
                            <Input className="alter" value={fornecedorAtualizado.bairroLogradouro} onChange={(e) => atualizaValor(e, "bairroLogradouro")} onBlur={() => defensivaNulo("bairroLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Cidade')} span={2}>
                            <Input className="alter" value={fornecedorAtualizado.cidadeLogradouro} onChange={(e) => atualizaValor(e, "cidadeLogradouro")} onBlur={() => defensivaNulo("cidadeLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Estado')} span={2}>
                            <Input className="alter" value={fornecedorAtualizado.estadoLogradouro} onChange={(e) => atualizaValor(e, "estadoLogradouro")} onBlur={() => defensivaNulo("estadoLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Observações')} span={2}>
                            <Input className="alter" value={fornecedorAtualizado.observacoes} onChange={(e) => atualizaValor(e, "observacoes")} onBlur={() => defensivaNulo("observacoes")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Contatos')} span={2}>
                            <div style={{ width: 350, display: "block", margin: 0 }}>
                                <ContactForm telefones={fornecedorAtualizado.contatos} semTitulo />
                            </div>
                        </Descriptions.Item>
                    </Descriptions>

                    <Button type="default" style={{ marginTop: 30, width: "100%", }} onClick={onDelete}>Excluir fornecedor</Button>
                </Drawer>
            </Form>
        </>
    );
};


export { AlterSupplierModal };
