import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = defineConfig({
  connection: env.get('DB_CONNECTION', 'sqlite'),

  connections: {
    sqlite: {
  client: 'sqlite3',
  connection: {
    filename: env.get('SQLITE_DB_NAME') ?? 'database.sqlite',
      },
  useNullAsDefault: true,
  migrations: {
    naturalSort: true,
    paths: ['./database/migrations'],
      },
  debug: false,
    },
  },
})

export default databaseConfig
