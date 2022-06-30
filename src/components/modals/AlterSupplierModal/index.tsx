import { FC, useState } from 'react';
import { Button, Descriptions, Drawer, Form, Space, Input, InputNumber } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { useWindowSize } from 'assets/hooks/useWindowResize';
import { Fornecedor } from 'services/supplier/FindByBusinessService/interfaces/response';
import { t } from 'i18n';
import './style.less';
import { ContactForm } from 'components/forms';

interface AlterSupplierModalProps {
    fornecedor: Fornecedor,
    visible: boolean,
    onCancel: () => void,
    onSave: (fornecedor: Fornecedor) => void,
}

const AlterSupplierModal: FC<AlterSupplierModalProps> = ({ visible, fornecedor, onCancel, onSave }) => {

    const [form] = Form.useForm();
    const [fornecedorAtualizado, setFornecedorAtualizado] = useState(fornecedor as Fornecedor);
    const window = useWindowSize();

    const defensivaNulo = (nomeCampo: string) => {
        if (String((fornecedorAtualizado as any)[nomeCampo]).trim() === "") {
            setFornecedorAtualizado(prod => { return { ...prod, [nomeCampo]: (fornecedor as any)[nomeCampo] } });
        }
    }

    const atualizaValor = (event: any, nomeCampo: string) => {
        setFornecedorAtualizado((prod) => { return { ...prod, [nomeCampo]: event.target.value } });
    }

    const salvar = () => {
        // const formValues = form.getFieldsValue();
        // const fa = { ...fornecedorAtualizado, contatos: formValues.contatos }
        // onSave(fornecedor);
    };

    return (
        <>
            <Form layout="vertical" hideRequiredMark form={form}>
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
                            <Input className="alter" value={fornecedorAtualizado.nomeFantasia} onChange={(e) => atualizaValor(e, "nomeFantasia")} onBlur={() => defensivaNulo("nomeFantasia")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('CNPJ')} span={2}>
                            <MaskedInput className="alter" value={fornecedorAtualizado.cnpj} mask="00.000.000/0000-00" placeholder='00.000.000/0000-00' onChange={(e) => atualizaValor(e, "cnpj")} onBlur={() => defensivaNulo("cnpj")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('CEP')} span={2}>
                            <MaskedInput className="alter" value={fornecedorAtualizado.cepLogradouro} mask="00000-000" placeholder='000000-000' onChange={(e) => atualizaValor(e, "cepLogradouro")} onBlur={() => defensivaNulo("cepLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Logradouro')} span={2}>
                            <Input className="alter" value={fornecedorAtualizado.nomeLogradouro} onChange={(e) => atualizaValor(e, "nomeLogradouro")} onBlur={() => defensivaNulo("nomeLogradouro")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Número')} span={2}>
                            <InputNumber className="alter" value={fornecedorAtualizado.numeroLogradouro} min={0} style={{ width: '100%' }} onChange={(e) => atualizaValor(e, "numeroLogradouro")} onBlur={() => defensivaNulo("numeroLogradouro")} />
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

                </Drawer>
            </Form>
        </>
    );
};


export { AlterSupplierModal };
