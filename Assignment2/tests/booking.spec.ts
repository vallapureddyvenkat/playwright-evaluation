import { test, expect, request } from '@playwright/test';
import { ApiUtils } from './api-utils/ApiUtils';

let bookingId: number;
let token: string;

const payload = {
  firstname: 'John',
  lastname: 'Doe'
};

const payload1 = {
  payloadresponse: "I'm a Teapot"
};

/* ✅ Create booking before all tests */
test.beforeAll(async () => {
  const apiUtils: ApiUtils = new ApiUtils();

  const result = await apiUtils.createBooking();

  bookingId = result.bookingId;
  token = result.token;
});

/* ✅ Test 1 - API */
test('01-@API should validate booking via GET request', async ({ request }) => {
  const response = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );

  const responseBody: { firstname: string; lastname: string } =
    await response.json();

  expect(responseBody.firstname).toBe(payload.firstname);
  expect(responseBody.lastname).toBe(payload.lastname);
});

/* ✅ Test 2 - Web */
test('02-@Web should validate booking via UI with token injection', async ({ page }) => {
  /* ✅ Inject token into localStorage BEFORE navigation */
  await page.addInitScript((value: string) => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto(`https://restful-booker.herokuapp.com/booking/${bookingId}`);

  /* ✅ Read page body */
  const bodyText: string = await page.textContent('body') ?? '';
  console.log(bodyText);
  expect(bodyText).toContain(payload1.payloadresponse);
});