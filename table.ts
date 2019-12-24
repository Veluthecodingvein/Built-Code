import { Component, OnInit,ViewChild } from '@angular/core';
import { PeriodicElement } from '../model3'
import { MatSort} from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { SqDatepicker } from '@sunquest/framework';
import { MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
//import { delimiter } from 'path';


//import { MatSort } from '@angular/material/sort'
const ELEMENT_DATA:PeriodicElement[] = [
  {position: 'Trusight 180', name: "Illumina", weight: '',date:'10/04/2019',symbol: 'Kit I'},
  {position: 'Trusight 170', name: 'Ilumina', weight: '',date:'10/10/2019', symbol: 'Kit II'},
  {position: 'Trusight 320', name: 'Ilumina', weight: '',date:'10/15/2019' ,symbol: 'Kit III'},
  {position: 'Trusight 490', name: 'Thermo Fischer', weight: '',date:'09/04/2019', symbol: 'Kit I'},
  {position: 'Trusight 200', name: 'Thermo Fischer', weight: '',date:'08/06/2019', symbol: 'Kit II'},
  {position: 'Tru 450', name: 'Caroline', weight: '',date:'07/21/2019', symbol: 'Kit II'},
  {position: 'Trusight 600', name: 'Neura', weight: '',date:'06/24/2019', symbol: 'Kit IV'},
  {position: 'Trusight 340', name: 'Thermo Ilumina', weight: '',date:'05/24/2019', symbol: 'KIT ii'},
  {position: 'Trusight', name: 'Fleny', weight: '',date:'08/14/2019', symbol: 'F',},
  {position: 'Trusight 480', name: 'Ilumina', weight: '',date:'01/30/2019', symbol: 'N2'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit
{
  title="ASSAYS";
  arrayDate:string[];
  arrDate2;
  //dateArr:string[]
  dateArr:string[]=['04/10/2019','10/10/2019','15/10/2019','04/09/2019','06/08/2019','21/07/2019','24/06/2019','23/05/2019','14/8/2019','30/01/2019'];
  fpart:any[];
  i:number;
  j:number;
  elem:any;
  elem1
  l:number;
  //expandedHeight:SqExpansionPanelDefaultOptions
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor() 
  {      //arrayDate=this.arrayDate; 
  }
   //@ViewChild(SqSort, {static: true}) sort: this.sqSort;
  ngOnInit() 
  {
     this.dataSource.paginator=this.paginator
     this.dataSource.sort=this.sort
  }
  displayedColumns: string[] = ['position','name','date','weight','symbol','bed','action'];
  dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  
  //@ViewChild(SqSort) sort: SqSort; 
  dateSort()
  { 
    //console.log('erge');
    for(this.i=0;this.i<10;this.i++)
    {
      this.arrayDate[this.i]=this.dateArr[this.i];//this.dataSource.Periodicelement.date[this.i];//date
    }
    this.j=0;
    for(this.j=0;this.j<10;this.j++)
    {
      this.elem=this.arrayDate[this.j];
      this.arrDate2[this.j]=this.remove(this.elem)
    }
  }
  remove(elem1)
  {
    while(elem1[this.i]!='\0')
    {
       if(elem1[this.i]!='/')
       {
         substring(this.i,elem1)         
         this.fpart[this.l++]=this.deduce(this.i,elem1)

       }
    }
  }
  deduce(k,elem2)
  {
     while(elem2[k]!='\0')
     {
       elem2[k]=elem2[k+1]
     }
     return(elem2);
  // while
  }
}
