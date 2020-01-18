import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatProgressBarModule  } from '@angular/material';
import { HttpService } from 'src/app/core/services/http.service';
import { EventObj } from 'src/app/shared/model/eventlist.model';
import * as d3 from 'd3';
import * as $ from 'jquery';
import { sharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  organizer: string;
  company: string;
  about: string;
  scheduled: string;
  duration: string;
  capacity: number;
  allEventList = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource();
  public displayedColumns: string[] = [
    'organizer',
    'company',
    'about',
    'scheduled',
    'duration',
    'capacity',
  ];
  eventObj = new EventObj();
  constructor(private _http: HttpService, private _sharedService: sharedService) {

    const listFromStore = this.fetchUserList();
    if (!listFromStore) {
      this.getEventList();
    }
  }

  drawDonutChart = (element, percent, width, height, text_y) => {

    console.log('DrawDonutChart executing');
    width = typeof width !== 'undefined' ? width : 290;
    height = typeof height !== 'undefined' ? height : 290;
    text_y = typeof text_y !== 'undefined' ? text_y : '-.10em';
    // tslint:disable-next-line: one-variable-per-declaration
    const dataset = {
      lower: this.calcPercent(0),
      upper: this.calcPercent(50)
    },
      radius = Math.min(width, height) / 3,
      pie = d3.pie().sort(null),
      format = d3.format('.0%');
    const arc = d3.arc()
      .innerRadius(radius * .8)
      .outerRadius(radius);

    const svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    let path = svg.selectAll('path')
      .data(pie(dataset.lower))
      .enter().append('path')
      .attr('class', (d, i) => {
        return 'color' + i;
      })
      .attr('d', arc)
      .each(function(d) {
        this._current = d;
      });

    const text = svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', text_y);
    // const progress = 0;
    if (typeof (percent) === 'string') {
      text.text(percent);
    } else {
      const progress = 0;
      // this.timer(path, dataset, this.duration, pie, text, format, arc);
      const timeout = setTimeout(function() {
        clearTimeout(timeout);
        path = path.data(pie(dataset.upper)); // update the data
        path.transition().duration(this._duration).attrTween('d', function(a) {
          // Store the displayed angles in _current.
          // Then, interpolate from _current to the new angles.
          // During the transition, _current is updated in-place by d3.interpolate.
          const i = d3.interpolate(this._current, a);
          const i2 = d3.interpolate(progress, percent);
          this._current = i(0);
          return function(t) {
            text.text(format(i2(t) / 100));
            return arc(i(t));
          };
        }); // redraw the arcs
      }, 2000);
    }

  }

  ngOnInit() {
    console.log(' ngOnInit - Event List');
  }
  ngAfterViewInit = () => {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 2500);
  }
  fetchUserList = () => {
    console.log('fetching from store');
    const list = localStorage.getItem('event-data');
    if (list) {
      this.renderView(list);
      return true;
    }
    return false;
  }

  buildChart = () => {
    let percent = 89;
    const ratio = percent / 100;
    const pie = d3.pie()
      .value(function(d) { return d; })
      .sort(null);
    const w = 300, h = 300;

    const outerRadius = (w / 2) - 10;
    const innerRadius = 90;
    const color = ['red', 'green', 'blue'];
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);


    const arcLine = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius - 10)
      .startAngle(0);

    const svg = d3.select('#chart_1');
    // if (svg) {
      svg.append('svg')
      .attr('width', '200')
      .attr('height', '200')
      .attr('class','shadow')
      .append('g')
      .attr('transform', 'translate(' + 100 + ',' + 100 + ')');

    // }
    const defs = svg.append('svg:defs');

    let inset_shadow = defs.append('svg:filter')
      .attr('id', 'inset-shadow');

    inset_shadow.append('svg:feOffset')
      .attr('dx', 0)
      .attr('dy', 0)

    inset_shadow.append('svg:feGaussianBlur')
      .attr('stdDeviation', 4)
      .attr('result','offset-blur');

    inset_shadow.append('svg:feComposite')
      .attr('operator','out')
        .attr('in','SourceGraphic')
        .attr('in2', 'offset-blur')
        .attr('result', 'inverse');

    inset_shadow.append('svg:feFlood')
      .attr('flood-color', 'black')
        .attr('flood-opacity', .7)
        .attr('result', 'color')

    inset_shadow.append('svg:feComposite')
      .attr('operator','in')
        .attr('in', 'color')
        .attr('in2', 'inverse')
        .attr('result', 'shadow');

    inset_shadow.append('svg:feComposite')
      .attr('operator', 'over')
        .attr('in','shadow')
        .attr('in2', 'SourceGraphic');

    const path = svg.append('path')
      .attr('d', arc).
    // if ( path ) {
        style('fill', color[0])
          .style('filter', 'url(#inset-shadow)');
      // }



    const pathForeground = svg.append('path')
      .datum({ endAngle: 0 })
      .attr('d', arcLine)
      .attr('transform', 'rotate(180)');
    if (pathForeground) {
        pathForeground.style('fill', color[1])
        .style('filter', 'url(#inset-shadow)');
    }

    const middleCount = svg.append('text')
      .datum(0)
      .text(function(d) {
        return d;
      });
    if (middleCount) {
        middleCount.attr('class', 'middleText')
        .attr('text-anchor', 'middle')
        .attr('dy', 25);

        middleCount.style('fill', d3.rgb(color[2]))
        .style('font-size', '80px')
        .style('filter', 'url(#inset-shadow)');
    }
    let oldValue = 0;
    const arcTween = function(transition, newValue, oldValue) {
      console.log('arcTween called');
      transition.attrTween('d', function(d) {
        const interpolate = d3.interpolate(d.endAngle, ((2 * Math.PI)) * (newValue / 100));

        const interpolateCount = d3.interpolate(oldValue, newValue);
        return function(t) {
          d.endAngle = interpolate(t);
          middleCount.text(Math.floor(interpolateCount(t)) + '%');
          return arcLine(d);
        };
      });
    };
    const animate = function() {
      pathForeground.transition()
        .duration(750)
        .ease('cubic')
        .call(arcTween, percent, oldValue);
      oldValue = percent;
      percent = (Math.random() * 80) + 20;
      // setTimeout(animate,3000);
    };

    setTimeout(() => {
      console.log('animate called');
      animate();
    },0);
  }



  getEventList = () => {
    console.log('get Event list triggered');
    this._sharedService.showLoader(true);
    this._http.get('https://next.json-generator.com/api/json/get/Vk7OTypQ8')
      .subscribe((result: EventObj[] | any) => {
        console.log(result);
        result.forEach((event, index) => {
          this.allEventList.push(new EventObj({
            organizer: event.organizer,
            Id: event._id,
            about: event.about,
            company: event.company,
            scheduled_at: event.scheduled_at,
            duration: event.duration,
            capacity: event.capacity
          }));
        });
      },
        (error) => {
          console.error(error);
        },
        () => {
          console.log(this.allEventList);
          this.saveEventListInStore(this.allEventList);
          this.dataSource.sort = this.sort;
          this.renderView(localStorage.getItem('event-data'));
          this._sharedService.showLoader(false);
        });
  }

  renderView = (data) => {
    console.log('rendering View');
    this.dataSource = new MatTableDataSource(JSON.parse(data));
    this._sharedService.showLoader(false);

  }

  saveEventListInStore = (eventList: EventObj[]) => {
    console.log('setting to store');
    localStorage.setItem('event-data', JSON.stringify(eventList));
  }

  // Chart

  calcPercent = (percent: number) => {
    return [percent, 100 - percent];
  }

  timer = (_path: any, _dataset: any, _dur: any, _pie: any, _txt: any, _format: any, _arc: any) => {
    const timeout = setTimeout(function() {
      clearTimeout(timeout);
      _path = _path.data(_pie(_dataset.upper));
      _path.transition().duration(_dur).attrTween('d', function(a) {
        const i = d3.interpolate(this._current, a);
        const i2 = d3.interpolate(this.progress, this.percent);
        this._current = i(0);
        return function(t) {
          _txt.text(_format(i2(t) / 100));
          return _arc(i(t));
        };
      });
    }, 2000);
  }
  getViewPort = () => {

  }
}
