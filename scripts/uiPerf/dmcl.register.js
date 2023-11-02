import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export const options = {
	scenarios: {
		ui: {
			executor: 'per-vu-iterations',
			vus: 10,
			options: {
				browser: {
					type: 'chromium'
				},
			},
		},
	},
}

export default async function () {
	const page = browser.newPage();
	try {
		await page.goto('https://dienmaycholon.vn/');
		page.screenshot({ path: 'testData/homePageScrSh.png' });
		await page.waitForSelector(`xpath=//*[@id="wzrk-cancel"]`, {state : 'visible'}).click();
		await page.waitForSelector(`xpath=//a[@id="login_user"]`, {state: 'visible'}).click();
		await expect(page.url(), `Current url text`).to.includes(`https://dienmaycholon.vn/dang-nhap`);
		page.screenshot({ path: 'testData/loginPageSrcsh.png' });
		page.waitForSelector(`xpath=//input[@name="username"]`).fill(`ttranquoc`);
		page.waitForSelector(`xpath=//input[@id="password"]`).fill(`Abcd@1234`);
		await page.waitForSelector(`xpath=//span[text()="ĐĂNG NHẬP"]/parent::button`).click();
		await page.waitForNavigation({waitUntil: 'load'});
		const isAccountPageDisplayed = page.waitForSelector(`xpath=//h3[text()="Thông tin tài khoản"]`, {state: 'visible'}).isVisible();
		await expect(isAccountPageDisplayed, `Account page is displayed properly`).to.be.true;
		await expect(page.url(),`Current url text`).to.includes(`https://dienmaycholon.vn/thong-tin-tai-khoan`);
		page.screenshot({ path: 'testData/accountPageSrcSh.png' });
		await page.waitForSelector(`xpath=//span[text()="Thoát"]`).click();
		const isLoginPageDisplayed = await page.waitForSelector(`xpath=//h2[text()="Đăng nhập tài khoản"]`, {state: 'visible'}).isVisible();
		await expect(isLoginPageDisplayed, `Login page should be displayed properly`);
		await expect(page.url(), `Current url text`).to.includes(`https://dienmaycholon.vn/dang-nhap`);
	} catch (e) {
		console.log(e)
	}finally {
		page.close();
	}
}