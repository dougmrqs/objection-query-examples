import 'dotenv/config';
import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from '../knexfile';

const knex = Knex({
  ...knexConfig.development,
});

Model.knex(knex);
