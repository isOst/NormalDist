export default class generateCtrl {
	constructor() {
		this.amount;
		this.sample = [];
		this.standartDeviation;
		this.standartDeviationG;
		this.varianceG;
		this.mean;
		this.meanG;
		this.tolerance;
		this.coefOfVar;
		this.coefOfVarMsg;
		this.limit = [
			{
				N: 0.0048,
			},
			{
				N: 0.0606,
			},
			{
				N: 0.2476,
			},
			{
				N: 0.3829,
			},
			{
				N: 0.2476,
			},
			{
				N: 0.0606,
			},
			{
				N: 0.0048,
			}
		];
		
	}


	inputMean() {

		if(this.mean==0 || this.coefOfVar==0) {
			alert('An averrage value of sample or corfficient of variattion is 0. Impossible to generate');
			this.standartDeviation = 0;
		}

		if(this.coefOfVar < 0) {
			alert('Coefficient of variation should be positive');
			this.standartDeviation = 0;;
		}

		if(this.coefOfVar > 0.4) {
			alert('A large spread of items value in the sample. There is no sense to generate');
			this.standartDeviation = 0;
		}

		if(this.amount < 20) {
			alert('There are not enough items in generated sample');
			this.standartDeviation = 0;
		}

		this.standartDeviation = this.mean * this.coefOfVar;
	};

	setLimits() {
		for(let i = 0; i < this.limit.length; i++) {
			this.limit[i].min = i - 3.5;
			this.limit[i].max = i - 2.5;
		}
	};

	getNums() {
		for(let i = 0; i < this.limit.length; i++) {
			this.limit[i].part = +Math.round(this.amount * this.limit[i].N);

			for(let j=0; j<this.limit[i].part; j++) {
				let num = +parseFloat((Math.random() * (this.limit[i].max - this.limit[i].min) + this.limit[i].min)*this.standartDeviation + this.mean).toFixed(this.tolerance);
				this.sample.push(num);
			}
		}

//  additive loop for numbers, which where not generated because of rounding\
//numbers amount for each interval
//  it has positive impact for small samples, where there are no numbers on remote interval
//  it generates numbers are the most distant from expectation value (mean)
		for(let i = 0; i < this.limit.length; i++) {
			if(this.sample.length < this.amount) {
				let additivePart = this.amount - this.sample.length;
				let additivePositive = additivePart % 2;
				let additiveNegative = additivePart - additivePositive;
			
				for(let j=0; j<additivePositive; j++) {
					let num = +parseFloat((Math.random() * (this.limit[6].max - this.limit[6].min) + this.limit[6].min)*this.standartDeviation + this.mean).toFixed(this.tolerance);
					this.sample.push(num);
				}

				for(let j=0; j<additiveNegative; j++) {
					let num = +parseFloat((Math.random() * (this.limit[0].max - this.limit[0].min) + this.limit[0].min)*this.standartDeviation + this.mean).toFixed(this.tolerance);
					this.sample.push(num);
				}
			}
		}
	};

	getMeanG() {
		let sum = this.sample.reduce(function(previous, current) {
			return previous + current;
		}, 0);
		this.meanG = +(sum / this.sample.length).toFixed(this.tolerance);
	};

	getVarianceG() {
		let comulative = 0;
		for(let i = 0; i < this.sample.length; i++) {
			comulative += +(Math.pow((this.sample[i] - this.meanG), 2)).toFixed(this.tolerance);
		}
		this.varianceG = +(comulative / this.sample.length).toFixed(this.tolerance);
	};

	getStandartDeviationG() {
		this.standartDeviationG = +(Math.sqrt(this.varianceG)).toFixed(this.tolerance);
	};

	null() {
		this.sample = [];
	}

	getter() {
		this.null();
		this.inputMean();
		this.setLimits();
		this.getNums();
		this.getMeanG();
		this.getVarianceG();
		this.getStandartDeviationG();
	};
};