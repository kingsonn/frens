import React,{useEffect} from "react";
import { useMoralis, useERC20Transfers } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import { getExplorer } from "../helpers/networks";
import "antd/dist/antd.css";
import { Skeleton, Table } from "antd";
// import { useERC20Transfers } from "../hooks/useERC20Transfers";

function ERC20Transfers(props) {
  const { fetchERC20Transfers, data ,isLoading,  isFetching, error} = useERC20Transfers({
    address: props.address,
    chain: '0x4'
  });
  const { Moralis } = useMoralis();
useEffect(()=>{
  Moralis.start({
    appId: 'NtBKDVSljJpEH9iXoYioqa4mD5yXO5xXNcjULHUo',
    serverUrl: 'https://ibi50cxavsgb.usemoralis.com:2053/server'
  });
  fetchERC20Transfers({
    onError: (error) => {
      console.log(error);
    }
})},[])
if (isLoading) {
  return 'Loading...'
}

if (isFetching) {
  return 'Fetching...'
}


  return (
    <div style={{ width: "65vw", padding: "15px" }}>
      {Array.isArray(data)&&
        data.map((item) => {
          return (
            <div key={item.token_address}>
<p>{item.value}</p>
            </div>
          )
        })}
    </div>
  );
}

export default ERC20Transfers;
