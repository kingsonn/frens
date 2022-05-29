import { useERC20Balances, useMoralis } from "react-moralis";
import { useEffect} from 'react'
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


function ERC20Balance2(props) {
  const { Moralis } = useMoralis();
  const { data, isLoading,  isFetching, error, fetchERC20Balances } = useERC20Balances({
    address: props.address,
    chain: '0x4'
  });


  useEffect(() => {
    Moralis.start({
      appId: 'NtBKDVSljJpEH9iXoYioqa4mD5yXO5xXNcjULHUo',
      serverUrl: 'https://ibi50cxavsgb.usemoralis.com:2053/server'
    });
    fetchERC20Balances({
      onError: (error) => {
        console.log(error);
      }
    });
  },[])   

  if (isLoading) {
    return 'Loading...'
  }

  if (isFetching) {
    return 'Fetching...'
  }

  return (
    <div style={{ width: "65vw", padding: "15px" }}>
      {Array.isArray(data) && data.length > 0 &&
        data.map((item) => {
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
export default ERC20Balance2;
