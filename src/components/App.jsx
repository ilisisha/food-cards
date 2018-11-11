/*global pug*/
import React, {Component} from 'react'
import CardList from './CardList'
import cards from '../resources/cards'

class App extends Component {
	render() {
		return pug`
			div.container
				h1(className="main__title")
					| Ты сегодня покормил кота?
				CardList(cards=${cards})
		`
	}
}

export default App