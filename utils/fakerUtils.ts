import { faker } from "@faker-js/faker";

export class FakerData {
    // getFirstName generates a random first name
    static getFirstName(): string {
        return faker.person.firstName();
    }
    // getLastName generates a random last name
    static getLastName(): string {
        return faker.person.lastName();
    }
    // getOrganizationName generates a random organization name
    static getOrganizationName() {
        return capitalizeFirstLetter(faker.company.buzzNoun())
    }
    //getcurrentYear generates a random year
    static getcurrentYear() {
        return `${faker.date.anytime().getFullYear() - 2}`;
    }
    //getMobileNumber generates a random mobile number
    static getMobileNumber(): string {
        return getPhoneNumber();
    }

    static getEmail(): string {
        return faker.internet.email();
    }
    static getAddress(): string {
        return faker.location.streetAddress();
    }

    static getCity(): string {
        return faker.location.city();
    }

    static getStreet(): string {
        return faker.location.street();
    }

    static getPinCode() {
        return faker.location.zipCode('######');
    }

    static getState(): string {
        return faker.location.state();
    }

    static getCountry(): string {
        return faker.location.country();
    }
    static addressName(): string {
        return `${faker.location.countryCode()} ${faker.location.county()}`;
    }

    static getWebsite(): string {
        return faker.internet.url();
    }
    static getAwardName() {
        const awardName = faker.helpers.arrayElement(["Excellency Award", "Leadership Award", "Trailblazer Award", "Pioneer Award"])
        return awardName
    }

    static jobRole(): string {
        return faker.person.jobTitle();
    }

    static equipmentName(): string {
        return faker.commerce.productMaterial();
    }
    static getTagNames() {
        const techTerm = faker.hacker.noun();
        return techTerm;
    }
    static getLocationName() {
        const location = faker.location.street();
        return location;
    }

    static getUserId(): string {
        const fName = faker.person.firstName();
        const user = faker.internet.email({ firstName: fName })
        return user;
    }
    static getEmployeeid(): string {
        const employeeId = faker.string.numeric({ length: 4 });
        const formattedEmployeeId = `EMP-${employeeId}`;
        return formattedEmployeeId;
    }

    static randomCityName(): string {
        return faker.person.jobArea();
    }

    static getDuration() {
        return faker.date.future().getHours().toString();
    }

    static getDescription(): string {
        const description = faker.lorem.paragraph(1);
        return description;
    }
}

export function getCreditCardNumber(): string {

    return faker.finance.creditCardNumber();
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function getPhoneNumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 7;
    const restDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;

}
export function getCVV(): string {
    return faker.finance.creditCardCVV()
}

export function score() {
    const min = 50;
    const max = 100;
    const step = 5;
    const range = Math.floor((max - min) / step) + 1;
    const randomMultiple = Math.floor(Math.random() * range) * step + min;
    return randomMultiple.toString();

}

export function generateCreditScore(): number {
    // Credit scores typically range from 300 to 850
    const minCreditScore = 300;
    const maxCreditScore = 850;
    return faker.number.int({ min: minCreditScore, max: maxCreditScore });
}

export function gettomorrowDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate() + 1);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export function getCurrentDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}


export function getPastDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    date.setMonth(date.getMonth() - 2);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear() - 4);
    return `${month}/${day}/${year}`;
}

export function getFutureDate(): string {

    const date = new Date();
    date.setDate(date.getDate() + 3);
    date.setMonth(date.getMonth() + 7);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear() + 3);
    return `${month}/${day}/${year}`;
}

export function getFutureyear(): string {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    date.setMonth(date.getMonth() - 2);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear() + 4);
    return `${month}/${day}/${year}`;
}


export function getnextMonthFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 2) // getMonth() is zero-based
    const day = String(date.getDate() + 2)
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export function getcardExpiryDate(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0")// getMonth() is zero-based
    const year = date.getFullYear()
    const yy = year.toString().slice(2)
    return `${month}/${yy}`
}
export function getPonumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 12;
    const restDigits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
}

export function getCCnumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 10;
    const restDigits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
}

