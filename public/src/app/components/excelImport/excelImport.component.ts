import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { RequestService } from "../../services/request.service";
import { ToasterService } from "src/app/services/toaster.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-excel-import",
  templateUrl: "./excelImport.component.html",
  styleUrls: ["./excelImport.component.css"],
})
export class ExcelImport implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  uploadData = [];
  uploadType = "";

  constructor(
    private toaster: ToasterService,
    private _request: RequestService,
    private route: Router
  ) {}

  ngOnInit() {}

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      //This is where the data is being displayed. dataString variable contains the json data.
      const dataString = JSON.stringify(jsonData);
      this.uploadData = JSON.parse(dataString);
    };
    reader.readAsBinaryString(file);
  }

  fileSelect(ev) {
    var inputs = document.querySelectorAll(".file-input");

    for (var i = 0, len = inputs.length; i < len; i++) {
      this.customInput(inputs[i], ev);
    }
  }

  customInput(el, ev) {
    const fileInput = el.querySelector('[type="file"]');
    const label = el.querySelector("[data-js-label]");

    if (!fileInput.value) return;

    var value = fileInput.value.replace(/^.*[\\\/]/, "");
    el.className += " -chosen";
    label.innerText = value;

    this.onFileChange(ev);
  }

  uploadJson() {
    const label = document.querySelector("[data-js-label]");
    if (label.innerHTML == "No file selected")
      this.toaster.showError("Please select a file");
    else {
      console.log(this.uploadData);
      if (this.uploadData["Medical"] !== undefined) this.uploadType = "Medical";
      else this.uploadType = "Non-Medical";

      this._request.upload(this.uploadData).subscribe(
        (res) => {
          if (res.data == null) this.toaster.showError(res.message);
          else {
            this.toaster.showSuccess("Upload successful");
            this.route.navigate(["/requests/home"]);
          }
        },
        (error) => {
          this.toaster.showError(error.error.message);
          if (error.error.statusCode === 403) this.route.navigate(["login"]);
        }
      );

      // this.toaster.showSuccess("Upload successful");
      // this.route.navigate(['/requests']);
    }
  }
}
