# **Performance smoke test**
## # What?
- **Smoke tests have a minimal load.** 

- **Run them to verify that the system works well under minimal load and to gather baseline performance values.**

![smoke-test](https://k6.io/docs/static/55bcba42924577a000014c658e318c26/485a2/chart-smoke-test-overview.webp)

The test should execute for a short period, either a low number of iterations or a duration from seconds to a few minutes maximum.

## # When you run it?
- Teams should run smoke tests whenever a test script is created or updated. 
- Smoke testing should also be done whenever the relevant application code is updated.

It's a good practice to run a smoke test as a first step, with the following goals:

- Verify that your test script doesn't have errors.
- Verify that your system doesn't throw any errors (performance or system related) when under minimal load.
- Gather baseline performance metrics of your system’s response under minimal load.
- With simple logic, to serve as a synthetic test to monitor the performance and availability of production environments.

## # Considerations

When you prepare a smoke test, consider the following:

- Each time you create or update a script, run a smoke test

> Because smoke tests verify test scripts, try to run one every time you create or update a script. Avoid running other test types with untested scripts.

- Keep throughput small and duration short

> Configure your test script to be executed by a small number of VUs (from 2 to 20) with few iterations or brief durations (30 seconds to 3 minutes).

## # How to do it?
```js
// options
export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};
```

## # Results analysis
The smoke test initially validates that your script runs without errors. If any script-related errors appear, correct the script before trying any more extensive tests.

On the other hand, if you notice poor performance with these low VU numbers, report it, fix your environment, and try again with a smoke test before any further tests.

Once your smoke test shows zero errors and the performance results seem acceptable, you can proceed to other test types.
