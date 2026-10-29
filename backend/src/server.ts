import { inspect } from 'node:util'

async function main() {
  try {
    const { buildApp } = await import('./app.js')
    const app = await buildApp()
    const port = Number(process.env.PORT ?? 3000)
    const host = process.env.HOST ?? '0.0.0.0'
    
    process.once('SIGINT', async () => { await app.close(); process.exit(0) })
    process.once('SIGTERM', async () => { await app.close(); process.exit(0) })

    await app.listen({ port, host })
  } catch (err) {
    console.error('Failed to start application:', err)
    process.exit(1)
  }
}
void main()