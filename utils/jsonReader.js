import { SharedArray } from 'k6/data';
//using k6/data open function
export function getArrayFromJsonFile() {
    const dataList = new SharedArray('searchItem', function () {
        const jsonObject = JSON.parse(open('./testData/searchContext.json'));
        const searchItemsArray = jsonObject.searchItems
        return searchItemsArray;
    })
    const randomSearchItem = dataList[Math.floor(Math.random() * dataList.length)];
    console.log(`Choosing ${randomSearchItem}`);
    return randomSearchItem;
}
