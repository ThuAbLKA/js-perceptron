// able to ini a matrix li let m = new Matrix(2,3);
class Matrix {
	constructor(r,c) {
		this.rows = r;
		this.cols = c;

		this.data = [];

		for (let i = 0; i < this.rows; i++ ) {
			this.data[i] = [];
			for (let j= 0; j < this.cols; j++) {
				this.data[i][j] = 0;
			}
		}
	}

	// ===============================================
	// ========= Utility Functions ===================
	// ===============================================
	map(fn) {
		for (let i = 0; i < this.rows; i++ ) {
			for (let j= 0; j < this.cols; j++) {
				this.data[i][j] = fn(this.data[i][j]);
			}
		}
	}

	// ===============================================
	// ========= Instance Functions ==================
	// ===============================================

	randomize() {
		this.map((n) => Math.random() * 2-1);
	}

	multiply(n) {		
		if (n instanceof Matrix) {
			console.error('WRNGFUNC: This function is for scalar multiplication');
			return null;		
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] *= n;
				}
			}
		}
	}

	add(n) {
		if (n instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] += n.data[i][j];
				}
			}
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] += n;
				}
			}
		}
	}

	substract(n) {
		if (n instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] = this.data[i][j] - n.data[i][j];
				}
			}
		} else {
			this.add(n * -1);
		}
	}

	transpose() {
		let ret = new Matrix(this.cols, this.rows);

		for (let i = 0; i < ret.cols; i++) {
			for(let j = 0; j < ret.rows; j++) {
				ret.data[j][i] = this.data[i][j]; 
			}
		}

		this.data = ret.data;
		this.rows = ret.rows;
		this.cols = ret.cols;
	}


	toArray() {
		let arr = [];

		for (let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				arr.push(this.data[i][j]); 
			}
		}

		return arr;
	}

	print() {
		console.table(this.data);
	}

	// ================================================= //
	// =========== Static Functions ==================== //
	// ================================================= //

	static fromArray(arr) {
		let m = new Matrix(arr.length, 1);

		for (let i = 0; i < arr.length; i++) {
			m.data[i][0] = arr[i];
		}

		return m;
	}

	static transpose(n) {
		if (n instanceof Matrix) {
			let ret = new Matrix(n.cols, n.rows);
			for (let i = 0; i < ret.cols; i++) {
				for(let j = 0; j < ret.rows; j++) {
					ret.data[j][i] = n.data[i][j]; 
				}
			}
			return ret;
		} else {
			console.error('INPUTERR: Input error')
			return null;
		}
		
	}

	static vectorMultiply(a,b) {
		if (a instanceof Array && b instanceof Array) {
			if (a.length == b.length) {
				let ret = 0;
				for (let i = 0; i < a.length; i++) {
					ret += a[i]*b[i];
				}
				return ret;
			} 
		}
		return null;
	}

	static substract(a,b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.rows === b.rows && a.cols === b.cols) {
				let ret = new Matrix(a.rows, a.cols);
				for (let i = 0; i < ret.cols; i++) {
					for(let j = 0; j < ret.rows; j++) {
						ret.data[j][i] = a.data[i][j] - b.data[i][j]; 
					}
				}
				return ret;
			} else {
				console.error('INPUTERR1: Matrix dimension mismatch');
				return null;
			}
		}	else {
			console.error('INPUTERR2: Both inputs to this function should be Matrices');
			return null;
		}

	}

	static multiply(a,b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.cols == b.rows) {
				let product = new Matrix(a.rows, b.cols);

				for(let i = 0; i < product.rows; i++) {
					for(let j =0; j < product.cols; j++) {
						let sum = 0;
						for(let k = 0; k < b.rows; k++ ) {
							sum += a.data[i][k] * b.data[k][j];
						}
						product.data[i][j] = sum;
					}
				}
				return product;
			} else {
				console.error('ELEMMISMAT: Element mismatch in source and destination');
				return null;
			}
		} else {
			console.error('INPUTERR: Both inputs to this function should be Matrices');
			return null;
		}
	}

}