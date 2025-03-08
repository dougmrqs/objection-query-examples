import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';

async function removeSomeonesPets() {
  console.log('\n// finding someone with pets //');
 
  const personWithPets = await Person.query().join('animals', 'animals.ownerId', 'persons.id').withGraphFetched('pets').first();

  if (!personWithPets) throw new Error('Not found');
  if (typeof personWithPets.pets === 'undefined' || personWithPets.pets.length == 0) throw new Error('Person has no pets');

  const pets = personWithPets.pets;

  console.log(personWithPets);

  console.log('\n updating pets');

  return await transaction(Person, async (Person) => {
    const pet = { ...pets[0], name: 'Raffles' };
    
    const personWithUpdatedPet = { ...personWithPets, pets: [pet] };
    console.log(await Person.query().upsertGraphAndFetch(personWithUpdatedPet));
  });
}

removeSomeonesPets().then(() => process.exit(0));
