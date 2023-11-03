import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { SharedArray } from 'k6/data';

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
        keyword: `${randomSuggestItem}`
    }

    describe(`@FPTshop @suggest API`, () => {
        /* http.get(`https://fptshop.com.vn/`)
        sleep(1) */
        const response = http.post(url, body);
        expect(response.status, 'response status').to.equal(200);
        expect(response).to.have.validJsonBody();
        if (response.status != 200) {
            console.log(`got failed response ${response.body}`)
        }
    })
}