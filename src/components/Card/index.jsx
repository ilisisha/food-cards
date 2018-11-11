/*global pug*/
import React, {Component} from 'react'
import './card.scss'

class Card extends Component {

	isFirstOut = false
	
	chooseCard = (event) => {
		if (event.currentTarget.classList.contains('food-item__caption') && 
			event.target.tagName !== 'SPAN') {
			return	
		}
		let target = event.currentTarget.parentNode
		if (!target.classList.contains('food-item_blocked')) {
			target.classList.toggle("food-item_selected")
			if (document.documentElement.clientWidth < 1200) {
				target.querySelector('.food-item__caption').innerHTML = this.props.card.desc
			}
			if (!target.classList.contains("food-item_selected")) {
				target.querySelector('.food-item__caption').innerHTML = "Чего сидишь? Порадуй котэ, <span> купи. </span>"
			} else {
				this.isFirstOut = true
			}
		}
	}
	
	cardMouseEnter = (event) => {
		if (document.documentElement.clientWidth > 1200) {
			let target = event.currentTarget
			if (target.parentNode.classList.contains("food-item_selected") &&
			   !target.classList.contains("food-item_blocked")) {
				target.parentNode.classList.add('food-item_selected-hover')	
			}
		}
	}
	
	cardMouseLeave = (event) => {
		if (document.documentElement.clientWidth > 1200) {
			if (event.currentTarget.classList.contains('food-item__caption') && 
			event.target.tagName == 'SPAN'  &&
			this.isFirstOut) {
				event.curentTerget.innerHTML = this.props.card.desc
				this.isFirstOut = false
			}
			let target = event.currentTarget.parentNode
			if ((target.classList.contains("food-item_selected") || 
				target.classList.contains("food-item_selected-hover")) &&
			    !target.classList.contains("food-item_blocked")) {
				target.classList.remove('food-item_selected-hover')
				if (target.classList.contains("food-item_selected") && this.isFirstOut) {
					target.querySelector('.food-item__caption').innerHTML = this.props.card.desc
					this.isFirstOut = false
				}
			}
		}
	}
	
	render() {
		const card = this.props.card
		let className = "food-item"
		if (!card.inStock) {
			className += " food-item_blocked"
			card.buyTitle = "Печалька, " + card.subtitle + " закончился."
		}
		
		const CardComponent = props => pug`
			div(className=${className})
				.food-item-card(onClick=${(event)=>this.chooseCard(event)}, onMouseEnter=${(event)=>this.cardMouseEnter(event)}, onMouseLeave=${(event)=>this.cardMouseLeave(event)})
					.food-item__desc
						| ${card.title}
						| Сказочное заморское яство
					.food-item__info
						h2.food-item__name
							p Нямушка
							span ${card.subtitle}
						.food-item__consist
							span ${card.portions}
								|  порций 
								br
								if card.mouses == 1
									| мышь
								else if card.mouses > 1 && card.mouses < 5
									| ${card.mouses} мыши
								else 
									| ${card.mouses} мышей
								|  в подарок
								br
								if !card.inStock
									| заказчик доволен
							.food-item__weight
								p ${card.weight}
								| кг
				.food-item__caption(onClick=${(event)=>this.chooseCard(event)},
									onMouseLeave=${(event)=>this.cardMouseLeave(event)})
					if !card.inStock
						| ${card.buyTitle}
					else
						| Чего сидишь? Порадуй котэ, 
						span
							|купи.
		`
		return CardComponent()
	}
}

export default Card