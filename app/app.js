import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import analyze from './analyze/analyze';
import generate from './generate/generate';

import './style.styl';


angular.module('app', [uirouter, analyze, generate])
	.config(routing);