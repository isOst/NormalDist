export default class analyzeCtrl {

	constructor() {
		this.pirsen = 0;
		this.pirsenMsg;
		this.PIRSEN_THEORY = 14.1;
		this.sample = [363.5, 363.4, 285.7, 339.4, 346.3,
						324.6, 238.3, 308.8, 290.5, 289.5, 
						290.0, 286.8, 348.2, 267.5, 333.2, 
						306.5, 341.7, 280.6, 291.6, 304.3,
						281.4, 232.1, 290.8, 349.8, 327.6,
						250.0, 358.2, 337.3, 362.8, 342.4,
						274.2, 264.7, 266.7, 307.2, 302.8,
						285.8, 258.0, 287.6, 261.4, 307.3,
						291.5, 311.4, 296.4, 337.8, 318.6,
						349.2, 302.7, 339.2, 302.3, 343.0,];
		this.tolerance;
		this.mean = 0;
		this.variance = 0;
		this.standartDeviation = 0;
		this.coefOfVar = 0;
		this.limit = [
			{
				nums: [],
				amount: 0,
				N: 0.0048
			},
			{
				nums: [],
				amount: 0,
				N: 0.0606
			},
			{
				nums: [],
				amount: 0,
				N: 0.2476
			},
			{
				nums: [],
				amount: 0,
				N: 0.3829
			},
			{
				nums: [],
				amount: 0,
				N: 0.2476
			},
			{
				nums: [],
				amount: 0,
				N: 0.0606
			},
			{
				nums: [],
				amount: 0,
				N: 0.0048
			}
		];

	}

	addItem() {
		if( isNaN(this.addNumber) == false) {
			this.sample.push(this.addNumber);
			this.addNumber = null;
		} else {
			return;
		}
	};

	addItemKey(e) {
		e = e.keyCode;
		if(e == 9 || e == 13 || e == 32) {
			this.addItem();
		} else {return}
	}

	removeItem(i) {
		this.sample.splice(i, 1);
	}

	getMean() {
		let sum = this.sample.reduce(function(previous, current) {
			return previous + current;
		}, 0);
		this.mean = +(sum / this.sample.length).toFixed(this.tolerance);
	};

	getVariance() {
		let comulative = 0;
		for(let i = 0; i < this.sample.length; i++) {
			comulative += +(Math.pow((this.sample[i] - this.mean), 2)).toFixed(this.tolerance);
		}
		this.variance = +(comulative / this.sample.length).toFixed(this.tolerance);
	};

	getStandartDeviation() {
		this.standartDeviation = +(Math.sqrt(this.variance)).toFixed(this.tolerance);
	};

	getCoefOfVar() {
		this.coefOfVar = +(this.standartDeviation / this.variance).toFixed(this.tolerance + 1);
	};

	getNumsInLimits() {

		for(let i = 0; i < this.limit.length; i++) {
			this.limit[i].min = this.mean - (3.5 - i) * this.standartDeviation;
			this.limit[i].max = this.mean - (2.5 - i) * this.standartDeviation;
		}

		for(let i = 0; i < this.sample.length; i++) {
			for(let j = 0; j < this.limit.length; j++) {
				if(this.sample[i] < this.limit[j].max && this.sample[i] > this.limit[j].min) {
					this.limit[j].nums.push(this.sample[i]);
					this.limit[j].amount = this.limit[j].nums.length;
				}
			}
		}
	};

	sampleCheck() {
		for(let i = 0; i < this.limit.length; i++) {
			this.pirsen += Math.pow((this.limit[i].amount / this.sample.length - this.limit[i].N),2) / this.limit[i].N;
		}

		if(this.pirsen < this.PIRSEN_THEORY) {
			this.pirsenMsg = "Hypothesis of normal distribution is accepted"
		} else {
			this.pirsenMsg = "Hypothesis of normal distribution is rejected"
		}
	};

	null() {
		this.mean = 0;
		for(let i = 0; i < this.limit.length; i++) {
			this.limit[i].nums = [];
			this.limit[i].amount = 0;
		}
		this.pirsen = 0;
	}

	getter() {
		this.null();
		this.getMean();
		this.getVariance();
		this.getStandartDeviation();
		this.getCoefOfVar();
		this.getNumsInLimits();
		this.sampleCheck();
	};

}