import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';

async function removeSomeonesPets() {
  console.log('\n// finding someone with pets //');
 
  const personWithPets = await Person.query().join('animals', 'animals.ownerId', 'persons.id').withGraphFetched('pets').first();

  if (!personWithPets) throw new Error('Not found');

  console.log('\n removing pets');

  return await transaction(Person, async (Person) => {
    const personWithoutPets = { ...personWithPets, pets: [] };

    console.log(await Person.query().upsertGraphAndFetch(personWithoutPets));
    // console.log(await Person.query().upsertGraphAndFetch(personWithoutPets, { noDelete: true }));
  });
}

removeSomeonesPets().then(() => process.exit(0));
