/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/angular2';
import {playerInjectables} from './PlayerService';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  playerInjectables
];
