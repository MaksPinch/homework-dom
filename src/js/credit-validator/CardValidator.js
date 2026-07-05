export default class CardValidator {
  validate(cardNumber) {
    const cleanNumber = cardNumber.trim();

    if (!cleanNumber) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i], 10);

      if (Number.isNaN(digit)) return false;

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;

      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
  getCardType(cardNumber) {
    const cleanNumber = cardNumber.trim();

    if (cleanNumber.startsWith("4")) {
      return "visa";
    }

    const firstTwoDigits = parseInt(cleanNumber.substring(0, 2), 10);
    const firstFourDigits = parseInt(cleanNumber.substring(0, 4), 10);

    if (
      (firstTwoDigits >= 51 && firstTwoDigits <= 55) ||
      (firstFourDigits >= 2221 && firstFourDigits <= 2720)
    ) {
      return "mastercard";
    }

    if (firstFourDigits >= 2200 && firstFourDigits <= 2204) {
      return "mir";
    }
    return "unknown";
  }
}
