/*global pug*/
import React, {Component} from 'react'
import Card from '../Card'
import './card-list.scss'

class CardsList extends Component {
	
	render() {
		const CardElements = this.props.cards.map(card => {
				return pug`Card(card=${card}, key=${card.id})`
			}
		)
		
		return pug`
			div.food-cards
				${CardElements}
		`
	}
}

export default CardsList
