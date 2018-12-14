import Matter from 'matter-js'
import * as T from 'three'
import Player from './player'
import Time from './time'

export default class {
	private scene = new T.Scene()
	private camera = new T.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
	private renderer = new T.WebGLRenderer()
	private player = new Player()

	constructor() {
		this.renderer.setSize( window.innerWidth, window.innerHeight )
		document.body.appendChild(this.renderer.domElement)
		this.scene.add( this.player.getMesh() )
		this.camera.position.z = 5
		this.animate()
	}

	animate = () => {
		Time.updateDeltaTime()
		requestAnimationFrame( this.animate )
		this.renderer.render( this.scene, this.camera )
		this.applyGravity(Time.deltaTime)
	}

	applyGravity = (delta: number) => {

	}
}
