/* eslint-disable react/jsx-filename-extension */
import {
  DriveEta,
  PermDataSetting,
  Spellcheck,
  Tune,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TableViewIcon from '@mui/icons-material/TableView';

import {
  appRoutes,
  dataRequestRoutes,
  reportsRoutes,
} from '@/routes/constants';
import { ReactComponent as AltRoute } from '../../assets/svg/alt-route.svg';
import { ReactComponent as FactCheck } from '../../assets/svg/fact-check.svg';
import { ReactComponent as TopicIcon } from '../../assets/svg/topic-icon.svg';
import { ReactComponent as SaleCode } from '../../assets/svg/sale-code.svg';
import { ReactComponent as SyncLock } from '../../assets/svg/sync-lock.svg';
import { ReactComponent as Article } from '../../assets/svg/article.svg';
import { ReactComponent as Reports } from '../../assets/svg/report.svg';

const TAB = {
  REPORTS: 'reports',
  DATA_REQUEST: 'data-request',
};

export const getSidebarItems = (t) => [
  {
    label: t('sidebar.request_parameters'),
    icon: <Tune />,
    to: appRoutes.dataRequestRoute,
    child: [
      {
        label: t('sidebar.data_sources'),
        icon: <SvgIcon component={TopicIcon} />,
        to: dataRequestRoutes.dataSources,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.keyword'),
        icon: <SvgIcon component={Spellcheck} />,
        to: dataRequestRoutes.keywords,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.vehicle'),
        icon: <SvgIcon component={DriveEta} />,
        to: dataRequestRoutes.vehicles,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.sale_codes'),
        icon: (
          <SvgIcon
            component={SaleCode}
            width={24}
            height={24}
            viewBox="0 0 24 24"
          />
        ),
        to: dataRequestRoutes.saleCodes,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.dates'),
        icon: <SvgIcon component={FactCheck} />,
        to: dataRequestRoutes.dates,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.lops_and_parts'),
        icon: <SvgIcon component={PermDataSetting} />,
        to: dataRequestRoutes.lops,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.others'),
        icon: <SvgIcon component={AltRoute} />,
        to: dataRequestRoutes.others,
        tab: TAB.DATA_REQUEST,
      },
      {
        label: t('sidebar.summary'),
        icon: <SvgIcon component={PermDataSetting} />,
        to: dataRequestRoutes.summary,
      },
      {
        label: 'MUI Data Grid',
        to: dataRequestRoutes.muiGrid,
        tab: TAB.DATA_REQUEST,
        icon: <SvgIcon component={TableViewIcon} />,
      },
    ],
  },
  {
    label: t('sidebar.request_parameters'),
    icon: <Tune />,
    to: appRoutes.reportsRoute,
    child: [
      {
        label: 'Request Status',
        to: 'request-status',
        icon: <SvgIcon component={SyncLock} />,
        tab: TAB.REPORTS,
      },
      {
        label: 'Reports',
        icon: (
          <SvgIcon
            sx={{
              fontSize: 21,
              marginLeft: '-2px',
              marginRight: '5px',
            }}
            component={SummarizeIcon}
          />
        ),
        to: reportsRoutes.reports,
        tab: TAB.REPORTS,
        child: [
          {
            label: 'TSB Documents',
            icon: <SvgIcon component={Article} />,
            to: reportsRoutes.tsbDocument,
            tab: TAB.REPORTS,
          },
          {
            label: 'Glove Box',
            icon: <SvgIcon component={Article} />,
            to: reportsRoutes.gloveBox,
            tab: TAB.REPORTS,
          },
          {
            label: 'CAIR',
            icon: <SvgIcon component={Article} />,
            to: reportsRoutes.cair,
            tab: TAB.REPORTS,
            child: [
              {
                label: 'CAIR Detailed Report',
                to: reportsRoutes.cairDetailedReport,
                tab: TAB.REPORTS,
              },
              {
                label: 'CAIR Production Detailed.',
                to: reportsRoutes.cairProductionDetailed,
                tab: TAB.REPORTS,
              },
              {
                label: 'CAIR Detailed Redacted.',
                to: reportsRoutes.cairDetailedRedacted,
                tab: TAB.REPORTS,
              },
              {
                label: 'CAIR No Address Redact..t',
                to: reportsRoutes.cairNoAddressRedacted,
                tab: TAB.REPORTS,
              },
            ],
          },
          {
            label: 'Cherwell',
            icon: <SvgIcon component={Article} />,
            to: reportsRoutes.cherwell,
            tab: TAB.REPORTS,
          },
          {
            label: 'Repair Orders',
            icon: <SvgIcon component={Article} />,
            to: reportsRoutes.repairOder,
            tab: TAB.REPORTS,
          },
        ],
      },
    ],
  },
];
