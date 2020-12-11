/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '2m', target: 1 },
    { duration: '2m', target: 10 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
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
  const res = http.get(`http://localhost:3000/${id}`);
  errorRate.add(res.error_code);
  sleep(1);
}
