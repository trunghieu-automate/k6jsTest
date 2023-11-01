## Performance testing and K6 js
> *This project for learning and understanding various type of performance testing, and using k6 tool to work on each scenarios*
---

This project will demonstrade various type of scenarios of performance testing like: 
- Average-load test
- Spike test
- Smoke test
- Stress test
- Soak test
- Breakpoint test
> folowing chart describes what will be done:
![img](https://k6.io/docs/static/5d2f760ce988dc758b7b7768a28aaa8f/88b03/chart-load-test-types-overview.png)
---


#### $about:
> K6 testing tool: pure js scriptable performance testing tool - [official doc](https://k6.io/docs/)

> xk6-dashboard - a community dashboard output [extent lib](https://github.com/grafana/xk6-dashboard)

> Using Chaijs for response assertion while running performance test

> Data reader by `k6/data`

#### $using:
- with dashboard output
```cmd
$ k6 run --config ./configs/spike.config.js ./scripts/suggest.fpt.js --out dashboard=open
```
- without
```cmd
$ k6 run --config ./configs/spike.config.js ./scripts/suggest.fpt.js
```