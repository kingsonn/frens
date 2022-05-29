import React, { useEffect, useState } from "react";

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
import ERC20Transfers from "components/ERC20Transfers";
import { useMoralisQuery } from "react-moralis";

import NativeBalance from "components/NativeBalance";
import NFTBalance2 from "components/NFTBalance2";
import routes from "routes";
import { useMoralisWeb3Api, useERC20Balances} from "react-moralis";
import {useMemo} from 'react'
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import DemoNavbar2 from '../components/Navbars/DemoNavbar2'
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import Account2 from "components/Account/Account2";
import { useMoralis } from "react-moralis";
import ERC20Balance2 from "components/ERC20Balance2";
import { useParams } from "react-router-dom";
import axios from "axios";
import frensABI from "../components/frensABI.json"
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
const address = "0x639DAc000a0218039905185F135CfcB29F9D742F"
var ps;

const backgroundColor= "black";
const activeColor = "info";

function ExternalUser(props) {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
  useMoralis();

useEffect(() => {
  const connectorId = window.localStorage.getItem("connectorId");
  if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
    enableWeb3({ provider: connectorId });
}, [isAuthenticated, isWeb3Enabled]);
const mainPanel = React.useRef();
const { userAddress, name } = useParams();
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
      const flw = await contract.getFollowers(userAddress)
      const flg = await contract.getFollowing(userAddress)
      setfg(flg.length)
      setfw(flw.length)
    }
// React.useEffect(() => {
//   if (navigator.platform.indexOf("Win") > -1) {
//     ps = new PerfectScrollbar(mainPanel.current);
//     document.body.classList.toggle("perfect-scrollbar-on");
//   }
// },[]);
const queryPost = useMoralisQuery(
    "EthTransactions",
    (query) => query.limit(4).skip(6),
    [],
    { live: true,},
   
  );
const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data)).reverse();


// const fetchTokenBalances = async () => {
//   const options = {
//     chain: "rinkeby",
//     address: userAddress,
//   };
//   const balances = await Web3Api.account.getTokenBalances(options);
//   console.log(balances);
// }

// React.useEffect(async () => {
//   await fetchTokenBalances()
// },[])
// setInterval(fet chTokenBalances,10000)
  // useEffect(() => {
  //   ll();
  // },[]);
  // async function ll() {
  //   const id = await axios({
  //     url: `https://deep-index.moralis.io/api/v2/${userAddress}/erc20?chain=rinkeby`,
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       "X-API-Key":
  //         "y9uyepAjRuz6t8BPdYHQHzEVQaPEh8NVB77ihQ2mLFTR8eT2R9iYMGgXTu0RPea0",
  //     },
  //   }).then(response=>{});

  //   setTokens(id.data);
  //   console.log(tokens)
  // }

  return (
    <>
        <div className="wrapper">
     
      <div className="main-panel" ref={mainPanel}>
       
        <DemoNavbar2 {...props} />

    
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
                <p style={{ textAlign: "center" }} className="title-center">
                  <h5>{name}</h5>
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
                        {fg}
                        <br />
                        <small>Following</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                      Native Balance: 0.0341 RIN <br />
                        <small></small>
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
       
                <ul className="list-unstyled team-members">
                  {/* {tokens.map( token => {
                    <li key={token.symbol}>
                        {token.symbol}
                    </li>;
                  })} */}
                  <ERC20Balance2 address={userAddress}/>
                </ul>
                </CardBody>
                </Card>
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">NFTs</CardTitle>
              </CardHeader>
              <CardBody>
                
              <NFTBalance2/>
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
      {name} transfered tokens with contract address:{post.token_address} to {post.to_address} at block number {post.block_number}

        </div>
        <hr></hr>
              </CardBody>
  ))} 
            </Card>
          </Col>
        </Row>
        <Footer/>
      </div>
      </div>
      </div>
    </>
  );
}

export default ExternalUser;
