/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
  vus: 100,
  duration: '10m',
  thresholds: {
    http_req_duration: [{ threshold: 'p(99)<2000' }], // response time for 99% of requests take under 2000 ms to complete
  },
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:portland': { loadZone: 'amazon:us:portland', percent: 100 },
      },
    },
  },
};

const errorRate = new Rate('error_rate');

export default function () {
  const id = Math.floor(Math.random() * 10000000 + 1);
  const res = http.get(`http://localhost:3000/api/checkout/${id}`);
  errorRate.add(res.error_code);
  // Average time to complete each request: 50 ms
  // Want each VU iteration to take a total of 100 ms so that each VU can run 10 times per second
  // 100 ms * 10 = 1 second
  // So, we have a remainder of 50 ms (100 ms - 50 ms) that we want our VU to sleep for
  sleep(0.05);
}

/* import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  duration: '30s',
  vus: 200,
  // iterations: 60000, iterations can be run instead of duration, seemingly not together though
  // Try adding more http requests
  // rps: 1000,
  // ext: {
  //   loadimpact: {
  //     distribution: {
  //       'amazon:us:portland': { loadZone: 'amazon:us:portland', percent: 100 },
  //     },
  //   },
  // },
};
export default function () {
  const n = Math.ceil(Math.random() * 10000000);
  const BASE_URL = `http://localhost:3000/api/checkout/${n}`;
  const res = http.get(BASE_URL);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time < 500ms': (r) => r.timings.duration < 500,
    'transaction time < 1000ms': (r) => r.timings.duration < 1000,
    'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  });
  sleep(0.1);
} */