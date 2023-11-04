import http from 'k6/http'

export default function () {
    // The following request will take roughly 6s to complete,
    // resulting in an iteration duration of 6s.
    http.get('https://httpbin.test.k6.io/delay/6');
}