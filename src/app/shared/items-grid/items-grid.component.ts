import { Component, Input } from '@angular/core';
import { MagicItem } from './magic-item.model';

@Component({
  selector: 'jsvs-items-grid',
  templateUrl: './items-grid.component.html',
  styleUrls: ['./items-grid.component.scss']
})
export class ItemsGridComponent {
  @Input() items: any;
  public expandedRowIndex: number;

  toggleRowExpanded(rowIndex: number): void {
    this.expandedRowIndex = this.expandedRowIndex === rowIndex ? null : rowIndex;
  }
}
