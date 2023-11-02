## # First glance

K6 has its own library for manipulate DOM and automate complete process for an UI performance test (this can be done with Selenium in Jmeter), some short description about this
- it's on experimental for now
> [browser](https://k6.io/docs/javascript-api/k6-experimental/browser) check this module.
- it's look alike playwright.
> We can create new browser object then create new page object and the page is represent for a webdriver objects that can manipulate the DOM for you.
---

## What to be done?
Just give it a try with a short and simple e2e flow to see how we done it so far

Domain: 
`www.dienmaycholon.com`

Function: 
`Login/ Logout`

Detail testcase:
- Description: Verify user can login and logout properly
- Test steps: 
1. Navigate to https://dienmaycholon.vn/ and click on the login button.
2. Fill in the valid username and password.
3. Click Login btn
4. Verify that user is login successfully and automatically be navigated to user's account page
5. Click logout btn
6. Verify that user is logout properly and automatically be navigated to Login page.

## # Consideration
- k6's browser will run in headless mode implicitly by default, we can change this settings in command line:
```zsh
$ k6 run -e K6_BROWSER_HEADLESS=false ./scripts/uiPerf/*.js  
```
- This is only in experimental, so i discover that there are many thing work not properly between headed and headless mode.

## # sample run result
Here is sample [report](/results/k6%20report%20@ui-perf%2010-VUs%20headed.html) for 10 VUs & 1 iteration. 