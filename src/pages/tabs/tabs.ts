import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TasksPage } from '../tasks/tasks';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home = HomePage;
  about = AboutPage;
  contact = ContactPage;
  tasks=TasksPage

  constructor() {

  }
}
