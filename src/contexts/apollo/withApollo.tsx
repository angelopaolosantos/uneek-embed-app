import { ApolloConsumer } from '@apollo/client'

export default function withStoreLocator(Component) {
	return function contextComponent(props) {
		return (
			<ApolloConsumer>
				{context => <Component {...props} apollo={context} />}
			</ApolloConsumer>
		)
	}
}