module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'pool-party',
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
