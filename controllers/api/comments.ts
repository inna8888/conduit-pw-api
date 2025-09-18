import { ApiClient } from './client';

export class CommentsAPI extends ApiClient {
   add(slug: string, body: string) {
      return this.post(`api/articles/${slug}/comments`, { comment: { body } });
   }

   remove(slug: string, id: number) {
      return this.delete(`api/articles/${slug}/comments/${id}`);
   }
}