import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { SharedArray } from 'k6/data';
/* 
export const options = {
     stages: [
        { duration: '30s', target: 200 }, // traffic ramp-up from 1 to 5 users over 5 minutes.
        { duration: '2m', target: 200 }, // stay at 20 users for 5 minutes
        { duration: '15s', target: 0 }, // ramp-down to 0 user
    ],
}; */
// Create a SharedArray object that must be define inside the init script
const dataList = new SharedArray('searchItem', () => {
    const jsonObject = JSON.parse(open('../testData/searchContext.json'));
    const searchItemsArray = jsonObject.searchItems
    return searchItemsArray
})

export default function () {
    const randomSearchItem = dataList[Math.floor(Math.random() * dataList.length)];
    //console.info(`Choosing ${randomSearchItem}`);
    const url = new URL(`https://shopee.vn/api/v4/search/search_hint`)
    const originUrl = `https://shopee.vn/api/v4/search/search_hint?extra_params=%7B%22global_search_session_id%22%3A%22gs-e2ad0454-2164-4454-8480-ae02e3f7329e%22%2C%22search_session_id%22%3A%22ss-57c96cb9-0dd2-4db4-b770-5024c10813c3%22%7D&historical_query=tivi%E2%97%80%E2%96%B61698390325%E2%96%B6%E2%97%8067%20kit%E2%97%80%E2%96%B61697440697%E2%96%B6%E2%97%80monka%20kit%E2%97%80%E2%96%B61697440664%E2%96%B6%E2%97%80gmk67%E2%97%80%E2%96%B61697431939%E2%96%B6%E2%97%80gmk67%20full%20build%E2%97%80%E2%96%B61697431900&keyword=${encodeURIComponent(randomSearchItem)}&search_type=0&version=1`;
    url.searchParams.append('extra_params', `{global_search_session_id: 22gs-e2ad0454-2164-4454-8480-ae02e3f7329e}`);
    url.searchParams.append('search_session_id', `ss-57c96cb9-0dd2-4db4-b770-5024c10813c3`);
    url.searchParams.append('keyword', `${randomSearchItem}`);

    describe(`Average-load test scenarios for @Shopee @Search-hint API`, () => {
        http.get(`https://shopee.vn/`)
        sleep(1)
        const response = http.get(url.toString());
        expect(response.status, 'response status').to.equal(200);
        expect(response).to.have.validJsonBody();
        if (response.status != 200) {
            console.log(`got failed response ${response.body}`)
        }
    })
}