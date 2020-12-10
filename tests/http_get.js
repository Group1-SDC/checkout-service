/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 20,
      maxVUs: 2000,
    },
  },
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:portland": { loadZone: "amazon:us:portland", percent: 100 },
      },
    },
  },
};

const errorRate = new Rate('error_rate');

export default function () {
  const res = http.get('http://localhost:3000/1');
  errorRate.add(res.error_code);
  sleep(1);
}
