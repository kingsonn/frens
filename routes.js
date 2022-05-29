import Dashboard from "views/Dashboard.js";
import Find from "views/Find.js";
import UserPage from "views/User.js";


var routes = [
  {
    path: "/dashboard",
    name: "Frens",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
 
  {
    path: "/findfrens",
    name: "Find Frens",
    icon: "nc-icon nc-pin-3",
    component: Find,
    layout: "/admin",
  },
  
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },


];
export default routes;
