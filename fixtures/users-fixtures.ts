import { APIRequestContext, APIResponse, test as base, request as newRequest} from "@playwright/test";
import { faker } from "@faker-js/faker";
import fs from "fs";
import { expect } from '@playwright/test';

type Fixtures = {
   token: string;
   authRequest: APIRequestContext;
   userData: {
    username: string;
    email: string;
    password: string;
   };
}
export const test = base.extend<Fixtures>({
    token: async ({ request }, use) => {
      const userData = {
               username: faker.internet.username(),
               email: faker.internet.email(),
               password: "123test22",
             };

      const result: APIResponse = await request.post(`api/users`, {
           data: { user: userData},
           headers: {'Content-Type': 'application/json'},
         });
     
       const json = await result.json();
       if (!json.user?.token) throw new Error("Token was not generated in fixtures");         
       const token = json.user.token;

       console.log("Generated token:", token);
       expect(result.status()).toBe(201);
       expect(token).toBeTruthy();
       expect(token).toBeDefined();

       await use(token);      
      },

      authRequest: async ({ token }, use) => {
        const authRequest = await newRequest.newContext({
            extraHTTPHeaders: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
            },
      });

      await use(authRequest);
   },  
});

export { expect } from '@playwright/test';