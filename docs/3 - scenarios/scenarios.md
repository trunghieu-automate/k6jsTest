### # Scenario
- Scenarios in K6 is concept that help you config the VUs and iterations in details, so that you can use that to apply model you want your load test.
- Scenarios is all about how you config your test.
- Look at some of the benefits include: 
1. Simulate more realistic simulate
> By using `executer`, each scenario can use a distinct VU and iteration scheduling pattern.
2. Parallel or sequences workloads
> Scenarios are independent from each other and run in parallel, though they can be made to appear sequential by setting the startTime property of each carefully.
3. Easier, more flexible your test organization
> Able to define multoples scenarios in the same script, and each one can independently executed in different js function
4. Granular result analysis
> Different tag, or env variables and metric can be set per scenario.

### # How? 
To define a scenarios, just use `scenario` keyword in the `option`
> You can give your scenario every name you want, but it's should be unique.

sample:
```js
export const options = {
  scenarios: {
	// your scenario's name
	example_scenario: {
	  // name of the executor to use
	  executor: 'shared-iterations',

	  // common scenario configuration
	  startTime: '10s',
	  gracefulStop: '5s',
	  env: { EXAMPLEVAR: 'testing' },
	  tags: { example_tag: 'testing' },

	  // executor-specific configuration
	  vus: 10,
	  iterations: 200,
	  maxDuration: '10s',
	},
	// multiple scenarios definition
	another_scenario: {
	  /*...*/
	},
  },
};
```
#### Scenario executors
The `executor` is the one that need to be define firstly in each scenarios, because it's the most important thing you need to know to define a scenarios

Executor config how long the test runs, whether the traffic stay constants or changes, and when workload is model by VUs or by arrival rate (open or closed models)

Scenarios must have a pre-defined `executor`, and its depend on k6's models load. Choice includes: 
- By number of iterations.
	> shared-iterations shares iterations between VUs.
 
	> per-vu-iterations has each VU run the configured iterations.
- By number of VUs.
	> constant-VUs sends VUs at a constant number.

	> ramping-vus ramps the number of VUs according to your configured stages.
- By iteration rate.
	> constant-arrival-rate starts iterations at a constant rate.
	
	> ramping-arrival-rate ramps the iteration rate according to your configured stages.

#### Scenario options
Other than the `executor`, scenarios comes with various option for you:
- `executor`(required)
- `startTime`: delay time to actully start the exectors (default: 0)
- `gracefulStop`: Time to wait for iterations to finish executing before stopping them forcefully. (default: 30s)
- `exec`: string name of exported Js function to execute (default: `default`) 
- `env`: Env object that contains env variables spectific to this scenario	(default: {}) 
- `tag`: Tag object that specific to this scenario (default: {}) 

### Scenario sample 
Let look at how to implement a combination sceario run as folloiwing 2 scenario in a script:
- Scenario 1: Ten VUs try to use 100 iterations as quickly as possible, and they may do other's job if fast enough. (This mean 1 VUs may done more iteration than others)
- Scenario 2: 10 VUs iterate 10 times, but start after 10 sec.

```js 
import http from "k6/http";

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 100,
      startTime: "0s",
    },
    per_vu_scenario: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 10,
      startTime: "10s",
    },
  },
};

export default function () {
  http.get("https://test.k6.io/");
}
```