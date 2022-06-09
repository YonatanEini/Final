import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showReport() {
    // Report's Secured Token
    let accessToken = '<ADD-THE-SECURED-TOKEN-FOR-REPORT-HERE>';

    // Embed URL
    let embedUrl = 'https://embedded.powerbi.com/appTokenReportEmbed?reportId=<YOUR-REPORT-ID>';

    // Report ID
    let embedReportId = '<YOUR-REPORT-ID>';

    // Configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    let config= {
        type: 'report',
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedReportId,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
        }
    };

    // Grab the reference to the div HTML element that will host the report.
    let reportContainer = <HTMLElement>document.getElementById('reportContainer');

    // Embed the report and display it within the div container.
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    let report = powerbi.embed(reportContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function() {
        console.log("Loaded");
    });
}
}
