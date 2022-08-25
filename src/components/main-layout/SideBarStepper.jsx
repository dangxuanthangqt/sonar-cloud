import { ChevronLeft, Subject, Tune } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/system';
import classNames from 'classnames';
import { findIndex } from 'lodash';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { sidebarStateAtom } from '@/recoil/atom/sidebar-state';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { dataSourceStateAtom } from '@/recoil/atom/data-source-state';
import { steps } from '../horizontal-stepper/constant';
import { useStyles } from './style';

function ListItemLink({ icon, primary, to, className, parent, ...rest }) {
  const classes = useStyles();
  const [sidebarState] = useRecoilState(sidebarStateAtom);
  const { pathname } = useLocation();

  // const isActive = to === pathname || (parent && pathname.includes(to));
  const isActive = true;
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Tooltip title={!sidebarState ? primary : ''} arrow placement="right">
      <ListItem
        {...rest}
        button
        component={renderLink}
        className={classNames(className, {
          active: isActive,
        })}
        selected={isActive}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {primary && sidebarState && (
          <ListItemText className={classes.listItem} primary={primary} />
        )}
      </ListItem>
    </Tooltip>
  );
}

const useStylesExternal = makeStyles((theme) => ({
  hideLabel: {
    '& .MuiStepLabel-labelContainer': {
      display: 'none',
    },
  },
  isActive: {
    '& .MuiStepLabel-iconContainer': {
      color: '#0F81C0 !important',
      borderColor: '#0F81C0 !important',
    },
    '& .MuiStepLabel-labelContainer': {
      '& .MuiStepLabel-label': {
        color: '#0F81C0',
        fontWeight: '500 !important',
      },
    },
  },
  connectorLineActive: {
    '& + .MuiStepConnector-root': {
      '& .MuiStepConnector-line': {
        borderColor: '#0F81C0 !important',
        borderWidth: '2px !important',
      },
    },
  },
}));

function SideBarStepper({
  trigger = () => {},
  errors = {},
  handleSubmit,
  setDataToRecoilStore,
}) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const classes = useStyles();
  const classesExternal = useStylesExternal();

  const [sidebarState, setSidebarState] = useRecoilState(sidebarStateAtom);
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);

  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setSidebarState(true);
  };

  const [_, rootPath] = pathname.split('/');

  const handleDrawerClose = () => {
    setSidebarState(false);
  };

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );

  useEffect(() => {
    if (isMobileOrTablet) {
      setSidebarState(false);
      return;
    }
    setSidebarState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileOrTablet]);

  const handleOnClickStep = (index) => {
    if (handleSubmit)
      handleSubmit((values) => {
        setDataToRecoilStore && setDataToRecoilStore(values);
        navigate(steps[index].path);
      })();
    else {
      navigate(steps[index].path);
    }
  };

  React.useEffect(() => {
    /** Check case reload page back to step 1, except step 2 */
    if (activeStep !== 0 && activeStep !== 1 && !dataSourceState)
      navigate(steps[0].path);
  }, [activeStep]);

  React.useEffect(() => {
    const idx = findIndex(steps, (item) => item.path === pathname);
    if (idx !== -1) setActiveStep(idx);
  }, [pathname]);

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: sidebarState,
        [classes.drawerClose]: !sidebarState,
      })}
      classes={{
        paper: classNames(classes.drawerPaper, {
          [classes.drawerOpen]: sidebarState,
          [classes.drawerClose]: !sidebarState,
        }),
      }}
    >
      {sidebarState ? (
        <div
          className={classes.drawerCollapse}
          onClick={handleDrawerClose}
          role="button"
        >
          <ChevronLeft />
        </div>
      ) : (
        <div
          className="flex justify-center cursor-pointer py-2"
          onClick={handleDrawerOpen}
          role="button"
        >
          <Subject />
        </div>
      )}
      <div className={classes.drawerContainer}>
        <List disablePadding>
          <ListItemLink
            primary="Request Parameters"
            icon={<Tune />}
            to="/data-request/data-sources"
            parent
          />
          <Box>
            <Stepper
              sx={{
                pt: '10px',
                pl: '20%',
                '& .MuiStepConnector-root': {
                  ml: '15px',
                  '& .MuiStepConnector-line': {
                    minHeight: '30px',
                  },
                },
              }}
              activeStep={activeStep}
              orientation="vertical"
            >
              {steps.map((item, index) => {
                return (
                  <Step
                    key={item.label}
                    sx={{
                      px: 0,
                      '& :hover': {
                        cursor: 'pointer',
                        '& .MuiStepLabel-iconContainer': {
                          color: '#0F81C0 !important',
                          borderColor: '#0F81C0 !important',
                        },
                        '& .MuiStepLabel-labelContainer': {
                          '& .MuiStepLabel-label': {
                            color: '#0F81C0 !important',
                            fontWeight: '500 !important',
                          },
                        },
                      },
                    }}
                    className={classNames({
                      [classesExternal.isActive]: index <= activeStep,
                      [classesExternal.connectorLineActive]:
                        index <= activeStep - 1,
                    })}
                    onClick={() => handleOnClickStep(index)}
                  >
                    <StepLabel
                      // eslint-disable-next-line react/no-unstable-nested-components
                      StepIconComponent={() => (
                        <SvgIcon component={item.icon} />
                      )}
                      sx={{
                        py: 0,
                        '& .MuiStepLabel-iconContainer': {
                          border: '2px solid #BBBBBB',
                          color: '#BBBBBB',
                          padding: '2px',
                          borderRadius: '50%',
                        },
                        '& .MuiStepLabel-labelContainer': {
                          '& .MuiStepLabel-label': {
                            color: '#12293E',
                            fontWeight: '400 !important',
                          },
                          pl: 1,
                        },
                      }}
                      className={classNames({
                        [classesExternal.hideLabel]: !sidebarState,
                        [classesExternal.isActive]: index === activeStep,
                      })}
                    >
                      {item.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </List>
      </div>
    </Drawer>
  );
}

export default SideBarStepper;
