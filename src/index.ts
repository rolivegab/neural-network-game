import * as T from 'three'

document.onreadystatechange = () => {
	switch (document.readyState) {
		case 'interactive':
			main()
	}
}

function main() {
	const scene = new T.Scene()
	const camera = new T.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

	const renderer = new T.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.body.appendChild(renderer.domElement)

	const geometry = new T.BoxGeometry( 1, 1, 1 )
	const material = new T.MeshBasicMaterial( { color: 0x00ffff } )
	const cube = new T.Mesh( geometry, material )
	scene.add( cube )

	camera.position.z = 5

	const animate = () => {
		renderer.render( scene, camera )
	}

	requestAnimationFrame( animate )
}
