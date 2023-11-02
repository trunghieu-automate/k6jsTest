## #What is Average-load testing?
> `Load test` or `average-load test` assesses how the system performs under typical load. Typical load might be a regular day in production or an average moment.
---

## # How is its scenario?
> `Average-load tests` simulate the number of `concurrent users` and requests per second that reflect average behaviors in the production environment. 

> This type of test typically increases the throughput or VUs gradually and keeps that average load for some time. 

> Depending on the system's characteristics, the test may stop suddenly or have a short ramp-down period.

![img](https://k6.io/docs/static/bcfbe212938da20440645ca1685133d3/47a22/chart-average-load-test-overview.webp)

> sample options for average-load test scenario:
```js
export const options = {
    stages: [
        // traffic ramp-up from 1 to 5 users over 5 minutes.
        { duration: '1m', target: 20 }, 
        // stay at 20 users for 5 minutes
        { duration: '5m', target: 20 },
        // ramp-down to 0 user 
        { duration: '1m', target: 0 },
      ],
};
```

---
## # When we run Average load test?
> Average-Load testing helps understand whether a system meets performance goals on a `typical day` (commonplace load).
 
@`Typical day` here means when an average number of users access the application at the same time, doing normal, average work.

## # Considerations
When you prepare an average-load test, consider the following:
> **Know the specific number of users and the typical throughput per process in the system.**
> 
> -- *To find this, look through APMs or analytic tools that provide information from the production environment. If you can't access such tools, the business must provide these estimations.*--

> **Gradually increase load to the target average.**
> 
> -- *That is, use a `ramp-up period`. This period usually lasts between 5% and 15% of the total test duration. A `ramp-up period` has many essential uses:*
> - *It gives your system time to warm up or auto-scale to handle the traffic.*
> - *It lets you compare response times between the low-load and average-load stages.*
> - *If you run tests using our cloud service, a ramp up lets the automated performance alerts understand the expected behavior of your system.*

> **Maintain average for a period longer than the ramp up.**
>
> -- *Aim for an average duration at least five times longer than the ramp-up to assess the performance trend over a significant period of time.*

> **Consider a ramp-down period.**
>
> -- *The ramp down is when virtual user activity gradually decreases. The ramp down usually lasts as long as the ramp up or a bit less.*

## # Sample run and result
- running: 
```cmd
$ k6 run --out dashboard=open averageLoad\suggest.fpt.js
```
- Then check the [results folder](/results)