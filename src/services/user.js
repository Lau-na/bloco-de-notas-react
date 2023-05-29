import Service from "./service";
import { sleep } from "./service";

class UserService extends Service {
  constructor() {
    super("users");
  }

  async me() {
    await sleep(500);
    return await this.axios.post("/me");
  }
}

export default new UserService();
