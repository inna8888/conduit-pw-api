import { expect } from '@playwright/test';
import { test } from '../../fixtures/users-fixtures';
import { ArticlesAPI } from '../../controllers/api/articles';

const dataSet = [
   { tags: ['tag1'], titleStart: 'Title-with-tag1' },
   { tags: ['tag2'], titleStart: 'Title-with-tag2' }
]

for (const data of dataSet) {
   test(`Article create, edit, delete - ${data.titleStart}`, async ({ authRequest}) => {
      const articles = new ArticlesAPI(authRequest);
      const title = `${data.titleStart}-${Date.now()}`;
      const resCreate = await articles.create({ title, description: 'Initial-description', body: 'Initial-body', tagList: data.tags }); 
      const json = await resCreate.json();
      const slug = json.article.slug;-
      console.log(slug);
      expect (resCreate.status()).toBe(201);

      const resEdit = await articles.update(slug, { title: `${slug} - edited` });
      expect (resEdit.status()).toBe(200);

      //search
      const resByTag = await articles.listByTag(data.tags[0]);
      expect (resByTag.status()).toBe(200);

      const resDelete = await articles.delete(slug);
      //expect (resDelete.status()).toBe(204|200);
      expect([200, 204]).toContain(resDelete.status());
   });
}
