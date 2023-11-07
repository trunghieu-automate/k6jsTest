In `arrival-rate` executor, you need to set up pre-allocate VUs to achive the target rate.

> `Arrival-rate` executor is an open model, arrival-rate is start the iteration by the configurated rate. For example, you can config arrival-rate to start at 10 itertions each 10s, or 10m or 10h. This behaviour is opposed to the closed model scenario where the next iteration start after the current iteration finished.

> In k6, each VU is only running 1 iteration, because it's single threaded like other js runtime, so to achive your designed iterations, you need to setting up pre-allocate VUs.

For example how `constant-arrival-rate` executor work, and your designed `rate: 10`.
```js
export const options = {
  scenarios: {
    constant_load: {
      executor: "constant-arrival-rate",
      preAllocatedVUs: 10,
      rate: 10,
      timeUnit: "1m",
    },
  },
};
```