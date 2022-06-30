import React, { FC } from 'react';
import { Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { jsPDF } from "jspdf";
import moment from 'moment';
import './style.less'

interface PdfButtonProps {
    dados: any[],
    cabecalhos: string[],
    nomeArquivo?: string,
    titulo?: string,
    tamanhoTitulo?: number,
    disabled?: boolean
}

const PdfButton: FC<PdfButtonProps> = ({ dados, cabecalhos, nomeArquivo, titulo, tamanhoTitulo, disabled }) => {

    React.useEffect(() => { return; });

    const gerarNomeArquivo = () => {
        const formatDate = "DDMMYYYYHHmmssA";
        const data = moment().format(formatDate);
        return `${data}_DASHBOARD;`
    }

    function createHeaders(keys: string[]) {
        const result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 100,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

    const headers = createHeaders(cabecalhos);

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });
    if (titulo) {
        doc.setFontSize(tamanhoTitulo || 28)
        doc.text(titulo, 15, 25)
    }
    doc.table(15, 40, dados, headers as any, { autoSize: true });

    const exportToPDF = () => doc.save(`${nomeArquivo || gerarNomeArquivo()}.pdf`);

    return (
        <>
            <Button className="blue" type="primary" disabled={disabled} onClick={() => exportToPDF()}>
                <FilePdfOutlined style={{ fontSize: 16 }} /> Exportar PDF
            </Button>
        </>
    );
};


export { PdfButton };
