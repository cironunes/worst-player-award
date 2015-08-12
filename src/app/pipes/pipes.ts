/// <reference path="../../typings/_custom.d.ts" />

import {Pipes} from 'angular2/change_detection';

import {rxAsync} from './RxPipe';

export var appPipes = [
  Pipes.extend({
    'async': rxAsync
  })
];
