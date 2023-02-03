import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.scss']
})
export class StocksTableComponent implements OnInit {
  stocks: any[] = [];
  selectedRow: any;
  stockValues: any[] = [];
  selected: any[] = [];
  lastSelected: any[] = [];
  selectedStock: any;
  reorderable = true;

  searchText: string = "";

  SelectionType = SelectionType;

  columns = [
    { prop: 'stock' },
    { prop: 'industry' },
    { prop: 'sector' },
    { prop: 'currency_code' }
  ];

  columnsStockValues = [
    { prop: 'stock', name: 'Stock' },
    { prop: 'date', name: 'Date' },
    { prop: 'value', name: 'Value' }
  ];

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.stocksService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  selectRow({ selected }: any) {

    if (selected && selected.length > 0) {
      this.selected[0] = selected[0];
      if (this.selected[0] === this.lastSelected) {
        this.selected = [];
        this.selectedStock = null;
        this.stockValues = [];
      } else {
        this.lastSelected = this.selected[0];
        this.stocksService.getStockValues(selected.id).subscribe(stockValues => {
          this.selectedStock = this.stocks?.find(stock => stock.id === selected[0].id);
          stockValues.forEach(value => {
            value.stock = this.selectedStock?.stock;
          });

          this.stockValues = stockValues;
        });
      }
    }

  }

  exportAsJson() {
    const data = JSON.stringify(this.stockValues);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
