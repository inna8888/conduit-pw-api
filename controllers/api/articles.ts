import { ApiClient } from './client';

export class ArticlesAPI extends ApiClient {
   create(article: {title:string; description:string; body:string; tagList?:string[]}) {
      return this.post('api/articles', { 
         headers: {
            'Content-Type': 'application/json'
        },
        data: { article } 
      });
   }

   update(slug: string, article: any) {
      return this.post(`api/articles/${slug}`, { 
         headers: {
            'Content-Type': 'application/json'
        },
        data: { article } 
       });
   }

   delete(slug: string): Promise<any> {
      return this.delete(`api/articles/${slug}`);
   }

   get(slug: string): Promise<any> {
      return this.get(`api/articles/${slug}`);
   }

   listByTag(tag: string) {
      return this.get(`api/articles?tag=${encodeURIComponent(tag)}`);
   }

   feed() {
      return
   }

   list(params?: { limit?: number; offset?: number }) {
      const qs: string[] = [];
      if (params?.limit) qs.push(`limit=${params.limit}`);
      if (params?.offset) qs.push(`offset=${params.offset}`);
      const q = qs.length ? `?${qs.join('&')}` : '';
      return this.get(`api/articles${q}`);
   }
}