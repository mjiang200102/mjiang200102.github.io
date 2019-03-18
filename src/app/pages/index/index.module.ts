import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexComponent } from "./index.component";
import { routing } from "./index.routing";
import { SharedModule } from "../../shared/shared.module";
import { NgxEchartsModule } from "ngx-echarts";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { SelectModule } from "ng2-select";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    routing,
    HttpModule,
    HttpClientModule,
    SelectModule,
    FormsModule
  ],
  declarations: [IndexComponent]
})
export class IndexModule {}
