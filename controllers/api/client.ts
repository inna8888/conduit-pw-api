import { APIRequestContext } from "@playwright/test";

export class ApiClient {
   constructor(protected request: APIRequestContext) {}

   async get(path: string) {
      return this.request.get(path);
   }
   async post(path: string, data: object) {
      return this.request.post(path, { data });
   }
   async put(path: string, data: object) {
      return this.request.put(path, { data });
   }
   async delete(path: string) {
      return this.request.delete(path);
   }
}