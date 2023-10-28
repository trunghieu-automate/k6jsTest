import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { SharedArray } from 'k6/data';
// sample low vus and duration for smoke test
export const options = {
    vus: 3, 
    duration: '1m',
};

const dataList = new SharedArray('suggestItem', () => {
    const jsonObject = JSON.parse(open('../testData/suggestContext.json'));
    const searchItemsArray = jsonObject.suggestItems
    return searchItemsArray
})

export default function () {
    const randomSuggestItem = dataList[Math.floor(Math.random() * dataList.length)];
    //console.info(`Choosing ${randomSearchItem}`);
    const url = `https://fptshop.com.vn/api-data/search/suggest`;
    const body = {
        keyword: `${randomSuggestItem}`
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
