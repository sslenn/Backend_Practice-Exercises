import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('airline', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
