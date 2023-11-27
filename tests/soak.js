import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate,Counter,Gauge,Trend } from 'k6/metrics';
export let errorRate = new Rate('errors');
import { SITE_URL } from '../utils.js';
export let myCounter = new Counter('my_counter');
export let myGauge = new Gauge('my_gauge');
export let myTrend= new Trend('my_trend');
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.3.1/dist/bundle.js";


export default function () {
  
  const res = http.get(SITE_URL);
  myCounter.add(1);
  myGauge.add(1);
  myTrend.add(1);
  check(res, { 
    'status was 200': (r) => r.status == 200,
    'verify homepage text': (r) =>
      r.body.includes('Empowering 420,000+ Businesses with Innovation'),

}) || errorRate.add(1);
  sleep(1);
}
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}