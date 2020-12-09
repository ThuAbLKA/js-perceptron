function sigmoid(x) {
	return 1/(1 + Math.exp(-x));
}

class NeuralNetwork {
	constructor(i, h, o) {
		this.input_nodes = i; 
		this.hidden_nodes = h;
		this.output_nodes = o;

		// weight matrix between hidden and input layer
		this.w_hi = new Matrix(this.hidden_nodes, this.input_nodes);
		// weights matrix between output and hidden layer
		this.w_ho = new Matrix(this.output_nodes, this.hidden_nodes);

		this.w_hi.randomize();
		this.w_ho.randomize();

		// bias values for hidden nodes
		this.b_h = new Matrix(this.hidden_nodes, 1);
		this.b_h.randomize();
		// bias values for output nodes
		this.b_o = new Matrix(this.output_nodes, 1);
		this.b_o.randomize();

	}

	feedForward(input) {

		// generating hidden output
		let input_matrix = Matrix.fromArray(input);
		let hidden = Matrix.multiply(this.w_hi, input_matrix);
		hidden.add(this.b_h);

		// activation function
		hidden.map(sigmoid);

		// generating hidden output
		let output = Matrix.multiply(this.w_ho, hidden);
		output.add(this.b_o);

		// activation function
		output.map(sigmoid);

		// return guess
		return output.toArray();
	}
               
	train(inputs, targets) {
		let outputs = this.feedForward(inputs);

		outputs = Matrix.fromArray(outputs);
		targets = Matrix.fromArray(targets);
		// error calculation 
		// E = T - O

		let output_error = Matrix.substract(targets, outputs);
		outputs.print();
		targets.print();
		console.log('Output Error.....');
		output_error.print();

		let hidden_weight = Matrix.transpose(this.w_ho);
		let hidden_error = Matrix.multiply(hidden_weight, output_error);
		console.log('Hidden Error.....');
		hidden_error.print();

		let input_weight = Matrix.transpose(this.w_hi);
		let input_error = Matrix.multiply(input_weight, hidden_error);
		console.log('Input Error...');
		input_error.print();

		
	}
}