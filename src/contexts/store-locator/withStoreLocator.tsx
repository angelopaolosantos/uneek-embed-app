import React from 'react'
import StorLocatorContext from './StoreLocatorContext'

export default function withStoreLocator(Component) {
	return function contextComponent(props) {
		return (
			<StorLocatorContext.Consumer>
				{context => <Component {...props} context={context} />}
			</StorLocatorContext.Consumer>
		)
	}
}