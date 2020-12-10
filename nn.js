function sigmoid(x) {
	return 1/(1 + Math.exp(-x));
}

function dSigmoid(x) {
	return x * (1 -x);
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
		this.learning_rate = 0.1;

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
		// generating hidden output
		let input_matrix = Matrix.fromArray(inputs);
		let hidden = Matrix.multiply(this.w_hi, input_matrix);
		hidden.add(this.b_h);

		// activation function
		hidden.map(sigmoid);

		// generating hidden output
		let outputs = Matrix.multiply(this.w_ho, hidden);
		outputs.add(this.b_o);

		// activation function
		output.map(sigmoid);
		// ------------------------------------------ //

		outputs = Matrix.fromArray(outputs);
		targets = Matrix.fromArray(targets);

		// error calculation 
		// E = T - O
		let output_errors = Matrix.substract(targets, outputs);

		// CALCULATE GRADIENT
		// output * (1 - output)
		let gradients = Matrix.map(outputs, dSigmoid);
		// E
		gradients.multiply(output_errors);
		// multiply from the learning rate
		gradients.multiply(this.learning_rate);

		// CALCULATE DELTAS (HO)
		let hidden_transpose = Matrix.transpose(hidden);
		let weights_ho_delta = Matrix.multiply(gradients, hidden_transpose);

		// adjust weight
		this.w_ho.add(weights_ho_delta);
		// adjust bias
		this.b_o.add(gradients);

		let hidden_weight = Matrix.transpose(this.w_ho);
		let hidden_errors = Matrix.multiply(hidden_weight, output_errors);

		// CALCULATE HIDDEN GRADIENT
		let hidden_gradient = Matrix.map(hidden, dSigmoid);
		hidden_gradient.multiply(hidden_errors);
		hidden_gradient.multiply(this.learning_rate);

		// CALCULATE DELTAS (IH)
		let inputs_transpose = Matrix.transpose(inputs);
		let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_transpose);

		// adjust weights
		this.w_hi.add(weights_ih_deltas);
		// adjust bias
		this.b_h.add(hidden_gradient);



		outputs.print();
		targets.print();
		console.log('Output Error.....');
		output_error.print();

		console.log('Hidden Error.....');
		hidden_error.print();

		let input_weight = Matrix.transpose(this.w_hi);
		let input_error = Matrix.multiply(input_weight, hidden_error);
		console.log('Input Error...');
		input_error.print();

		
	}
}