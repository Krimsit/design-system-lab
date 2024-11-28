import express from 'express'
import * as bodyParser from 'body-parser'
import * as fs from 'fs'
import cors from 'cors'
import { exec } from 'child_process'

import type { Request, Response } from 'express'
import type { Test, QueryData } from '../types'

const PORT = 5123
const app = express()

app.use(bodyParser.json())
app.use(cors())

interface Query<T> extends Request {
  body: T
}

type TestsResultJson = {
  testResults: Test[]
}

app.post('/run-test', async (req: Query<QueryData>, res: Response) => {
  try {
    const isFolderExist = fs.existsSync('addon-test/server/test-result')

    if (!isFolderExist) {
      await fs.promises.mkdir('addon-test/server/test-result', {
        recursive: true,
      })
    }

    await fs.promises.writeFile(
      'addon-test/server/test-result/result.json',
      '',
      'utf8',
    )

    exec(
      `jest ${req.body.testPath} --json=true --outputFile=addon-test/server/test-result/result.json --maxWorkers 2`,
      async () => {
        const json = await fs.promises.readFile(
          'addon-test/server/test-result/result.json',
          'utf8',
        )
        const testResultJson = JSON.parse(json) as TestsResultJson

        await fs.promises.rm('addon-test/server/test-result', {
          recursive: true,
        })

        res.send(testResultJson.testResults)
      },
    )
  } catch (error) {
    const typedError = error as Error

    res.status(500).send(typedError.message)
  }
})

app.listen(PORT, () => {
  console.log(`Tests server running on http://localhost:${PORT}`)
})
