import { ApolloConsumer } from '@apollo/client'

export default function withApollo(Component) {
	return function contextComponent(props) {
		return (
			<ApolloConsumer>
				{context => <Component {...props} apollo={context} />}
			</ApolloConsumer>
		)
	}
}