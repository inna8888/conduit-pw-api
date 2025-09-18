import { ApiClient } from './client';

export class UserAPI extends ApiClient {
   async register(user: {username:string; email:string; password:string}) {
      return this.post('api/users', { user });
   }

   async login(email: string, password: string) {
      return this.post('api/users/login', { user: { email, password } });
   }

   async current() {
      return this.get('api/user');
   }

   async update(user: {username?:string; email?:string; password?:string; bio?:string; image?:string}) {
      return this.put('api/user', { user });
   }
}