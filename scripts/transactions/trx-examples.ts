import { transaction } from 'objection';
import Person from '../../models/Person';
import '../knex';

async function afterTransaction() {
  console.log('\n -- After transaction --');
  console.log(await Person.query().where('firstName', 'Zaphod'))
}

async function example1() {
  const trx = await Person.startTransaction();

  try {
    await Person.query(trx).insert({
      firstName: 'Zaphod',
      lastName: 'Beeblebrox',
      age: 42,
    });

    throw new Error('Something went wrong');

    await trx.commit();
  } catch(err) {
    await trx.rollback();
  }

  await afterTransaction();
}

// example1().then(() => process.exit(0));

async function example2() {
  try {
    await Person.transaction(async trx => {
      await Person.query(trx).insert({
        firstName: 'Zaphod',
        lastName: 'Beeblebrox',
        age: 42,
      });

      throw new Error('Something went wrong');
    });
  } catch {}

  await afterTransaction();
}

// example2().then(() => process.exit(0));

async function example3() {
  try {
    await transaction(Person, async BoundPerson => {
      await BoundPerson.query().insert({
        firstName: 'Zaphod',
        lastName: 'Beeblebrox',
        age: 42,
      })
      
      throw new Error('Something went wrong');
    });
  } catch {}

  await afterTransaction();
}

// example3().then(() => process.exit(0));
