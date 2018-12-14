import Game from './game'
import neural from './neural'

document.onreadystatechange = () => {
	switch (document.readyState) {
		case 'interactive':
			main()
	}
}

function main() {
	const game = new Game()
}
