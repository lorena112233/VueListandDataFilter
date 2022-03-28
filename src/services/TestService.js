
export default class TestServices {

  async getTestByID() {
    try{
      const response = await this.$http.get(
        "https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=sR_cCweEaptts3ExMPzv&page=1&per_page=20"
      );
      console.log("-- response -- ", response)
      this.posts = response.data;

    }catch(error){
      console.log(error)
    }
  }
}
