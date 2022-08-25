/* eslint-disable react/jsx-filename-extension */
import { SvgIcon } from '@mui/material';
import { DriveEta, PermDataSetting, Spellcheck } from '@mui/icons-material';
import { appRoutes, dataRequestRoutes } from '@/routes/constants';
import { ReactComponent as AltRoute } from '../../assets/svg/alt-route.svg';
import { ReactComponent as FactCheck } from '../../assets/svg/fact-check.svg';
import { ReactComponent as TopicIcon } from '../../assets/svg/topic-icon.svg';
import { ReactComponent as SaleCode } from '../../assets/svg/sale-code.svg';
import { ReactComponent as SyncLock } from '../../assets/svg/sync-lock.svg';
import { ReactComponent as Article } from '../../assets/svg/article.svg';
import { ReactComponent as Reports } from '../../assets/svg/report.svg';

export const steps = [
  {
    label: 'Datasources',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.dataSources}`,
    // icon: <SvgIcon component={TopicIcon} />,
    icon: TopicIcon,
  },
  {
    label: 'Keywords',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.keywords}`,
    // icon: <SvgIcon component={Spellcheck} />,
    icon: Spellcheck,
  },
  {
    label: 'Vehicles',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.vehicles}`,
    to: dataRequestRoutes.vehicles,
    icon: DriveEta,
  },
  {
    label: 'Sales Codes',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.saleCodes}`,
    // icon: (
    //   <SvgIcon
    //     component={SaleCode}
    //     width={24}
    //     height={24}
    //     viewBox="0 0 24 24"
    //   />
    // ),
    icon: SaleCode,
  },
  {
    label: 'Dates',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.dates}`,
    // icon: <SvgIcon component={FactCheck} />,
    icon: FactCheck,
  },
  {
    label: 'LOPs Parts',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.lops}`,
    // icon: <SvgIcon component={PermDataSetting} />,
    icon: PermDataSetting,
  },
  {
    label: 'Summary',
    path: `${appRoutes.dataRequestRoute}/${dataRequestRoutes.summary}`,
    // icon: <SvgIcon component={AltRoute} />,
    icon: AltRoute,
  },
];
