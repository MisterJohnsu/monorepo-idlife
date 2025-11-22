import { defineConfig } from '@adonisjs/auth'
import { sessionGuard }  from '@adonisjs/auth/session'
import type { InferAuthenticators } from '@adonisjs/auth/types'

let user = () => import('#models/user')

const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: {
        type: 'lucid',
        model: user, // Aponta para o modelo abaixo
        uids: ['email'],
      } as any,
    }),
  },
})

export default authConfig

/**
 * Tipagem necessária para o Adonis não reclamar
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}