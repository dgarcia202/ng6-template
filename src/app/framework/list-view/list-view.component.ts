import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';

export interface ListViewColumnDefinition {
  key: string;
  headerText: string;
  visible: boolean;
}

export interface ListViewActionButton {
  key: string;
  tooltip: string;
  icon: string;
  enabled: boolean;
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
    { key: 'add', icon: 'add_box', enabled: true, tooltip: 'Add new item' },
    { key: 'edit', icon: 'edit', enabled: false, tooltip: 'Edit selected item' },
    { key: 'delete', icon: 'delete', enabled: false, tooltip: 'Remove selected items' }
  ];

  @ViewChild(MatTable) listViewDataTable: MatTable<any>;

  @Input() headline: string;

  @Input() showAddAction: boolean = true;

  @Input() showEditAction: boolean = true;

  @Input() showDeleteAction: boolean = true;

  @Input() showFilter: boolean = true;

  @Input() customActions: ListViewActionButton[] = [];

  @Input() columnDefinitions: ListViewColumnDefinition[] = [];

  @Output() add = new EventEmitter();

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<any[]>();

  @Output() customAction = new EventEmitter<ListViewCustomActionEvent>();
 
  dataSource = new MatTableDataSource([]);

  selection = new SelectionModel(true, []);

  constructor() { }

  @Input() set data(value: any[]) {
    this.dataSource = new MatTableDataSource(value);
  }

  get data(): any[] {
    return this.dataSource.data;
  }

  ngOnInit() {
    // Update action buttons enabled state.
    this.selection.changed.subscribe(x => {
      let itemsSelected = x.source.selected.length;
      let editButton: ListViewActionButton = this.defaultActions.filter(y => y.key == 'edit')[0];
      let deleteButton: ListViewActionButton = this.defaultActions.filter(y => y.key == 'delete')[0];

      editButton.enabled = itemsSelected == 1;
      deleteButton.enabled = itemsSelected > 0;
    });
  }

  actionButtons(): ListViewActionButton[] {
    return this.customActions.concat(this.defaultActions);
  }

  isActionVisible(actionKey: string): boolean {
    if (actionKey == 'add' && !this.showAddAction) {
      return false;
    }

    if (actionKey == 'edit' && !this.showEditAction) {
      return false;
    }

    if (actionKey == 'delete' && !this.showDeleteAction) {
      return false;
    }

    return true;
  }

  getDisplayedColumns(): string[] {

    let defaults = [ 'select' ];

    let displayedColumns = this.columnDefinitions
      .filter(el => el.visible)
      .map(el => el.key);

    return defaults.concat(displayedColumns);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  emitActionEvent(actionKey: string): void {

    switch (actionKey) {
      case 'add':
        this.add.emit();  
        break;

      case 'edit':
        this.edit.emit(this.selection.selected[0]);  
        break;

      case 'delete':
        this.delete.emit(this.selection.selected);  
        break;
        
      default:
        this.customAction.emit({ actionKey: actionKey, items: this.selection.selected});
        break;
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }  
}
