import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
export let errorRate = new Rate('errors');

export default function () {
    const res = http.get('https://alvi-tazwar.rt.gw');
    check(res, {
        'status was 200': (r) =>
            r.status == 200,
        'verify homepage text': (r) =>
            r.body.includes('Hello, I am Sara Beck'),

    }) || errorRate.add(1);;
    sleep(1);
}