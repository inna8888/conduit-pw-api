import { expect } from '@playwright/test';
import { test } from '../../fixtures/users-fixtures';
import { ArticlesAPI } from '../../controllers/api/articles';
import { FavoritesAPI } from '../../controllers/api/favorites';
import { faker } from '@faker-js/faker';

test (`Favorite add/remove`, async ({authRequest}) => {
   const articles = new ArticlesAPI(authRequest);
   const favorites = new FavoritesAPI(authRequest);
   const title = `Favorite on ${Date.now()}`;

   const resCreate = await articles.create({ title, description: faker.lorem.sentence(), body: faker.lorem.paragraph(), tagList: ['favorite'] }); 
   expect (resCreate.status()).toBe(201);
   const slug = (await resCreate.json()).article.slug;

   const resFavorite = await favorites.favorite(slug);
   expect(resFavorite.status()).toBe(200);

   const resUnfavorite = await favorites.unfavorite(slug);
   expect([200, 204]).toContain(resUnfavorite.status());
});