import React, { FC } from 'react';
import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import './style.less'

interface ExcelButtonProps {
    dados: any[],
    nomeArquivo: string,
    disabled?: boolean
}

const ExcelButton: FC<ExcelButtonProps> = ({ dados, nomeArquivo, disabled }) => {
    React.useEffect(() => { return; });

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (dados: any[], nomeArquivo: string) => {
        const ws = XLSX.utils.json_to_sheet(dados);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, nomeArquivo + fileExtension);
    };

    return (
        <>
            <Button className="blue" type="primary" disabled={disabled} onClick={(e) => exportToCSV(dados, nomeArquivo)}>Exportar .XLS</Button>
        </>
    );
};


export { ExcelButton };
