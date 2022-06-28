import React, { FC, useContext, useState, useRef } from 'react';
import { Table, DatePicker } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Chart } from "react-google-charts";
import { AuthContext } from 'assets/context/AuthContext';
import { ActionMetricsService } from 'services/metrics';
import { Metrica } from 'services/metrics/ActionMetricsService/interfaces/response';
import { Acao } from 'typing/enums';
import { t } from 'i18n';
import moment, { Moment } from 'moment';
import "./style.less";

interface DadosTabelaMetricas {
  key: number;
  id: string;
  acao: JSX.Element;
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
    return met.map((metrica: Metrica, key: number) => {
      return {
        key,
        id: metrica.id,
        acao: (
          <>
            {metrica.tipoAcao === 'ENTRADA' ? <ArrowRightOutlined style={{ color: 'green' }} /> : <ArrowLeftOutlined style={{ color: 'red' }} />}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(Acao as any)[(metrica.tipoAcao as any)]}
          </>
        ),
        data: moment(metrica.dataAcao).format("DD/MM/YYYY - HH:mm:ss A"),
        produto: metrica.produto.nome,
        categorizacao: metrica.produto.marca,
        usuario: metrica.usuario.nomeUsuario
      }
    })
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
      <div style={{ margin: 20 }}>
        <div style={{ border: "0px solid green", marginBottom: 30 }}>
          <DatePicker.RangePicker
            allowClear
            style={{ width: '100%' }}
            showTime={{ format: 'HH:mm' }}
            format="DD/MM/YYYY \à\s HH:mm"
            defaultValue={datas}
            onChange={(datas_) => datas_ ? setDatas([moment((datas_ as any)[0]), moment((datas_ as any)[1])]) : setDatas([null, null])}
          />
        </div>

        <Chart
          chartType="BarChart"
          data={dataGrafico}
          options={optionsGrafico}
          width={"100%"}
          style={{ border: "1px solid #d9d9d9", borderRadius: 2 }}
        />

        <Table
          style={{ marginTop: 30 }}
          className="components-table-demo-nested"
          columns={columns}
          pagination={false}
          scroll={{ x: true }}
          dataSource={dadosMetricas}
        />

      </div>
    </>
  );

}
export default Dashboard;