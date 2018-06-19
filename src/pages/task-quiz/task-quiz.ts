import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITasks } from '../../model/ITasks';
import { ISteps } from '../../model/ISteps';

/**
 * Generated class for the TaskQuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-quiz',
  templateUrl: 'task-quiz.html',
})
export class TaskQuizPage {

  tasks: Array<{ StepsID: number, Step: string, Selected: boolean }>;
  arranged: Array<{ StepsID: number, isCorrect: boolean, Step: string }>;
  task: string;
  isMarked: boolean = false;
  _steps: ITasks;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.data[0].Task;
    this._steps = this.navParams.data[0] as ITasks;
    this.tasks = this.transform(this.navParams.data[0] as ITasks)
    this.arranged = [];
  }

  ionViewDidLoad() {
  }

  transform(task: ITasks): Array<{ StepsID: number, Step: string, Selected: boolean }> {
    let arr: Array<{ StepsID: number, Step: string, Selected: boolean }> = [];
    task.Steps.forEach(x => arr.push({ StepsID: x.StepsID, Step: x.Step, Selected: false }));
    return arr;
  }

  add(step: { StepsID: number, Step: string, Selected: boolean }) {
    this.arranged.push({ StepsID: step.StepsID, Step: step.Step, isCorrect: false });
    step.Selected = true;
  }

  remove(step: { StepsID: number, isCorrect: boolean, Step: string }) {
    var item = this.tasks.find(x => x.StepsID === step.StepsID);
    item.Selected = false;
    let ix: number = this.arranged.findIndex(x => x.StepsID === step.StepsID);
    this.arranged.splice(ix, 1);
  }

  mark() {
    for (var i = 0; i < this.arranged.length; i++) {
      let ans = this.arranged[i].StepsID === this._steps.Steps[i].StepsID;
      this.arranged[i].isCorrect = ans;
    }
  }
}
