import { ApiClient } from "./client";

export class FavoritesAPI extends ApiClient{
   favorite(slug: string) {
      return this.post(`api/articles/${slug}/favorite`, {});
   }

   unfavorite(slug: string) {
      return this.delete(`api/articles/${slug}/favorite`);
   }
}