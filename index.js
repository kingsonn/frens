import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import ExternalUser from "views/ExternalUser";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  
    <MoralisProvider serverUrl="https://ibi50cxavsgb.usemoralis.com:2053/server" appId="NtBKDVSljJpEH9iXoYioqa4mD5yXO5xXNcjULHUo">
    <BrowserRouter>
    <Switch>
    <Route path={`/user/:userAddress/:name`}render={(props) => <ExternalUser {...props} /> } />
       
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
    </MoralisProvider>
 ,
  
  document.getElementById("root")
);
