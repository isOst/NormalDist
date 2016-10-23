import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './analyze.routes';
import analyzeCtrl from './analyzeCtrl';

import './analyze.styl';

export default angular.module('app.analyze', [uirouter])
	.config(routing)
	.controller('analyzeCtrl', analyzeCtrl)
	.name;