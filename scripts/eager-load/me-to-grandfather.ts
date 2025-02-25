import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';

async function loadWithParentAndGrandparent() {
  console.log('\n// eager loading person with parent and grandparent //');

  const people = await Person
    .query()
    .withGraphFetched('parent.parent')
    .where('id', 24);
}

loadWithParentAndGrandparent().then(() => process.exit(0));
