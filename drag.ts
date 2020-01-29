import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfigService } from 'src/config.service';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'dragdrop',
  templateUrl: './dragdrop.html',
  styleUrls: ['./dragdrop.css'],
})
export class Dragdrop {

  constructor(private configService: ConfigService) 
  {
    this.getConfigs();
    this.getVariants();
    this.allConcepts();
  }

  list = 'List of Annotation Definition Fields';

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
    // 'Walk dog'
  ];

  doneConcepts = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropConcepts(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  frdConfigs: Array<any> = new Array<any>();

  getConfigs() {
    this.configService.configs().subscribe((serverResponse: any) => {
      this.frdConfigs = serverResponse.data;

      this.frdConfigs.sort(function(a, b)
      {
          return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
      });

      this.frdConfigs.forEach((config)=>
      {
          config.name = config.default_status === 'USER_DEFAULT' ? (config.name + ' - Default') : config.name;
      });

      console.log(this.frdConfigs);
    }

    );

  }

  variantFieldByNameMap = {};
  fltresdisplayConfig: any;
  variantFieldItems = [];
  data = [];
  getVariants(){

    this.configService.variants().subscribe((serverResponse: any) => {

    
          var data = serverResponse.data;
          this.data = data;

          // list of variant fields that are available for selection
          var available = data.map(function(field) {
              return field.name;
          });

          // list of variant fields that have been selected
          var selected=[];

          data.forEach((field)=>
          {
              this.variantFieldByNameMap[field.name] = field;
          });

          // this.fltresdisplayConfig.variantFields.sort(function(a, b){ return a.displayOrder - b.displayOrder;});
          // this.fltresdisplayConfig.variantFields.forEach((vf)=>
          // {
          //     var vField = vf.variantForm;
          //     // If an item is in the selection list, remove it from available list
          //     this.removeFromArr(available, vField.name);
          //     selected.push(vField.name);
          // });

          this.variantFieldItems.push(
              {
                  index : 0,
                  listName: 'List of Variant Fields',
                  listItems: available.map(function(field) { return { label: field, type: 'variantField' }; }),
                  dragging: false
              });

          this.variantFieldItems.push(
              {
                  index : 1,
                  listName: 'Selected Variant Fields',
                  listItems:selected.map(function(field) { return { label: field, type: 'variantField' }; }),
                  dragging: false
              });
      
      console.log(this.variantFieldItems);
    })
  }

 removeFromArr(arr, toRemove)
  {
    arr.forEach((r)=>
      {
          if(r === toRemove)
          {
              var idx = arr.indexOf(r);
              if (idx >= 0) {
                  arr.splice(idx, 1);
              }
          }
      });
  }

//  onLoadFrdConfig(serverResponse)
//   {
//       this.fltresdisplayConfig = serverResponse.data;
//       $scope.frdAnnotFieldsByLabel={};
//       $scope.fltresdisplayConfig.isDefault = (serverResponse.data.hasOwnProperty('default_status') &&
//           serverResponse.data.default_status === 'USER_DEFAULT');

//       var fields = $scope.fltresdisplayConfig.annotFields;

//       for (var i = 0; i < fields.length; i++)
//       {
//           var item = fields[i];
//           var form = item.factConceptFieldForm;
//           $scope.frdAnnotFieldsByLabel[form.factConceptName + ':' + form.name] = item;
//       }
//       loadShuttleFields();
//   }

concepts: [];
available = [];

allConcepts(){

  this.configService.getAllConcepts().subscribe((serverResponse: any) => {

    this.concepts = serverResponse.data;

    // this.concepts.sort(function(a, b){ return a.localeCompare(b.toUpperCase()); });


    this.concepts.forEach((fc:any)=>
    {
        for (var j = 0; j < fc.fields.length; j++) {
            var field = fc.fields[j];
            // $scope.factConceptFields[field.name] = fc;
            var name = field.factConceptName + ':' + field.name;
            this.available.push(name);
            // $scope.factConceptFieldByLabelMap[label] = field;
        }
    });

    this.available.sort((a,b) => a.localeCompare(b));

    console.log(this.concepts);
  });
}

}
