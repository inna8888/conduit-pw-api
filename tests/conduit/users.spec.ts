import { expect } from '@playwright/test';
import { test } from '../../fixtures/users-fixtures';
import { faker } from '@faker-js/faker';
import Joi from 'joi';
import { UserAPI } from '../../controllers/api/users';
import fs from 'fs';

test('ID-001 Create and get a new user', async ({ authRequest }) => {
  const users = new UserAPI(authRequest);
  const random = Date.now();
  const user = {
               username: `in ${random}`,
               email: `in.${random}@example.com`,
               password: "123test22",
             };

  const response = await users.register(user);

  expect(response.status()).toBe(201); 
  const json = await response.json();
  expect(json.user.email).toBe(user.email);
  expect(json.user.username).toBe(user.username);

  const schema = Joi.object({
    user: Joi.object({
      email: Joi.string().required(),
      token: Joi.string().required(),
      username: Joi.string().required(),
      bio: Joi.string().allow(null),
      image: Joi.string().uri().allow(null)
    }).required()
  });

  const validationResult = schema.validate(json);
  expect(validationResult.error).toBeUndefined();

  const current = await users.current();
  expect(current.status()).toBe(200);
});

test('ID-002 Edit User', async ({ authRequest }) => {
  const response = await authRequest.put('api/user', {
    data: {
      user: {
        email: faker.internet.email(),
        username: faker.person.firstName(),
        bio: faker.person.bio(),
        image: faker.image.avatar(),
        
      }
    },
    })

  expect(response.status()).toBe(200);
});
