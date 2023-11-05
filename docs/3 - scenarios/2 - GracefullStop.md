## # What?
`Graceful stop` is the period at the end of the test in which k6 lets iteration in progress finish.

## # Why setting `graceful stop`
If a test has a set duration or ramp down, its possible that k6 could interrupt iterations in progress. These interruptions can lead to skewed metrics and unexpected test results. To deal with this, k6 scenarios have a gracefulStop. For the `ramping-vus` executor, a related option, `gracefulRampDown`, exists to let VUs finish as their number ramps down.


## How?
### # `gracefulStop` and `gracefulRampDown` options
- The `gracefulStop` is an option that is available for all executor, (except `externally-controlled`)
- The default value is 30s
Example:
```js
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 100,
      duration: '10s',
      gracefulStop: '3s',
    },
  },
};
```

#### # `gracefulRampDown` option
- The `ramping-vus` executor also has `gracefulRampDown` option.

- When the target value for a stage is lower than the target for the previous stage, k6 might need to stop some VUs that were started during the previous stages. The gracefulRampDown option controls how long these VUs have to finish currently before k6 interrupts them.

- To get an idea of how gracefulRampDown works, you can run the following script with k6 run --verbose. In this script, the iteration sleep time exceeds the gracefulRampdown time. So, as k6 ramps down to reach the target of the second stage, it must forcibly interrupt VUs. The --verbose flag will log to your console when VUs start, enter the grace period, and are forcibly interrupted.
```js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  discardresponsebodies: true,
  scenarios: {
    contacts: {
      executor: "ramping-vus",
      startvus: 0,
      stages: [
        { duration: "10s", target: 10 },
        { duration: "10s", target: 0 },
      ],
      gracefulRampDown: "1s",
    },
  },
};

export default function () {
  http.get("https://test.k6.io/contacts.php");
  // adding sleep beyond so that iterations are longer than rampdown
  sleep(5);
}
```