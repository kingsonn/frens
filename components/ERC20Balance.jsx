import { useMoralis, useERC20Balances } from "react-moralis";
import { Skeleton, Table } from "antd";
import { getEllipsisTxt } from "./helpers/formatters";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup, 
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import {useMemo} from 'react'
function ERC20Balance(props) {

  const { data: assets } = useERC20Balances();
  const { Moralis } = useMoralis();
  console.log(assets);
  const fullBalance = assets ?? null;


  const columns = [

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => symbol,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
    },
  ];

  return (
    <div style={{ width: "65vw", padding: "15px" }}>

      {/* <Skeleton loading={!assets}>
        <Table
          dataSource={assets}
          columns={columns}
          rowKey={(record) => {
            return record.token_address;
          }}
        />
      </Skeleton> */}
      {fullBalance &&
        fullBalance.map((item) => {
        
          return (
            <div key={item.token_address}>
          
            <Row>
             
                      <Col md="7" xs="7">
                      {item.name} <br />
                        <span className="text-success">
                          <small>{item.token_address}</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                      {item.balance/1000000000000000000}
                      </Col>
                    </Row>
            </div>
            
          )
          
        })}
    </div>
  );
}
export default ERC20Balance;
