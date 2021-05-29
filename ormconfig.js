module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'pool-party',
  synchronize: process.env.DEPLOY_ENV !== 'production',
  entities: ['dist/**/*.entity{.ts,.js}'],
};
