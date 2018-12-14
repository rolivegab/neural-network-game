import * as T from 'three'
import { Vector2 } from 'three'

export default class {
	private cube: T.Mesh

	constructor() {
		const geometry = new T.PlaneGeometry( 1, 1, 1 )
		const material = new T.MeshBasicMaterial( { color: 0x00ffff } )
		this.cube = new T.Mesh( geometry, material )
	}

	getMesh = () => {
		return this.cube
	}

	setPosition = ({x, y}: Vector2) => {
		this.cube.position.set(x, y, 0)
	}
}
