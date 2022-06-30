import React, { FC } from 'react';
import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';
import './style.less'

interface ExcelButtonProps {
    dados: any[],
    nomeArquivo?: string,
    disabled?: boolean
}

const ExcelButton: FC<ExcelButtonProps> = ({ dados, nomeArquivo, disabled }) => {
    React.useEffect(() => { return; });

    const gerarNomeArquivo = () => {
        const formatDate = "DDMMYYYYHHmmssA";
        const data = moment().format(formatDate);
        return `${data}_DASHBOARD;`
    }


    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (dados: any[]) => {
        const nome = nomeArquivo || gerarNomeArquivo()
        const ws = XLSX.utils.json_to_sheet(dados);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, nome + fileExtension);
    };

    return (
        <>
            <Button className="blue" type="primary" disabled={disabled} onClick={(e) => exportToCSV(dados)}>
                <FileExcelOutlined style={{ fontSize: 16 }} />Exportar XLS
            </Button>
        </>
    );
};


export { ExcelButton };
