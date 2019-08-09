import { Component, OnInit } from '@angular/core';
import { Data } from '../Data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setFirstTemplatePass } from '@angular/core/src/render3/state';
import { Tree } from '../Tree';
declare let $: any;




@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  addGroupForm: FormGroup;
  addLedgerForm: FormGroup
  submittedGroup = false;
  submittedLedger = false;
  tree:Tree[];
  labels:String[];

  ngOnInit() {
    //add group form
    this.addGroupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      groupCode: [''],
      selectInput: ['']
    }),
    //add ledger form
    this.addLedgerForm = this.formBuilder.group({
      ledgerName: ['', Validators.required],
      ledgerCode: [''],
      selectInput: ['']
    });

    //initialize trees
    $('#tree').treeview(
      {data:this.getTree(),
        showBorder:false,
        backColor:'rgba(0,0,0,0)' ,     
        icon: "fas fa-folder",
        selectedIcon: 'fas fa-folder-open',
        selectable: true,
        expandIcon: 'fas fa-folder-open',
        collapseIcon: 'fas fa-folder',
        onhoverColor: 'rgba(0,0,0,0)', 
        selectedBackColor:'black',
    
        state: {
          expanded: false
        },

        text:{
          color: 'red'
        }
      })
    }

    title = 'EltovProject';
    datas: Data[];

    constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private _snackBar2: MatSnackBar
      ){
        //initialize data
        this.datas = new Array();
        //get data from JSON file
        this.getJSON().then(data => {
          this.datas =  data;
          // console.log(this.datas)

          //get labels of every input (this piece of code is added to adapt to the new JSOn file)
          this.labels=new Array();
          for( var i of this.datas){
            this.labels.push(i.label);
            for(var j of i.children){
              this.labels.push(j.label)
            }
          }
          // console.log(this.labels)
          this.setTree(this.datas);
          $('#tree').treeview({
            data:this.getTree()
          });
        // let output= this.getNestedChildren(this.datas, 1);
      });
  }

public setTree(data:Data[]){
  this.datas= data;
}

public getTree(){
  let res = this.datas.map((val) => {
    // Get the label of the data 
    let label = val[Object.keys(val)[0]]; 
    let index= val[Object.keys(val)[2]]; 
    // console.log(index)
    return {
      // Return the new object structure
      text: label,
      // nodes: val[label].map((item) => ({text: item.label, nodes: item.children}))
      nodes: index.map((item) => ({text: item.label, nodes: item.children
      }))
    }
      // console.log(val[label]);
  });
  // console.log(res)
  return res;
}


  //get data from JSON file (service)
  public getJSON():Promise<Data[]> {
    return this.http.get('../assets/data.json')
        .toPromise()
        .then(response => response as Data[])
        .catch(err => {
          return Promise.reject(err);
        });  
      }


  // "Add Group" button onClick event    
  onSubmitGroup(){
    if (this.addGroupForm.invalid){
      this.submittedGroup=true;
    return;
    }
    // console.log("done");
    //show snackBar if form is valid
    this._snackBar2.open('Group sucssefully added', '', {
      duration: 2000, panelClass: ['custom-snackbar-one']
    });
    // let snackBarRef = snackBar.open('Message archived');
  }


   // "Add Ledger" button onClick event    
   onSubmitLedger(){
    if (this.addLedgerForm.invalid){
      this.submittedLedger=true;
    return;
    }
    // console.log("done");
    //show snackBar if form is valid
    this._snackBar2.open('Ledger sucssefully added', '', {
      duration: 2000, panelClass: ['custom-snackbar-one']
    });
    // let snackBarRef = snackBar.open('Message archived');
  }


  // update data where text => level and text
  // public updateData(data:Data[]){
  //   for (var i of data) {
  //     i.level= '-';
  //     for( var j=0 ;j < i.text.length; j++){
  //       if(i.text[j]=='-') i.level+='-';
  //       }
  //       var lastIndexOfLevel = i.text.lastIndexOf('-[');
  //       i.text=i.text.substr(lastIndexOfLevel+1);
  //       i.children=new Array();
  //     }
  //   }
    
    
  //for validaitons of "addGroupForm" form
  get f() { return this.addGroupForm.controls; }

  //for validaitons of "addGroupForm" form
  get g() { return this.addLedgerForm.controls; }

  //to reset the forms from error msgs when openning the modals
  resetForm(){
    this.submittedGroup=false;
    this.submittedLedger=false;
  }

}
