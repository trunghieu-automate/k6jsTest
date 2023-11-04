K6 defined 2 types of models that describes how different these executors are.

### I. Open and closed models
Open and closed models is the concepts of the way you design how the test run by choosing k6 executors. 

> Some excecuter use closed models, some uses open models

So, In short, in the `closed models`, the iterations start only when the last iteeration finished.

On the other hand, in the `open models`, the VUs arrive indendently of iteration completion.

> Different models suite for different aims.

#### # Closed model
In the closed model, each VU iteration starts only when the previous one finishes. This means that the VU arrival rate is dependent on the iteration duration. If the target system responds faster, the VU iterations will be shorter and more VUs will arrive in a given time. If the target system responds slower, the VU iterations will be longer and fewer VUs will arrive in a given time. This can lead to a problem called coordinated omission, where the test results do not reflect the true performance of the system under stress.

Implement a closed model by using executor: `constant-vus`, `ramping-vus`, `per-vu-iterations`

#### # Open model
In the open model, each VU iteration starts independently of the previous one. This means that the VU arrival rate is fixed and not affected by the iteration duration. If the target system responds faster, the VU iterations will be shorter and the VUs will have some idle time between iterations. If the target system responds slower, the VU iterations will be longer and the VUs will have no idle time between iterations. This can lead to a more realistic and consistent load pattern, where the test results reflect the true performance of the system under stress.

Implement a open model by using a executor in this list: `constant-arrival-rate`, `ramping-arrival-rate`.   

You're welcome. The open and closed models can be used in different reality scenarios depending on the type of load you want to generate and the metrics you want to measure. For example:

- If you want to test how your system behaves under a constant number of concurrent users, you can use the closed model with the constant-vus executor. This will simulate a scenario where users wait for their requests to finish before starting a new one. This can be useful for testing the average response time and throughput of your system.
- If you want to test how your system behaves under a varying number of concurrent users, you can use the closed model with the ramping-vus executor. This will simulate a scenario where users arrive and leave at different rates, but still wait for their requests to finish before starting a new one. This can be useful for testing the scalability and resilience of your system.
- If you want to test how your system behaves under a constant or varying arrival rate of new requests, you can use the open model with the constant-arrival-rate or ramping-arrival-rate executors. This will simulate a scenario where users do not wait for their requests to finish before starting a new one. This can be useful for testing the peak performance and capacity of your system.


### # Realistic scenarios
The open and closed models can be used in different reality scenarios depending on the type of load you want to generate and the metrics you want to measure. For example:

- If you want to test how your system behaves under a constant number of concurrent users, you can use the closed model with the constant-vus executor. This will simulate a scenario where users wait for their requests to finish before starting a new one. This can be useful for testing the average response time and throughput of your system.
- If you want to test how your system behaves under a varying number of concurrent users, you can use the closed model with the ramping-vus executor. This will simulate a scenario where users arrive and leave at different rates, but still wait for their requests to finish before starting a new one. This can be useful for testing the scalability and resilience of your system.
- If you want to test how your system behaves under a constant or varying arrival rate of new requests, you can use the open model with the constant-arrival-rate or ramping-arrival-rate executors. This will simulate a scenario where users do not wait for their requests to finish before starting a new one. This can be useful for testing the peak performance and capacity of your system.