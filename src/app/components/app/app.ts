/// <reference path="../../../typings/_custom.d.ts" />

import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

import {appDirectives} from '../../directives/directives';
import {appPipes} from '../../pipes/pipes';

import {Home} from '../home/home';
import {Vote} from '../vote/vote';

let styles   = require('./app.css');
let template = require('./app.html');

@Component({
  selector: 'app',
  viewInjector: [ appPipes ]
})
@View({
  directives: [
    coreDirectives,
    formDirectives,
    routerDirectives,

    appDirectives
  ],
  styles: [ styles ],
  template: template
})
@RouteConfig([
  { path: '/', as: 'home', component: Home },
  { path: '/vote/:player', as: 'vote', component: Vote }
])
export class App {
  constructor() {}
}
