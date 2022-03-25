import axios from "axios";
import store from "../store/store.js";


console.log(process.env.VUE_APP_BASE_URL);

export default class Api {
  constructor(url = null) {
    this.api = null;
    //01. prepare
    if (!url) {
        url = "https://search-api.swiftype.com/api/v1/public/engines/search.json"; 
    //   url = "https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=sR_cCweEaptts3ExMPzv&page=1&per_page=20";
    }
    //01.todo:remove the next line
    this.setSession();

    //02. get session
    const session = this.getSession();

    //03.define global settings
    axios.defaults.baseURL = session.baseURL;
    // axios.defaults.headers.common["authorization"] = `Bearer ${session.token}`;

    axios.defaults.headers.post["Content-type"] = "application/json;charset=utf-8";
    //04. create the api
    this.api = axios.create();}
  setSession() {
    // const store = new Storage();
    const apiurl = process.env.VUE_APP_API_URL
    //process.env.VUE_APP_MODE==="production"?process.env.VUE_APP_PROD_API_URL:process.env.VUE_APP_DEV_API_URL;
    console.log('Api:' + apiurl)
    const connect = {
        page:1,
        per_page:20,
        engine_key: 'sR_cCweEaptts3ExMPzv',
        q: "brothers",
    //   token: "124567",
    //   name: "aziz",
    //   perms: ["p1", "p2", "p2"],
      baseURL: apiurl,
    };
     store.set("connectsession", connect);
  }
//   getSession() {
//     const store = new Storage();
//     const session = store.get("connectsession");
//     return session;
//   }
  aggAuth() {}
  get Api() {
    return this.api;
  }
}