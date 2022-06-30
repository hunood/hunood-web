import React, { FC, useContext, useState, useRef } from 'react';
import { Chart } from "react-google-charts";
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Table, DatePicker, Col, Row } from 'antd';
import { ExcelButton, PdfButton } from 'components/general';
import { AuthContext } from 'assets/context/AuthContext';
import { ActionMetricsService } from 'services/metrics';
import { Metrica } from 'services/metrics/ActionMetricsService/interfaces/response';
import { Acao } from 'typing/enums';
import { t } from 'i18n';
import moment, { Moment } from 'moment';
import "./style.less";

interface DadosTabelaMetricas {
  key: string;
  acao: JSX.Element | keyof typeof Acao;
  data: string;
  produto: string;
  categorizacao: string;
  usuario: string;
}

const Dashboard: FC = () => {

  const { auth } = useContext(AuthContext);
  const refMetricas = useRef<Metrica[]>([]);
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [datas, setDatas] = useState<[Moment | null, Moment | null]>([null, null]);
  const [dadosMetricas, setDadosMetricas] = useState<DadosTabelaMetricas[]>([]);
  const [dadosArquivosDownload, setDadosArquivosDownload] = useState<DadosTabelaMetricas[]>([]);
  const cabecalhosPDF: Array<keyof DadosTabelaMetricas> = [
    "key",
    "acao",
    "data",
    "produto",
    "categorizacao",
    "usuario"
  ]

  const addProductService = new ActionMetricsService().useAsHook();

  React.useEffect(() => {
    addProductService.send({ idEmpresa: auth.empresas[0].id });
    return;
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (datas && (datas[0] === null || datas[1] === null)) {
      setDadosMetricas(dadosTabela(refMetricas.current));
    }
    else {
      setDadosMetricas(dadosTabela());
    }
    return;
  }, [datas]); // eslint-disable-line

  addProductService.onSuccess(() => {
    const res = addProductService.response?.metricas as Metrica[] || [];
    refMetricas.current = res;
    setDadosMetricas(dadosTabela(res));
    setMetricas(res);
  })

  const dadosTabela = (metricas_?: Metrica[]) => {
    let met = metricas_ || refMetricas.current;

    if (datas && (datas[0] !== null || datas[1] !== null)) {
      met = met.filter((metrica) => {
        return moment(datas[0]).isBefore(metrica.dataAcao) && moment(datas[1]).isAfter(metrica.dataAcao)
      })
    }

    setMetricas(met);
    const dados = met.map((metrica: Metrica, key: number) => {
      const dado = {
        key: String(++key),
        acao: metrica.tipoAcao,
        data: moment(metrica.dataAcao).format("DD/MM/YYYY - HH:mm:ss A"),
        produto: metrica.produto.nome,
        categorizacao: metrica.produto.marca,
        usuario: metrica.usuario.nomeUsuario
      };

      setDadosArquivosDownload((dadosXls) => [...dadosXls, dado]);

      return {
        ...dado, acao: (<>
          {metrica.tipoAcao === 'ENTRADA' ? <ArrowRightOutlined style={{ color: 'green' }} /> : <ArrowLeftOutlined style={{ color: 'red' }} />}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(Acao as any)[(metrica.tipoAcao as any)]}
        </>)
      }
    });

    return dados;
  }

  const columns = [
    { title: t("Ação"), dataIndex: 'acao', key: 'acao' },
    { title: t("Data"), dataIndex: 'data', key: 'data' },
    { title: t("Produto"), dataIndex: 'produto', key: 'produto' },
    { title: t("Categorização"), dataIndex: 'categorizacao', key: 'categorizacao' },
    { title: t("Usuário"), dataIndex: 'usuario', key: 'usuario' }
  ];

  const dataGrafico = [
    ["Ação", "Quantidade", { role: "style" }, {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    }],
    ["Entradas", metricas.filter(m => m.tipoAcao === "ENTRADA").length, "#ff5100", null],
    ["Saídas", metricas.filter(m => m.tipoAcao === "SAIDA").length, "#002140", null],
  ];

  const optionsGrafico = {
    height: 150,
    bar: { groupWidth: "50%" },
    backgroundColor: "transparent",
    legend: { position: "none" }
  };

  return (
    <>
      <Row gutter={[16, 8]} style={{ marginBottom: 25 }}>
        <Col md={{ span: 14 }} sm={{ span: 24 }}>
          <DatePicker.RangePicker
            allowClear
            style={{ width: '100%' }}
            showTime={{ format: 'HH:mm' }}
            format="DD/MM/YYYY \à\s HH:mm"
            defaultValue={datas}
            onChange={(datas_) => datas_ ? setDatas([moment((datas_ as any)[0]), moment((datas_ as any)[1])]) : setDatas([null, null])}
          />
        </Col>

        <Col md={{ span: 5 }} sm={{ span: 24 }}>
          <ExcelButton dados={dadosArquivosDownload} disabled={metricas.length === 0} />
        </Col>

        <Col md={{ span: 5 }} sm={{ span: 24 }}>
          <PdfButton dados={dadosArquivosDownload} cabecalhos={cabecalhosPDF} titulo={"Entradas e Saídas do Estoque"} disabled={metricas.length === 0} />
        </Col>
      </Row>

      <Row gutter={[16, 8]} style={{ marginBottom: 20 }}>
        <Col sm={{ span: 24 }} xs={{ span: 24 }}>
          <Chart
            chartType="BarChart"
            data={dataGrafico}
            options={optionsGrafico}
            width={"100%"}
            style={{ border: "1px solid #d9d9d9", borderRadius: 2 }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col sm={{ span: 24 }} xs={{ span: 24 }}>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            pagination={false}
            scroll={{ x: true }}
            dataSource={dadosMetricas}
          />
        </Col>
      </Row>
    </>
  );

}
export default Dashboard;