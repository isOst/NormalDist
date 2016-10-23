import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './generate.routes';
import generateCtrl from './generateCtrl';

import './generate.styl';

export default angular.module('app.generate', [uirouter])
	.config(routing)
	.controller('generateCtrl', generateCtrl)
	.name;