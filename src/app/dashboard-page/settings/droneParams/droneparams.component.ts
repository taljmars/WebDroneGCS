import { Component, OnInit , ViewChild, HostListener, ElementRef} from '@angular/core';
import { DroneService, DroneEventListener } from '../../drone/drone.service';
import { MdbTableDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'DroneParams',
  templateUrl: './droneparams.component.html',
  styleUrls: ['./droneparams.component.css']
})
export class DroneParams implements DroneEventListener{

  public paramsList: Array<any> = []
  public originalParamsList: Array<any> = []
  private modified: Set<Number> = new Set();
  public groups: Set<String> = new Set();
  private paramterOnDrone: Boolean = false;

  constructor(private droneService: DroneService) {
    this.droneService.addEventListener(this);
    droneService.getParameters(data => {
      console.log("Params " + data)
      this.paramterOnDrone = data["online"];
      var idx = 0
      for (let param of data["parameters"]) {
        this.paramsList.push({
          id: idx,
          name: param["name"],
          title: param["title"],
          value: param["value"],
          defaultValue: param["defaultValue"],
          unit: param["unit"],
          description: param["description"],
          group: param["group"],
          readOnly: param["readOnly"],
          type: param["type"],
        })
        this.originalParamsList.push({
          id: idx,
          name: param["name"],
          title: param["title"],
          value: param["value"],
          defaultValue: param["defaultValue"],
          unit: param["unit"],
          description: param["description"],
          group: param["group"],
          readOnly: param["readOnly"],
          type: param["type"],
        })
        this.groups.add(param["group"])
        idx++
      }
    })
  }

  onDroneEvent(event: any) {
  }

  editField: string;

  updateList(id: number, property: string, event: any) {
    console.log("Update list = " + id + " " + property)
    const editField = event.target.textContent;
    this.paramsList[id][property] = editField;
    this.modified.add(id)
  }

  changeValue(id: number, property: string, event: any) {
    if (event.key == "Enter") {
      // event.preventDefault();
      event.target.blur();
      return
    }
    console.log("Change Value = " + id + " " + property)
    this.editField = event.target.textContent;
  }

  searchText: string = ''; 

  onTopicSelect(val: any) {
    console.log(val)
  }

  // @HostListener('input') 
  // oninput() { 
  //   this.searchItems();
  // }

  onInput(event: any) {
      this.searchItems()
  }

  searchItems() { 
    console.log("Search text = " + this.searchText)

    if (this.searchText) {
      let searchStringUpper = this.searchText.toUpperCase()

      this.paramsList = this.originalParamsList.filter((value, idx, arr) => {
        if (value.name.toUpperCase().includes(searchStringUpper) || 
            value.title.toUpperCase().includes(searchStringUpper) || 
            value.description.toUpperCase().includes(searchStringUpper))
          return true;
        return false;
      })
    } 
    if (!this.searchText) { 
      this.paramsList = this.originalParamsList
    }
  }

  isEdit(id: Number) {
    return this.modified.has(id)
  }

  isParametersOnDrone() {
    return this.paramterOnDrone;
  }
}