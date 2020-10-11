import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // checkout
  checkout() {
    // do stuff
  }

  // payment method lists
  getPaymentMethods() {
    return [];
  }
}
