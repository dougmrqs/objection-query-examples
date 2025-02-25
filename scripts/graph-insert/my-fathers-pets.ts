import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';

async function insertFatherWithPets() {
  console.log('\n// inserting father with two dogs //')

  const graphInsert = {
    firstName: 'Father',
    lastName: 'Doe',
    age: 40,
    pets: [
      { name: 'Rex', species: 'dog' },
      { name: 'Max', species: 'dog' },
    ]
  };

  return await transaction(Person, async (Person, knex) => {
    const person = await Person.query().insertGraph(graphInsert);

    return person;
  });
}

insertFatherWithPets().then(() => process.exit(0));
