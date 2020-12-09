export default class Perceptron {
	constructor(w) {
		this.weights = new Array(w);
		// init weights randomly
		for(let i = 0; i < this.weights.length; i++) {
			this.weights[i] = random(-1,1);
		}
	}

	sign(val) {
		if (val >= 0) {
			return 1;
		} else {
			return -1;
		}
	}

	guess(i) {
		var inputs = new Array(i);

		var sum = 0;
		for(let i = 0; i < this.weights.length; i++) {
			sum += inputs[i] * this.weights[i];
		}

		return this.sign(sum);
	}
}