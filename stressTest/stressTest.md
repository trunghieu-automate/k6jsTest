## # What?
**Stress testing assesses how the system performs when loads are heavier than usual.**
> It has same pattern with average load test but the core different is higher load. To achive the higher load, the ramp-up period should takes longer in proportion to the load inscrease. And after the test reach the desired VUs, just keep it last longer than it would in the average-load test.

![](https://k6.io/docs/static/42503292ac8654cde59528cf2dacebc6/47a22/chart-stress-test-overview.webp)


## # When?
Stress tests verify the stability and reliability of the system under conditions of heavy use. 

Systems may receive higher than usual workloads on unusual moments such as process deadlines, paydays, rush hours, ends of the workweek, and many other behaviors that might cause frequent higher-than-average traffic.

## # Considerations
Some note when you apply stress test to your app

- **Load should be higher than what the system experiences on average.**
> Some testers might have default targets for stress tests—say an increase upon average load by 50 or 100 percent—there's no fixed percentage.

> The load simulated in a Stress test depends on the stressful situations that the system may be subject to. Sometimes this may be just a few percentage points above that average. Other times, it can be 50 to 100% higher, as mentioned. Some stressful situations can be twice, triple, or even orders of magnitude higher.

> Define load according to the risk load patterns that the system may receive.

- **Only run stress tests after running average-load tests.**

- **Re-use the Average-Load test script.**

- **Expect worse performance compared to average load.**
> This test determines how much the performance degrades with the extra load and whether the system survives it. A well-performant system should respond with consistent response times when handling a constant workload for an extended period.


## # How?
Based on average load options
1. Increase the script's activity further in a slower ramp-up until it reaches an above-average number of users or throughput.
2. Maintain that load for a while.
3. Depending on the test case, stop or ramp down gradually.

## # Results analysis
- Like the average-load test, an initial outcome for the Stress test shows up during the ramp-up period to identify response time degradation as the load increases further than the average utilization. Commonly, the performance degrades, and even the system's stability crashes as we push the system further than the average-load test.