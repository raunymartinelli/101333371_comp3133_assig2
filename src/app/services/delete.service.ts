import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteComponent } from "../components/delete/delete.component";


@Injectable({
  providedIn: 'root'
})
export class DeleteModalService{
    constructor(private deleteModalService: NgbModal){}

    deleteModal( employeeId: string): Promise<boolean> {
        const modal = this.deleteModalService.open(DeleteComponent);
        modal.componentInstance.employeeId = employeeId
        return modal.result;
    }

}