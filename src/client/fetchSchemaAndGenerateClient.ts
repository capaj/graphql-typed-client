import fs from 'fs'
import path from 'path'
import { request } from './request'
import {
  RequestOptionsFn,
  defaultRequestOptionsFn,
  generateClient
} from './generateClient'

export const fetchSchemaAndGenerateClient = async (
  endpoint: string,
  outputDir: string,
  requestOptionsFn: RequestOptionsFn = defaultRequestOptionsFn
) => {
  const query = fs
    .readFileSync(path.resolve(__dirname, '../../queries/schemaQuery.graphql'))
    .toString()
  const response = await request(requestOptionsFn(query, endpoint))
  if (!response.data || !response.data.__schema) {
    console.log(
      `Invalid response from endpoint:\n${JSON.stringify(response, null, 2)}`
    )
    return
  }
  generateClient(response.data.__schema, outputDir)
}
