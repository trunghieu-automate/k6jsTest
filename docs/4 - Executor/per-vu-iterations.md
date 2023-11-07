### What?
This executor set fixed amounts of iterations for a VU

### When?
Use this executor if you need a specific number of VUs to complete the same number of iterations.

### Example
```js
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '30s',
    },
  },
};
```

### Observations
- Overall test duration lasts as long as the slowest VU takes to complete 20 requests.
- Total duration of seconds is slighttly longer than shared iterations due to lower efficiency.