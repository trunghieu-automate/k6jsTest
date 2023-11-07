```js 
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '30s',
    },
  },
};
```
This above example option schedules 200 total iterations shared by 10 VUs with a maximim test duration of 30 seconds
---
This executor is suitable when yo uwant a specific no of VUs to complete a fixed number of total iterations and the amount of iterations per VU is not important.
The main thing you concern with your test is *the time to complete* a number of iterations, this excutor should perform best.
---
### Options
Beside common options that is available for all excutor, this shared-iterations comes with below options: 
- `vus`: number of VUs to run concurrently, default: 1
- `iteration`: total number of script iteration to execute across all VUs, default: 1
- `maxDuration`: string value for maximum scenario duration before it's forcibly stopped, default: '10m'


### Usecases
- A quick performance tests in the developement build cycle.