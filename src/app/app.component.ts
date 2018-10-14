import { Component } from '@angular/core';

import { ListViewActionButton } from './framework/list-view/list-view.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ng6-template';

  customActions: ListViewActionButton[] = [
    { key: 'alarm', icon: 'alarm', enabled: true, tooltip: 'ring alarm' }
  ];

  showEventData(e): void {
    console.log(e);
  }
}
