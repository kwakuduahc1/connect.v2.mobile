import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITasks } from '../../model/ITasks';
import { TaskQuizPage } from '../task-quiz/task-quiz';

/**
 * Generated class for the StepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
})
export class StepsPage {

  task: ITasks;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.data[0] as ITasks;
  }

  ionViewDidLoad() {
  }

  quiz() {
    this.navCtrl.push(TaskQuizPage, [this.task]);
  }
}
