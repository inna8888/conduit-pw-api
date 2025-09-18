import { ApiClient} from './client';

export class TagsAPI extends ApiClient {
   tags() {
      return this.get('api/tags');
   }
}