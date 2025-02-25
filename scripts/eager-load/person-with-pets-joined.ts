import Person from '../../models/Person';
import '../knex';

async function loadPersonWithPetsJoined() {
  console.log('\n// eager loading person with pets joined //');
  
  const person = await Person
    .query()
    .withGraphJoined('pets')
    .where('persons.id', 25);

  console.log(JSON.stringify(person))
}

loadPersonWithPetsJoined().then(() => process.exit(0));
