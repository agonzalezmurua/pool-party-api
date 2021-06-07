module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'pool-party',
  entities: ['dist/**/*.entity{.ts,.js}'],
};
