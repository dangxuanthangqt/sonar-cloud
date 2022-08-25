import { faker } from '@faker-js/faker';
import sample from 'lodash/sample';
import moment from 'moment';
import { uuidv4 } from '../../common/utils/index';

function createData(id, date, firstName, lastName, comment) {
  return { id, date, firstName, lastName, comment };
}

const STATUS = ['OPEN', 'REOPEN', 'CLOSED'];
const random = Math.floor(Math.random() * STATUS.length);

export const generatedReports = () => {
  return Array.from({ length: 7 }, (_, i) => {
    return {
      reportHead: [
        {
          title: 'VIN',
          data: faker.helpers.replaceSymbols('????????????'), // 'ZYRQQ',
        },
        {
          title: 'Open Data',
          data: moment(faker.date.past()).format('MM/DD/YYYY'),
        },
        {
          title: 'Model Year',
          data: moment(faker.date.past()).format('YYYY'),
        },
        {
          title: 'Mileage',
          data: '20,800',
        },
        {
          title: 'Built Date',
          data: moment(faker.date.past()).format('MM/DD/YYYY'),
        },
      ],
      reportTable: Array.from({ length: 6 }, (__, idx) =>
        createData(
          idx,
          moment(faker.date.past()).format('MM/DD/YYYY'),
          faker.name.firstName(),
          faker.name.lastName(),
          faker.random.words(20)
        )
      ),
      reportSummary: {
        vin: faker.helpers.replaceSymbols('????????????'),
        modelYear: moment(faker.date.past()).format('MM/DD/YYYY'),
        builtDate: moment(faker.date.past()).format('MM/DD/YYYY'),
        mileage: '20,800 Miles',
        market: {
          code: faker.address.countryCode('alpha-1'),
          name: faker.address.countryCode('alpha-2'),
        },
        openDate: moment(faker.date.past()).format('YYYY'),
        lineOfBusiness: faker.name.firstName() + faker.name.lastName(),
        customerVPN: null,
        body: {
          code: faker.helpers.replaceSymbols('????'),
          name: 'VEHICLE BODY CODE DESCRIPTION',
        },
        plant: {
          code: faker.finance.pin(4),
          name: 'Windsor assembly plant',
        },
        engine: {
          code: faker.finance.currencyCode(),
          name: '3.6L V6 24V VVT ENGINE',
          serialNo: '6088888388',
        },
        transmission: {
          code: faker.finance.currencyCode(),
          name: '9-SPD 948TE FWD AUTO TRANS',
          serialNo: faker.helpers.replaceSymbols('???????'),
        },
      },
      reportDesc: `${faker.phone.number()}-Internal,Engine,Executive Team,Default,Other,Engine- Other,Engine - Other 0118000000-Product,Drivability,Unknown,Other,Default,Driveability Inquiry,Service 4wd warning`,
      reportRequestStatus: Array.from({ length: 5 }, (__, idx1) => ({
        id: idx1,
        status: sample(STATUS),
        createdAt: moment(faker.date.past()).format('MMM DD, YYYY h:mm A'),
      })),
    };
  });
};

export const categorizationData = {
  checkBoxRecursive: {
    dataMaster: [
      {
        key: uuidv4(),
        value: 'A - Lorem Ipsium',
        label: 'A - Lorem Ipsium',
        child: [
          {
            value: 'A.1 - Lorem Ipsium',
            label: 'A.1 - Lorem Ipsium',
            key: uuidv4(),
          },
          {
            value: 'A.2 - Lorem Ipsium',
            label: 'A.2 - Lorem Ipsium',
            key: uuidv4(),
          },
        ],
      },
      {
        value: 'B - Lorem Ipsium',
        label: 'B - Lorem Ipsium',
        key: uuidv4(),
        child: [
          {
            value: 'B.1 - Lorem Ipsium',
            label: 'B.1 - Lorem Ipsium',
            key: uuidv4(),
          },
          {
            value: 'B.2 - Lorem Ipsium',
            label: 'B.2 - Lorem Ipsium',
            key: uuidv4(),
          },
        ],
      },
      {
        value: 'C - Lorem Ipsium',
        label: 'C - Lorem Ipsium',
        key: uuidv4(),
        child: [
          {
            value: 'C.1 - Lorem Ipsium',
            label: 'C.1 - Lorem Ipsium',
            key: uuidv4(),
          },
          {
            value: 'C.2 - Lorem Ipsium',
            label: 'C.2 - Lorem Ipsium',
            key: uuidv4(),
          },
        ],
      },
    ],
    selected: {},
    // selected: {
    //   'A - Lorem Ipsium': ['A.2 - Lorem Ipsium'],
    //   'B - Lorem Ipsium': ['B.1 - Lorem Ipsium', 'B.2 - Lorem Ipsium'],
    // },
  },
  checkboxList: {
    dataMaster: [
      {
        value: 'Crash',
        label: 'Crash',
      },
      {
        value: 'Fire',
        label: 'Fire',
      },
      {
        value: 'Property Damage',
        label: 'Property Damage',
      },
      {
        value: 'Injuries',
        label: 'Injuries',
        hasInput: true,
      },
      {
        value: 'Fatilites',
        label: 'Fatilites',
        hasInput: true,
      },
    ],
    selected: [],
  },
  radioList: {
    dataMaster: [
      {
        value: 'Responsive',
        label: 'Responsive',
      },
      {
        value: 'Maybe Responsive',
        label: 'Maybe Responsive',
      },
      {
        value: 'Not Responsive',
        label: 'Not Responsive',
      },
    ],
    selected: '',
  },
};
