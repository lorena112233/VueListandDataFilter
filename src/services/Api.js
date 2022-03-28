import axios from "axios";
import store from "../store/store.js";


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

    axios.defaults.headers.post["Content-type"] = "application/json;charset=utf-8";

    //04. create the api
    this.api = axios.create();}
    
  setSession() {
    // const store = new Storage();


    console.log('Api:' + apiurl)
    const connect = {
        page:1,
        per_page:20,
        engine_key: 'sR_cCweEaptts3ExMPzv',
        q: "brothers",
      baseURL: apiurl,
    };
     store.set("connectsession", connect);
  }

  aggAuth() {}
  get Api() {
    return this.api;
  }
}