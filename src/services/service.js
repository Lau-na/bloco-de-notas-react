import axios from "axios";

export function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export default class Service {
  constructor(endpoint) {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/" + endpoint,
      timeout: 2000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async list(search) {
    await sleep(500);
    return await this.axios.get(search ? `?search=${search}` : "");
  }

  async delete(id) {
    await sleep(500);
    return await this.axios.delete(`/${id}`);
  }

  async insert(entity) {
    await sleep(500);
    return await this.axios.post("", entity);
  }

  async update(entity) {
    await sleep(500);
    return await this.axios.put(`/${entity.id}`, entity);
  }
}
