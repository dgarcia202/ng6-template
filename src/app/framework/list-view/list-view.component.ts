import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';

/** Provides structure for the column properties expected from client component. */
export interface ListViewColumnDefinition {
  key: string;
  headerText: string;
  visible: boolean;
}

/** Definition of a custom action button. */
export interface ListViewActionButton {
  key: string;
  tooltip: string;
  icon: string;
  enabled: boolean;
}

/** Data emitted when a custom action button is pressed. */
export interface ListViewCustomActionEvent {
  actionKey: string;
  items: string[]
}

/**
 * A list view encapsulates a complete appication screen with a data table with multiple selection 
 * and sortable columns with a toolbar and a filter control.
 */
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  /** Main title line on top of the screen. */
  @Input() headline: string;

  /** Whether to show the 'add' action button. */
  @Input() showAddAction: boolean = true;
  /** Whether to show the 'edit' action button. */
  @Input() showEditAction: boolean = true;

  /** Whether to show the 'delete' action button. */
  @Input() showDeleteAction: boolean = true;

  /** Whether to show the filter text box. */
  @Input() showFilter: boolean = true;

  /** Collection of client defined custom action button. */
  @Input() customActions: ListViewActionButton[] = [];

  /** Table column definitions */
  @Input() columnDefinitions: ListViewColumnDefinition[] = [];

  @Output() add = new EventEmitter();

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<any[]>();

  @Output() customAction = new EventEmitter<ListViewCustomActionEvent>();
 
  private dataSource = new MatTableDataSource([]);

  private selection = new SelectionModel(true, []);

  /** 
   * Add, edit and delete action buttons are predefined and stored in this private array so they can
   * be injected later along with the custom ones
   */
  private defaultActions: ListViewActionButton[] = [
    { key: 'add', icon: 'add_box', enabled: true, tooltip: 'Add new item' },
    { key: 'edit', icon: 'edit', enabled: false, tooltip: 'Edit selected item' },
    { key: 'delete', icon: 'delete', enabled: false, tooltip: 'Remove selected items' }
  ];

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
