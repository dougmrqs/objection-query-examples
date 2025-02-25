import Person from '../../models/Person';
import '../knex';

async function loadPersonWithPetsFetched() {
  console.log('\n// eager loading person with pets //');

  const person = await Person
    .query()
    .withGraphFetched('pets')
    .where('lastName', 'Doe');

  console.log(JSON.stringify(person));
}

loadPersonWithPetsFetched().then(() => process.exit(0));
