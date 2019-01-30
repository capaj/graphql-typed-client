import { request } from './request'
import {
  RequestOptionsFn,
  defaultRequestOptionsFn,
  generateClient
} from './generateClient'
import getSchemaQuery from '../../queries/getSchemaQuery'

export const fetchSchemaAndGenerateClient = async (
  endpoint: string,
  outputDir: string,
  requestOptionsFn: RequestOptionsFn = defaultRequestOptionsFn
) => {
  const query = getSchemaQuery()
  const response = await request(requestOptionsFn(query, endpoint))
  if (!response.data || !response.data.__schema) {
    console.log(
      `Invalid response from endpoint:\n${JSON.stringify(response, null, 2)}`
    )
    return
  }
  generateClient(response.data.__schema, outputDir)
}
