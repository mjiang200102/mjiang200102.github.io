import { Component, OnInit, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operator/map";
import { SearchService } from "./search.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
  providers: [SearchService]
})
export class IndexComponent implements OnInit {
  searchresults: Object;
  searchTerm$ = new Subject<string>();

  showloading: boolean = false;
  // default_data: Observable<any[]>;
  summary_data: Array<Object>;
  default_data: Array<Object>;
  new_api: string;

  objectValues = Object.values;
  date = [];
  price = [];
  volume = [];
  options: any;

  search_list: Array<Object>;
  stock_symbol = []; //["MSFT", "AAPL", "GOOG", "AMZN", "FB", "AMD", "JD"];
  //readonly
  api_url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=MSN48ISPXCFSIZL6";
  // "http://localhost:3000/dataset";

  // single selector

  constructor(private searchService: SearchService, private httpc: HttpClient) {
    this.searchService.search(this.searchTerm$).subscribe(results => {
      this.searchresults = results.bestMatches; //for search
      // this.search_list = Object.entries(this.searchresults);
      // this.search_list.forEach(y => {
      //   this.stock_symbol.push(y["1"]["1. symbol"]);
      // });
    });
  }

  public AnimationBarOption;

  // single selector
  public items: Array<any> = this.stock_symbol;

  public value: any = {};
  public _disabledV: string = "0";
  public disabled: boolean = false;

  public selected(value: any): void {
    console.log("Selected value is: ", this.stock_symbole);
    // this.new_api =
    //   "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    //   this.stock_symbole +
    //   "&apikey=MSN48ISPXCFSIZL6";
  }

  // public removed(value: any): void {
  //   console.log("Removed value is: ", value);
  // }

  // public typed(value: any): void {
  //   console.log("New search input: ", value);
  // }

  // public refreshValue(value: any): void {
  //   this.value = value;
  // }
  // end of selector

  //change url function for submit button
  url_change() {
    this.date = [];
    this.price = [];
    this.volume = [];
    this.api_url = this.new_api;
    // console.log("new API is: ", this.api_url);
    let url = this.api_url;
    this.httpc
      .get(url)
      .subscribe(res => this.SuccessGet(res), res => this.Error(res));
  }

  //change url function
  // for http client error return
  Error(res) {
    //response
    console.debug(res.json());
  }

  // for chart stock price rounding
  two_decimal(x) {
    return Math.floor(x * 100) / 100;
  }

  SuccessGet(res) {
    this.default_data = Object.entries(res["Time Series (Daily)"]);
    console.log("Returned data:", this.default_data);
    // console.log(typeof this.default_data);

    this.default_data.forEach(y => {
      this.date.push(y["0"]);
      this.price.push(y["1"]["4. close"]);
      this.volume.push(y["1"]["5. volume"]);
    });

    this.price = this.price.map(this.two_decimal);

    var colors = ["#ffffff", "#d14a61"];

    this.options = {
      color: colors,
      legend: {
        data: ["Close Price", "Volume"],
        align: "left"
      },
      tooltip: {},
      xAxis: {
        data: this.date,
        silent: false,
        inverse: true,
        splitLine: {
          show: false
        }
      },
      yAxis: [
        {
          type: "value",
          name: "Stock Price",
          // min: 0,
          // max: 250,
          position: "left",
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: "{value}"
          }
        },
        {
          type: "value",
          name: "Volume",
          // min: 0,
          // max: 250,
          position: "right",
          // offset: 80,
          axisLine: {
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: "{value}"
          }
        }
      ],
      series: [
        {
          name: "Close Price",
          type: "line",
          data: this.price,

          animationDelay: function(idx) {
            return idx * 10;
          }
        },
        {
          name: "Volume",
          type: "bar",
          yAxisIndex: 1,
          data: this.volume,
          animationDelay: function(idx) {
            return idx * 10 + 100;
          }
        }
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function(idx) {
        return idx * 5;
      }
    };

    // console.log("date returned", this.price);

    this.summary_data = res["Meta Data"]["2. Symbol"];
    console.log("Returned summary_data:", this.summary_data);
    // console.log(typeof this.summary_data);
  }

  ngOnInit() {
    // this.AnimationBarOption = this._chartsService.getAnimationBarOption(); //chart

    let headers = new HttpHeaders().set("Authorization", "auth-token");
    let url = this.api_url;
    this.httpc
      .get(url, { headers })
      .subscribe(res => this.SuccessGet(res), res => this.Error(res));
  }

  stock_symbole: any;
  company_name: any;
  eventemitter: EventEmitter<Object> = new EventEmitter<Object>();

  SelectGrid(_selected: Object) {
    this.eventemitter.emit(_selected);
    this.stock_symbole = Object.values(_selected)[0];
    this.company_name = Object.values(_selected)[1];
    this.new_api =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
      this.stock_symbole +
      "&apikey=MSN48ISPXCFSIZL6";
    this.searchresults = "";
  }
}
