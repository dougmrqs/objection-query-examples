import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';
import { makeRandomPerson as randomPerson } from '../random-person';

async function insertWithParentAndGrandparent() {
  console.log('\n// inserting person with parent and grandparent //');

  const graphInsert = {
    ...randomPerson(),
    parent: {
      ...randomPerson(),
      parent: randomPerson(),
    }
  };
  
  return await transaction(Person, async (Person, knex) => {
    const person = await Person.query().insertGraph(graphInsert);
    
    return person;
  });
}

insertWithParentAndGrandparent().then(() => process.exit(0));
