import { request, APIRequestContext } from '@playwright/test';

/* ✅ Interfaces (STRICT TYPING) */

export interface AuthResponse {
  token: string;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface CreateBookingRequest {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface CreateBookingResponse {
  bookingid: number;
  booking: CreateBookingRequest;
}

export class ApiUtils {
  private readonly baseUrl: string = 'https://restful-booker.herokuapp.com';
  private requestContext!: APIRequestContext;

  /* ✅ Init request context */
  private async init(): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: this.baseUrl
    });
  }

  /* ✅ Get Token */
  public async getToken(): Promise<string> {
    await this.init();

    const response = await this.requestContext.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const responseBody: AuthResponse = await response.json();

    return responseBody.token;
  }

  /* ✅ Create Booking */
  public async createBooking(): Promise<{ token: string; bookingId: number }> {
    await this.init();

    const token: string = await this.getToken();

    const payload: CreateBookingRequest = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 123,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-05'
      },
      additionalneeds: 'Breakfast'
    };

    const response = await this.requestContext.post('/booking', {
      data: payload
    });

    const responseBody: CreateBookingResponse = await response.json();

    return {
      token,
      bookingId: responseBody.bookingid
    };
  }
}