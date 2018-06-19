import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITasks } from '../../model/ITasks';
import { HttpProvider } from '../../providers/http/http';
import { IPrograms } from '../../model/IPrograms';
import { StepsPage } from '../steps/steps';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
    templateUrl: 'tasks.html'
})
export class TasksPage {
  tasks: ITasks[];
  programs: IPrograms[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider) {
    this.programs = this.http.getPrograms();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

  getTasks(id: number) {
    this.tasks = this.http.getTasks(id) as ITasks[];
    
  }
  viewSteps(t: ITasks) {
    this.navCtrl.push(StepsPage, [t]);
  }
}
