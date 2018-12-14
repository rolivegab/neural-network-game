import * as T from 'three'

export default abstract class {
	static deltaTime: number
	static clock = new T.Clock(true)

	static updateDeltaTime() {
		this.deltaTime = this.clock.getDelta()
	}
}
