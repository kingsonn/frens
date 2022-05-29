  import React, {useEffect, useState} from "react";

// reactstrap components
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
import { useMoralisQuery } from "react-moralis";

import NativeBalance from "components/NativeBalance";
import Account2 from "components/Account/Account2";
import { useMoralis } from "react-moralis";
import ERC20Balance from "components/ERC20Balance";
import NFTBalance from "components/NFTBalance";
import frensABI from "../components/frensABI.json"
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
const address = "0x639DAc000a0218039905185F135CfcB29F9D742F"
function User() {
  const queryPost = useMoralisQuery(
    "EthTokenTransfers",
    (query) => query.limit(7),
    [],
    { live: true,},
   
  );
const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data)).reverse();
  const {account} = useMoralis();
  useEffect(()=>{
    loadFrens()
    
  },[])
  const [fg, setfg] = useState();
  const [fw, setfw] = useState();
  async function loadFrens(){
  const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, frensABI, signer)
        const flw = await contract.getMyFollowers()
        const flg = await contract.getMyFollowing()
        setfg(flg.length)
        setfw(flw.length)
      }
 
  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src="https://www.worldcoinindex.com/data/media/ethereumgoldlogo.jpg"
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    
                    <h5 className="title">My profile</h5>
                  </a>
                  <p className="description">getMyProfile</p>
                </div>
                <p style={{textAlign:"center"}} className="title-center">
         <h5>My Account</h5>
                </p>
             
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        {fw} <br />
                        <small>Followers</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                      {fg}  <br />
                        <small>Following</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                      <NativeBalance/>  <br />
                  
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Assets</CardTitle>
              </CardHeader>
              <CardBody>
                <ERC20Balance/>
                
          
                     </CardBody>
                     </Card>
                     </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">NFTs</CardTitle>
              </CardHeader>
              <CardBody>
                <NFTBalance/>
          

           
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
              <div style={{fontSize:"large"}}>  ERC20 ACTIVITY</div>
              </CardHeader>
              <hr></hr>
              {fetchedPosts.map((post) => (
              <CardBody>

      <div key={post.hash} >
   You transfered tokens with contract address:{post.token_address} to {post.to_address} at block number {post.block_number}

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

export default User;
