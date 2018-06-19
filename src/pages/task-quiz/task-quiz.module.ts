import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskQuizPage } from './task-quiz';

@NgModule({
  declarations: [
    TaskQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskQuizPage),
  ],
})
export class TaskQuizPageModule {}
