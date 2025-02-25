import { faker } from '@faker-js/faker';

export const makeRandomPerson = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 18, max: 100 }),
});
