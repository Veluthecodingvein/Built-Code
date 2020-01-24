import { Component, ViewChild, OnInit } from '@angular/core';
import { MatExpansionPanel, fadeInContent } from '@angular/material';
import { Model } from '../model'
import { ConfigService } from '../../config.service';
import { CompletedModel } from '../completedModel';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'completed-panel',
  templateUrl: './completed.panel.html',
  styleUrls: ['./completed.panel.css'],
})
export class CompletedPanel implements OnInit 
{
  completedModel: Array<CompletedModel> = new Array<CompletedModel>();
  completedItems: Array<CompletedModel> = [];

  favoriteItems: Array<any>= new Array<any>();

  loadMoreSpinner: boolean = false;

  constructor(private configService: ConfigService)
  {
    // let completedModel = new CompletedModel();
    this.showConfig();
  }

  // @ViewChild('myPanel') myPanel: MatExpansionPanel;
  matIcon = 'keyboard_arrow_down' || 'keyboard_arrow_up';

  panelOpenState: boolean = false;

  ngOnInit() 
  {
    //   this.myPanel.expandedChange.subscribe((data) => {
    this.matIcon = this.panelOpenState ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    // }); 
  }


  isExpanded(data)
  {
      var isInit = (data.name == 'Annotation Data Initialization' && data.loadProcessId && data.loadProcessId < 0);
      return isInit == false && data.expanded == true;
  }

   hasSecondaryCompute(data)
  {
      return this.lastCompletedSecondaryCompute(data) != null;
  }

   secondaryComputeNameFor(data)
  {
      var cp = this.lastCompletedSecondaryCompute(data);
      return cp != null ? cp.name : null;
  }

   secondaryComputeStatusFor(data)
  {
      var cp = this.lastCompletedSecondaryCompute(data);
      return cp != null ? cp.status : null;
  }


   secondaryComputeStatusDateFor(data)
  {
      var cp = this.lastCompletedSecondaryCompute(data);
      return cp != null ? cp.statusDate : null;
  }

   lastCompletedSecondaryCompute(data)
   {
      var last = null;
      if ((data.dataSetId || data.analysisId) && data.computes && data.computes.length > 0)
      {
          var dt = null;
          data.computes.forEach( (cp)=>
          {
              if (cp.partOfCreate == false)
              {
                  if (dt == null || cp.statusDate > dt)
                  {
                      last = cp;
                      dt = cp.statusDate;
                  }
              }
          });
      }
      return last;
  }

 messageFor(data)
  {
      var status = this.statusFor(data);
      var msg = null;
      if (status == 'FAILED')
      {
          if (data.processes && (data.analysisId || data.dataSetId))
          {
              msg = data.processes.errorMessage;
          }
          else
          {
              msg = data.errorMessage;
          }
      }
      else
      {
          if (data.processes && (data.analysisId || data.dataSetId))
          {
              msg = data.processes.statusMessage;
          }
          else
          {
              msg = data.statusMessage;
          }
      }
      if (msg != null && msg.toUpperCase() == status)
      {
          msg = null;
      }
      return msg;
  }

  expandPannel() {
    // this.myPanel.expanded = !this.myPanel.expanded;
    this.panelOpenState = !this.panelOpenState;
    this.matIcon = this.panelOpenState ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  expandPannel1(item: Model) 
  {
    item.panelOpenState = !item.panelOpenState;
    item.matIcon = item.panelOpenState ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }


  // panelOpenState = false;

  lastProcessingRefresh = new Date();

  myClickFunction(event) 
  {
    //just added console.log which will display the event details in browser on click of the button.
    alert("Button is clicked");
    console.log(event);
  }


  public items: Array<Model> = [
    { id: 1, text: 'Sentence 1', panelOpenState: false, matIcon: 'keyboard_arrow_down' || 'keyboard_arrow_up' },
    { id: 2, text: 'Sentence 2', panelOpenState: false, matIcon: 'keyboard_arrow_down' || 'keyboard_arrow_up' },
    { id: 3, text: 'Sentence 3', panelOpenState: false, matIcon: 'keyboard_arrow_down' || 'keyboard_arrow_up' },
    { id: 4, text: 'Sentence 4', panelOpenState: false, matIcon: 'keyboard_arrow_down' || 'keyboard_arrow_up' }
  ];



  loadInitialData() {

    console.log("this.completedModel");
    console.log(this.completedModel);
    // this.completedItems = new Array<CompletedModel>();

    this.completedModel.forEach(value => {
      const completedItem = new CompletedModel();
      completedItem.name = value.name;

      completedItem.analysisId = value.analysisId == undefined ? undefined : value.analysisId;
      completedItem.dataSetId = value.dataSetId == undefined ? undefined : value.dataSetId;
      completedItem.version = value.version == undefined ? undefined : value.version;
      completedItem.statusDate = value.statusDate == undefined ? undefined : value.statusDate;
      completedItem.status = value.status == undefined ? undefined : value.status;

      completedItem.computeId = value.computeId == undefined ? undefined : value.computeId;
      completedItem.target = value.target == undefined ? undefined : value.target;
      completedItem.loadProcessId = value.loadProcessId == undefined ? undefined : value.loadProcessId;
      completedItem.loadProcess = value.loadProcess == undefined ? undefined : value.loadProcess;

      completedItem.dataSetName = value.dataSetName == undefined ? undefined : value.dataSetName;
      completedItem.contentName = value.contentName == undefined ? undefined : value.contentName;
      
      if (value.processes !== undefined) 
      {
        completedItem.processes.statusDate = value.processes.statusDate == undefined ? undefined : value.processes.statusDate;
        completedItem.processes.status = value.processes.status == undefined ? undefined : value.processes.status;
      }

      completedItem.computes = value.computes;
      // completedItem.panelOpenState = false;
      // completedItem.matIcon = 'keyboard_arrow_down' || 'keyboard_arrow_up';

      this.completedItems.push(completedItem);

    });
    // this.completedModel.forEach(function (value) {

    // const completedItem = new CompletedModel();
    // completedItem.name = value.name;

    // completedItem.analysisId = value.analysisId == undefined ? undefined : value.analysisId;
    // completedItem.dataSetId = value.dataSetId == undefined ? undefined : value.dataSetId;
    // completedItem.version = value.version == undefined ? undefined : value.version;

    // console.log(value.matIcon);

    // }); 

    // for (let i = 0; i < this.completedModel.length; i++) {

    //   const completedItem = new CompletedModel();
    //   completedItem.name = this.completedModel[i].name;

    //   console.log(this.completedItems[i].analysisId);


    //   // completedItem.analysisId = this.completedItems[i].analysisId == undefined ? 0 : this.completedItems[i].analysisId;
    //   // completedItem.dataSetId = this.completedItems[i].dataSetId == undefined ? 0 : this.completedItems[i].dataSetId;
    //   completedItem.version = this.completedItems[i].version;

    //   this.completedItems.push(completedItem);

    //   console.log(this.completedModel[i].name);
    // }

    //   for (let prop in this.completedModel) {
    //     console.log(prop);
    // }

  }

  loadMore() 
  {
      this.loadMoreSpinner = true;
      console.log(this.completedItems[this.completedItems.length - 1]);
      this.configService.getMoreCompletedItems(this.statusDateFor(this.completedItems[this.completedItems.length - 1])).subscribe((serverResponse: any) => {
      console.log("serverResponse");
      console.log(serverResponse);
      this.completedModel = new Array<CompletedModel>();
      this.completedModel = serverResponse.data;
      this.loadInitialData();
      this.loadMoreSpinner = false;
    }
    )

    // https://gi-qa11.sqdev.sunquestinfo.com/fast/rest/dashboard/activity/completed?f=1575541152063&s=10

    // let model = new Model();
    // model.id = 5;
    // model.text = 'Sentence 5';
    // model.panelOpenState = false;
    // model.matIcon = 'keyboard_arrow_down' || 'keyboard_arrow_up';

    // this.items.push(model);
  }



  showConfig() 
  {
    this.configService.getConfig().subscribe((a: any) => {
      this.completedModel = a.data;
      console.log(this.completedModel);
      this.loadInitialData();
  }
   );
    console.log("I am Done");

  }

  statusDateFor(data) {
    if (data.analysisId || data.dataSetId) {
      // console.log("process");
      return data.processes.statusDate;
    }
    else {
      // console.log("data");
      return data.statusDate;
    }
  }

  statusFor(data) 
  {
    if (data.analysisId || data.dataSetId) 
    {
      return data.processes.status;
    }
    else 
    {
      return data.status;
    }
  }

  typeFor(data) 
  {
    if (data.dataSetId) {
      return 'Sample Data Load';
    }
    else if (data.loadProcessId) {
      return data.target == 'REFERENCE' ? 'Annotation Data Load' : 'Sample Data Load';
    }
    else if (data.analysisId) {
      return 'Annotated Sample Data';
    }
    else if (data.computeId) {
      return 'Annotation Data Process';
    }
    else {
      return 'Data Load';
    }
  }

 iconFor(data)
  {
    console.log(data);
    console.log("data");
      // data set load
      if (data.dataSetId)
      {
          return 'sampledataload';//'gdr-icons:sample-data';
      }
      // annotate sample data
      else if (data.analysisId)
      {
          return 'AnnotatedSampleData';//'gdr-icons:annotated-sample-data';
      }
      // load process
      else if (data.loadProcessId)
      {
          // return data.target == 'REFERENCE' ? 'gdr-icons:annotation-data' : 'gdr-icons:sample-data';
          return data.target == 'REFERENCE' ? 'AnnotationDataLoad' : 'sampledataload';
      }
      // reference compute process
      else if (data.computeId)
      {
          // return 'gdr-icons:annotation-data';
          return 'gdr-icons:AnnotationDataLoad';
      }
  }

 nameFor(data)
  {
      if (data.loadProcessId)
      {
          if (data.target == 'DATA_SET' && data.dataSetName)
          {
              return data.dataSetName;
          }
          else
          {
              var name = data.contentName;
              var idx = Math.max(name.lastIndexOf('/'), name.lastIndexOf('\\'));
              if (idx < name.length - 1)
              {
                  return name.substring(idx + 1);
              }
              else
              {
                  return name;
              }
          }
      }
      else if (data.analysisId || data.dataSetId)
      {
          return data.name;
      }
      else if (data.computeId)
      {
          return 'Annotation Data';
      }
  }

  isBookmarkable(item)
  {
      return item.loadProcessId || item.dataSetId || item.analysisId;
  }

 isBookmarked(item)
  {
      if (this.favoriteItems)
      {
          var bmk = this.asBookmark(item);
          for (var i = 0; i < this.favoriteItems.length; i++)
          {
              var bookmarked = this.asBookmark(this.favoriteItems[i]);
              if (bookmarked.type == bmk.type && bookmarked.name == bmk.name)
              {
                  return true;
              }
          }
      }
      return false;
  }

  asBookmark(item)
  {
      var bmk = null;
      if (item.dataSetId)
      {
          bmk = { type : 'DataSet', typeId : item.dataSetId, name : item.name };
      }
      else if (item.analysisId)
      {
          bmk = { type : 'Analysis', typeId : item.analysisId, name : item.name };
      }
      else if (item.loadProcessId)
      {
          bmk = { type : 'LoadProcess', typeId : item.loadProcessId, name : item.contentName };
      }
      return bmk;
  }

  addBookmark(data)
  {
    alert("Yet to implement");
  }

  removeBookmark(data)
  {
    alert("Yet to implement");
  }

  cloneItem(data)
  {
    alert("Yet to implement");
  }

  isCloneable(data)
  {
    return true;
  }

  isAnnotatable(data)
  {
      if (data.dataSetId)
      {
          // return $scope.userPerm.hasPermission("Load/Annotate", "Annotate Sample Data");
      }
      else
      {
          // return false;
          return true;
      }
  }

 annotateItem(data)
  {

    alert("Yet to implement");
      // if (data.dataSetId)
      // {
      //     $location.search('dataSetId', data.dataSetId);
      //     $location.path('/analysis/new');
      // }
  }

}
