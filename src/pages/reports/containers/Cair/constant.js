/* eslint-disable react/jsx-filename-extension */
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import { uuidv4 } from '../../../../common/utils/index';

export const checkBoxRecursiveDefaultValue = {
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
  selected: {
    'A - Lorem Ipsium': ['A.2 - Lorem Ipsium'],
    'B - Lorem Ipsium': ['B.1 - Lorem Ipsium', 'B.2 - Lorem Ipsium'],
  },
};

export const checkboxListDefaultValue = {
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
  selected: ['Fire'],
};

export const radioListDefaultValue = {
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
};

export const LIST_SELECTION = [
  {
    id: 1,
    icon: <DescriptionOutlinedIcon />,
    name: 'View Letter',
  },
  {
    id: 2,
    icon: <WallpaperOutlinedIcon />,
    name: 'View Photo',
  },
  {
    id: 3,
    icon: <DirectionsCarOutlinedIcon />,
    name: 'Vehicle lookup',
  },
  {
    id: 4,
    icon: <PlagiarismOutlinedIcon />,
    name: 'Watchlist',
  },
];
function createData(id, date, firstName, lastName, comment) {
  return { id, date, firstName, lastName, comment };
}
export const LIST_FETCH_DATA = [
  createData(
    1,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
  createData(
    2,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
  createData(
    3,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
  createData(
    4,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
  createData(
    5,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
  createData(
    5,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
  createData(
    5,
    '01/01/2020',
    'Loremipsium',
    'dolorsetmet',
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliqua Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint. Velit officia consequat Amet minim mollit non deserunt ullamco est sit aliquaAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet  sint.'
  ),
];

export const DATA_SUMMARY = {
  vin: 'UU123CCDE1111RT',
  modelYear: 2021,
  builtDate: 'MY BRAND',
  mileage: '20,800 Miles',
  market: {
    code: 'U',
    name: 'US',
  },
  openDate: '01/01/2022',
  lineOfBusiness: 'Customer Center',
  customerVPN: null,
  body: {
    code: 'ABCDE',
    name: 'VEHICLE BODY CODE DESCRIPTION',
  },
  plant: {
    code: '9103',
    name: 'Windsor assembly plant',
  },
  engine: {
    code: 'ERF',
    name: '3.6L V6 24V VVT ENGINE',
    serialNo: '6088888388',
  },
  transmission: {
    code: 'DFH',
    name: '9-SPD 948TE FWD AUTO TRANS',
    serialNo: 'Z0976UMMM',
  },
};
export const DATA_INITAL_DESCRIPTION =
  '0333010011-Internal,Engine,Executive Team,Default,Other,Engine- Other,Engine - Other 0118000000-Product,Drivability,Unknown,Other,Default,Driveability Inquiry,Service 4wd warning';
export const REQUEST_STATUS = [
  {
    id: 1,
    status: 'OPEN',
    createdAt: 'Dec 30, 2019 07:52 PM',
  },
  {
    id: 2,
    status: 'CLOSED',
    createdAt: 'Dec 30, 2019 07:52 PM',
  },
  {
    id: 3,
    status: 'REOPEN',
    createdAt: 'Dec 30, 2019 07:52 PM',
  },
  {
    id: 4,
    status: 'CLOSED',
    createdAt: 'Dec 30, 2019 07:52 PM',
  },
  {
    id: 5,
    status: 'CLOSED',
    createdAt: 'Dec 30, 2019 07:52 PM',
  },
];
