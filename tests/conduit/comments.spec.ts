import { expect } from '@playwright/test';
import { test } from '../../fixtures/users-fixtures';
import { ArticlesAPI } from '../../controllers/api/articles';
import { CommentsAPI } from '../../controllers/api/comments';

test('Comments add & remove', async ({ authRequest }) => {
   const articles = new ArticlesAPI(authRequest);
   const comments = new CommentsAPI(authRequest);

   const resCreate = await articles.create({ title: `Article on ${Date.now()}`, description: 'desc', body: 'body' });
   expect(resCreate.status()).toBe(200);
   const slug = (await resCreate.json()).article.slug;
   
   const resAdd = await comments.add(slug, 'Nice article');
   expect(resAdd.status()).toBe(201);
   const commentJson = await resAdd.json();
   const commentId = commentJson.comment.id;
   
   const resRemove = await comments.remove(slug, commentId);
   expect([200, 204]).toContain(resRemove.status());
});