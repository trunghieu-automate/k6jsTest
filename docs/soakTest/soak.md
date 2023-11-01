## # What is `Soak` test?
- Firstly, it's similar to `Average-load` test,
- But, the core different is the dduration is much more extended, and there are some reasons to do so
1. Analyzing the system's degradation of performance and resource consumption over extended periods.
2. Analyzing the system's availability and stability during extended periods.
- The duration should usually be extended about hours or days
> Note that, the ramp-up, ramp-down period should be the same as `Average-load` test.

![soak-test](https://k6.io/docs/static/7ef412516fb16c07d18bda48244951c3/485a2/chart-soak-test-overview.webp)
- `Endurance test` is another name of this type of scenarios test, or maybe called `stamina test`.

## # When using a `soak` test?
- This test will be accounted if we want to analyse the stability and reliability of the system over extended period of use.
- This test also help us to identify some performance defects after the test: 
1. Response time degradation
> These are when your app or system fails to release the memory or other resources it has allocated, even after they are no longer needed. This can cause your app or system to consume more and more resources over time, eventually leading to performance issues or crashes. Response time degradation can be detected by using automated baselining or fixed thresholds.
2. Memory/ resource leaks
> These are when your app or system fails to release the memory or other resources it has allocated, even after they are no longer needed. This can cause your app or system to consume more and more resources over time, eventually leading to performance issues or crashes. You should monitor the backend resources and code efficiency to identify and fix any leaks.
3. Data saturation
> This is when you have collected enough data from your app or system to draw the necessary conclusions, and any further data collection will not produce any new or valuable insights. This is important for qualitative research, as it helps you determine when to stop testing and analyzing your data.
4. Storage depletion
> This is when your app or system uses up all the available storage space, either on the device or on the cloud. This can result in data loss, errors, or reduced functionality.

## # Consideration?
When you prepare to run a soak test, consider the following:
1. Configure the duration to be considerably longer than any other test.
> Some typical values are 3, 4, 8, 12, 24, and 48 to 72 hours or even days
2. If possible, re-use the average-load test script
> Changing only the peak durations for the aforementioned values.
3. Don't run soak tests before running smoke and average-load tests.
> Each test uncovers different problems. Running this first may cause confusion and resource waste.
4. Monitor the backend resources and code efficiency. 
> Since we are checking for system degradation, monitoring the backend resources and code efficiency is highly recommended. Of all test types, backend monitoring is especially important for soak tests.

## # How to?
The soak test is almost the same as the average-load test. The only difference is the increased duration of the load plateau.

1. Increase the load until it reaches an average number of users or throughput.
2. Maintain that load for a considerably longer time.
3. Finally, depending on the test case, stop or ramp down gradually

## # Result analysis
- This soak test should be run right after the `average-load` test or even `stress test`. if the sytem is winning over these previous test, we consider using `soak test` to measures the system's degradation over time or not.

- The expected outcome should be that the performance and resource utilization of the backend stays stable or within expected variations.

- After smoke, average-load, stress and soak test, you can know how the system perform over various types loads: `small`, `average`, `high`, `extended`.