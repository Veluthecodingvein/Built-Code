import { Component, OnInit,ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SqTableDataSource , SqPaginator,SqSort} from '@sunquest/framework';
import { model5 } from '../model5';

@Component({
  selector: 'app-teststable',
  templateUrl: './teststable.component.html',
  styleUrls: ['./teststable.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeststableComponent implements OnInit 
{
  displayedColumns = ['tname','tcode','dateassay','assay','kit','vers','versdate','action'];
  dataSource = new SqTableDataSource<model5>(ENTRIES_DATA);
  pageSize: string; 
  pageSizeOptions:any[]; 
  
  @ViewChild(SqPaginator) paginator: SqPaginator;
  @ViewChild(SqSort) sort: SqSort;

  
  constructor()
  {

  }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 
  }

}


const ENTRIES_DATA:model5[]=[{tname:'Test1',tcode:'Code 1',dateassay:'2019/1/19',assay:'Assay1',kit:'Kit1',vers:1,versdate:'2019/1/19'},
                    {tname:'Test2',tcode:'Code 2',dateassay:'2019/1/19',assay:'Assay2',kit:'Kit2',vers:2,versdate:'2019/1/19'},
                    {tname:'Test3',tcode:'Code 3',dateassay:'2019/1/19',assay:'Assay3',kit:'Kit3',vers:3,versdate:'2019/1/19'},
                    {tname:'Test4',tcode:'Code4',dateassay:'2019/1/19',assay:'Assay4',kit:'Kit4',vers:4,versdate:'2019/1/19'},
                    {tname:'Test5',tcode:'Code5',dateassay:'2019/4/19',assay:'Assay5',kit:'kit5',vers:5,versdate:'2019/1/19'},
                    {tname:'Test6',tcode:'Code6',dateassay:'2019/10/10',assay:'Assay6',kit:'Kit6',vers:6,versdate:'2019/1/19'},
                    {tname:'Test7',tcode:'Code7',dateassay:'2019/5/19',assay:'Assay7',kit:'Kit7',vers:7,versdate:'2019/1/19'},
                    {tname:'Test8',tcode:'Code8',dateassay:'2019/6/23',assay:'Assay8',kit:'Kit8',vers:8,versdate:'2019/1/19'},
                    {tname:'Test9',tcode:'Code9',dateassay:'2019/4/24',assay:'Assay9',kit:'Kit9',vers:9,versdate:'2019/1/19'},
                    {tname:'Test10',tcode:'Code10',dateassay:'2019/8/18',assay:'Assay10',kit:'Kit10',vers:10,versdate:'2019/1/19'}];
