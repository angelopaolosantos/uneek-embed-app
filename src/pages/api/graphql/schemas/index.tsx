import { mergeSchemas } from '@graphql-tools/merge';
import resolvers from '../resolvers'
import typeDefs from '../typeDefs'

const mergedSchema = mergeSchemas({
    schemas: [
        // add additional schemas if needed
    ],
    typeDefs,
    resolvers
});

export default mergedSchema