  import React,{useState} from "react";
// reactstrap components

import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Web3Modal from 'web3modal'

import frensABI from "../components/frensABI.json"
import { ethers } from 'ethers'
import { useMoralisQuery, useMoralis } from "react-moralis";
const vaddress = "0x639DAc000a0218039905185F135CfcB29F9D742F"
function Find() {
  const [formInput, updateFormInput] = useState({ address: '', name: '' })
  
  async function lmoa(){
    const { address, name} = formInput
    const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(vaddress, frensABI, signer)
    const data = await contract.follow(address, name)
    await data.wait()
  }

  const queryPost = useMoralisQuery(
    "EthTransactions",
    (query) => query.ascending("block_number").skip(1),
    [],
    { live: true,},
   
  );
  
  const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data)).reverse();
  // console.log(fetchedPosts)
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Find Friends</CardHeader>
              <CardBody>
                <div style={{display: "flex"}}>
                  <h5>Address : </h5>
              <input 
        color="black"
        style={{background:"rgb(214 172 218 / 37%)", borderRadius:"10px", padding:"8px",  margin:"0% 3%"}}
          required
          
          onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
          /><br></br>
          </div>
          <div style={{display: "flex"}}>
                  <h5>Name : </h5>
           <input 
        color="black"
        style={{background:"rgb(214 172 218 / 37%)", borderRadius:"10px", padding:"8px", margin:"0% 10%"}}
          required
          
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          </div>
          <Button onClick={lmoa} style={{margin:"5% 37%"}}>Find</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
               <div style={{fontSize:"large"}}>Real-time Transactions of users</div>
              </CardHeader>
              <hr></hr>
                   {fetchedPosts.map((post) => (
              <CardBody>

      <div key={post.hash} >
     {post.to_address?<div><span>{post.from_address}</span> transferred ETH to <span>{post.to_address}</span> on block number <span>{post.block_number}</span></div>:<div><span>{post.from_address}</span> deployed a new contract</div>}

        </div>
        <hr></hr>
              </CardBody>
  ))} 
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Find;
