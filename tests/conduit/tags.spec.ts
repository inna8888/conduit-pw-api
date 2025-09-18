import { expect } from '@playwright/test';
import { test } from '../../fixtures/users-fixtures';
import { TagsAPI } from '../../controllers/api/tags';

test('Tags list and search', async ({ authRequest }) => {
   const tags = new TagsAPI(authRequest);
   
   const res = await tags.tags();
   expect(res.status()).toBe(200);
   const json = await res.json();
   expect(json).toHaveProperty('tags');
});