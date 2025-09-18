import { APIRequestContext, APIResponse, test as base, request as newRequest, expect} from "@playwright/test";
import { faker } from "@faker-js/faker";

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
               username: faker.internet.username() + Date.now(),
               email: faker.internet.email().replace('@', `+${Date.now()}@`),
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
       expect([200, 201]).toContain(result.status());
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

export { expect };