import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { SharedArray } from 'k6/data';
// options objects and then setup ramp-up, ramp down
/* export const options = {
     stages: [
        { duration: '1m', target: 500 }, // traffic ramp-up from 1 to xxx users over xxx seconds/minutes.
        { duration: '3m', target: 500 }, // stay at xx users for xx seconds/minutes.
        { duration: '1m', target: 0 }, // ramp-down to 0 user
    ],
}; */
// Create a SharedArray object that must be define inside the init script
const dataList = new SharedArray('suggestItem', () => {
    const jsonObject = JSON.parse(open('../testData/suggestContext.json'));
    const searchItemsArray = jsonObject.suggestItems
    return searchItemsArray
})
// Main function has `k6/http` method
export default function () {
    const randomSuggestItem = dataList[Math.floor(Math.random() * dataList.length)];
    //console.info(`Choosing ${randomSearchItem}`);
    const url = `https://fptshop.com.vn/api-data/search/suggest`;
    const body = {
        keyword : `${randomSuggestItem}`
    }

    describe(`Average-load test scenarios for @FPTshop @suggest API`, () => {
        const response = http.post(url, body);
        expect(response.status, 'response status').to.equal(200);
        expect(response).to.have.validJsonBody();
        if (response.status != 200) {
            console.log(`got failed response ${response.body}`)
        }
    })
}