import Service from "./service";
import { sleep } from "./service";

class LoginService extends Service {
  constructor() {
    super("login");
  }

  async login(credentials) {
    await sleep(500);
    return await this.axios.post("/", credentials);
  }
}

export default new LoginService();
