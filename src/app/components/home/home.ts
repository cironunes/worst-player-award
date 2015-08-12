/// <reference path="../../../typings/_custom.d.ts" />

import {Component, View} from 'angular2/angular2';
import {formDirectives, NgControl, NgFormModel, FormBuilder, Validators} from 'angular2/forms';

import {appDirectives, angularDirectives} from '../../directives/directives';

import {PlayerService} from '../../services/PlayerService';

let styles   = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  directives: [ angularDirectives, appDirectives, formDirectives ],
  styles: [ styles ],
  template: template
})
export class Home {
  form: any;
  nameInput: any;
  playerService;
  loser;

  constructor(fb: FormBuilder, playerService: PlayerService) {
    this.form = fb.group({
      firstName: ['', Validators.required]
    });

    this.playerService = playerService;
    this.nameInput = this.form.controls.firstName;
  }

  addPlayer($event, name) {
    $event.preventDefault();

    this.playerService.add(name);
    this.nameInput.updateValue('');
  }

  removePlayer(index) {
    this.playerService.remove(index);
  }

  getLoser() {
    this.loser = this.playerService.getLoser();
  }
}
