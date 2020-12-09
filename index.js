function setup() {
	let nn = new NeuralNetwork(2,2,1);
	let input = [1,0];
	let targets = [1];

	//let output = nn.feedForward(input);

	nn.train(input, targets);

	//console.log(output);

}