  import React, {useEffect, useState} from "react";
// react plugin used to create charts

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import Web3Modal from 'web3modal'
// core components
import axios from "axios";

import { useMoralis } from "react-moralis";
// import Moralis from "moralis";
// import Moralis from "react-moralis";
// import { MoralisContext } from "react-moralis";
import { useMoralisQuery } from "react-moralis";
import { useMoralisCloudFunction } from "react-moralis";
import frensABI from "../components/frensABI.json"
import { ethers } from 'ethers'
const address = "0x639DAc000a0218039905185F135CfcB29F9D742F"
function Dashboard() {
  const[transactions, setTransactions] = useState([])
 

  useEffect(()=>{
    loadFrens()
    
  },[])
async function loadFrens(){
  const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, frensABI, signer)
    const data = await contract.getMyFollowing()
    console.log(data)
    const items = await Promise.all(data.map(async i => {
      let item = {
        name: i[1],
        add: i[0],
      }
      return item
    }))
   setTransactions(items)
    console.log(items)
}

  // const {fetch} = useMoralisCloudFunction(
  //   "getAll"
  // );
  
  // fetch({
  //     onSuccess: (data) => console.log(data), // ratings should be 4.5
  // });
  
//     const ahha = Promise.all(fetch({
//         onSuccess: (data) => {
//          return data
//         }, // ratings should be 4.5
//     }));
// console.log(ahha)
  
  // const cloudCall = () => {
  // };
  // const { fetch } = useMoralisQuery(
  //   "EthTransactions",
  //   (query) => query.equalTo("ownerName", "Aegon"),
  //   [],
  //   { autoFetch: false }
  // );

  // const { data } = useMoralisQuery("EthTransactions", (query) => query, [], {
  //   live: true,
  //   autoFetch: false
  // });
  // let Subscription = data.subscribe();
  // Subscription.on("create", (object)=>{
  //       console.log('hahah', object)
  //     })

  
// async function hha(){
//   const results = data;
//   console.log(results)
// }
// const pipeline = [{ sort: { block_timestamp: 1 } }];
// $$$$$$$$$$$$$$$
const tr = transactions.map(a=>a.add.toString())

const queryPost = useMoralisQuery(
  "EthTransactions",
  (query) => query.ascending("block_number").skip(1).containsAll("from_address", tr),
  [],
  { live: true,},
 
);

const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data)).reverse();

console.log(fetchedPosts)


// const postResult = (<div style={{fontSize:"20px"}}>
//   {fetchedPosts.map((post) => (
//       <div key={post.hash} >
//       <div>{post.from_address}</div>
//         </div>
//   ))}
// </div>)
  // async function lmao(){
  //   let query = new Parse.Query("EthTransactions");
  //   let Subscription = await query.subscribe();

  //   Subscription.on("create", (object)=>{
  //     console.log('hahah', object)
  //   })
  // }
  // lmao()
  return (
    <>
      <div className="content">
      {/* {fetchedPosts.map((post) => (
      <div key={post.hash} >
      <div>{post.from_address}</div>
        </div>
  ))}  */}
        <Row >
          <Col lg="3" md="6" sm="6">
          {transactions.map((post) => (
            <Card  className="card-stats">
              <CardBody >
              
                <div style={{fontSize:"x-large"}}>{post.name}</div>
             
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  {post.add}
                </div>
              </CardFooter>
            </Card>
              ))} 
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
