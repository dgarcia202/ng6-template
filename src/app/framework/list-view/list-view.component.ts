import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface ListViewActionButton {
  key: string;
  tooltip: string;
  icon: string;
}

export interface ListViewCustomActionEvent {
  actionKey: string;
  items: string[]
}

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  private defaultActions: ListViewActionButton[] = [
    { key: 'add', icon: 'add_box', tooltip: 'Add new item' },
    { key: 'edit', icon: 'edit', tooltip: 'Edit selected item' },
    { key: 'delete', icon: 'delete', tooltip: 'Remove selected items' }
  ];

  @Input() customActions: ListViewActionButton[] = [];

  @Input() headline: string;

  @Output() add = new EventEmitter();

  @Output() edit = new EventEmitter<string>();

  @Output() delete = new EventEmitter<string[]>();

  @Output() customAction = new EventEmitter<ListViewCustomActionEvent>();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = ELEMENT_DATA;

  constructor() { }

  actionButtons(): ListViewActionButton[] {
    return this.customActions.concat(this.defaultActions);
  }

  emitActionEvent(actionKey): void {

    switch (actionKey) {
      case 'add':
        this.add.emit();  
        break;

      case 'edit':
        this.edit.emit('12344');  
        break;

      case 'delete':
        this.delete.emit(['2342343', '43423254']);  
        break;
        
      default:
        this.customAction.emit({ actionKey: actionKey, items: []});
        break;
    }
  }

  ngOnInit() {
  }
}
