module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'pool-party',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
