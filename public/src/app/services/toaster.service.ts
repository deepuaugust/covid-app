import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ToasterService {
  constructor(private toaster: ToastrService) {}

  showError(msg) {
    this.toaster.error(msg);
  }

  showSuccess(msg){
      this.toaster.success(msg);
  }
}