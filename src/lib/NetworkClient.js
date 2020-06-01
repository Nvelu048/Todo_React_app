const axios = require('axios');
class NetworkClient {
  static sharedInstance = new NetworkClient();
  instance = axios.create({});
  constructor() {
    this.instance = axios.create({
      baseURL: '',
    });
  }
}

export default NetworkClient;
