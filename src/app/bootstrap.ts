/// <reference path="../typings/_custom.d.ts" />

import {bootstrap} from 'angular2/angular2';

import {
  jitInjectables,
  dynamicInjectables,
  preGeneratedInjectables
} from '../common/changeDetectionInjectables';
import {
  html5locationInjectables,
  hashlocationInjectables
} from '../common/locationInjectables';

import {httpInjectables, formInjectables} from 'angular2/angular2';
import {routerInjectables} from 'angular2/router';

import {appServicesInjectables} from './services/services';


import {App} from './components/app/app';


var universalInjectables = [
  httpInjectables,
  formInjectables,
  routerInjectables,

  appServicesInjectables
];

var platformInjectables = [
  // bestChangeDetectionInjectables,
  // hashlocationInjectables
];

bootstrap(
  App,
  [
    universalInjectables,
    platformInjectables
  ]
);
