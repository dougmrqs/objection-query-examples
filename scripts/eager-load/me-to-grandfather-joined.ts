import Person from '../../models/Person';
import '../knex';

async function loadWithParentAndGrandparent() {
  console.log('\n// eager loading person with parent and grandparent //');

  const people = await Person
    .query()
    .withGraphJoined('parent.parent')
    .where('persons.id', 24);

  console.log(JSON.stringify(people));
}

loadWithParentAndGrandparent().then(() => process.exit(0));
