import { fork } from 'child_process'
import * as path from 'path'

let serverProcess: ReturnType<typeof fork> | null = null

export const startServer = () => {
  serverProcess = fork(
    path.join(__dirname, 'server.ts'),
    [], // Аргументы для процесса
    {
      execArgv: ['-r', 'ts-node/register'], // Использование ts-node для интерпретации TypeScript
    },
  )

  serverProcess.on('error', (error) => {
    console.error('Server error:', error)
  })

  process.on('exit', () => {
    if (serverProcess) {
      serverProcess.kill()
    }
  })
}
