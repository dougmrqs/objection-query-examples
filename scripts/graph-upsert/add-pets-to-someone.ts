import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';
import Animal from '../../models/Animal';

async function removeSomeonesPets() {
  console.log('\n// finding someone without pets //');
 
  const personWithoutPets = await Person.query()
    .leftJoin('animals', 'animals.ownerId', 'persons.id')
    .whereNull('animals.id').first();

  if (!personWithoutPets) throw new Error('Not found');

  console.log(personWithoutPets);

  console.log('\n adding a pet');

  return await transaction(Person, async (Person) => {
    const personWithPets = { ...personWithoutPets, pets: [{ name: 'Fluffy', species: 'dog' }] };

    console.log(await Person.query().upsertGraphAndFetch(personWithPets));
    // console.log(await Person.query().upsertGraphAndFetch(personWithPets, { noInsert: true }));
  });
}

removeSomeonesPets().then(() => process.exit(0));
