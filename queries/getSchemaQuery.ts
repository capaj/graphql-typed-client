import fs from 'fs'
import path from 'path'

export default () =>
  fs.readFileSync(path.resolve(__dirname, './schemaQuery.graphql')).toString()
