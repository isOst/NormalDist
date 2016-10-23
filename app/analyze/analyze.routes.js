routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('analyze', {
			url: '/analyze',
			template: require('./analyze.html'),
			controller: 'analyzeCtrl',
			controllerAs: 'analyze'
		});
}