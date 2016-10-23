routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('generate', {
			url: '/generate',
			template: require('./generate.html'),
			controller: 'generateCtrl',
			controllerAs: 'generate'
		});
}