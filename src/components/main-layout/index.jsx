/* eslint-disable no-nested-ternary */
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import debounce from 'lodash/debounce';
import { globalStateAtom } from '@/recoil/atom/global-state';
import { CollapsedSidebarWidth, DefaultSidebarWidth } from '@/common/constants';
import Breadcrumbs from '../breadcrumbs';
import SideBar from './SideBar';
import { sidebarStateAtom } from '@/recoil/atom/sidebar-state';
import HorizontalLinearStepper from '../horizontal-stepper';
import SideBarStepper from './SideBarStepper';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    // height: 'calc(100vh - 238px)',
    // overflowY: 'auto',
    marginTop: theme.spacing(2),
    '&:not(.full)': {
      marginTop: 110,
    },
  },
  contentContainerSmall: {
    // height: 'calc(100vh - 238px)',
    height: 'calc(100vh - 192px)',
    overflowY: 'auto',
    marginTop: theme.spacing(2),
    '&:not(.full)': {
      marginTop: 64,
    },
  },
  content: {
    paddingLeft: theme.spacing(2),
    '&:not(.full)': {
      paddingLeft: DefaultSidebarWidth + 30,
    },
    paddingRight: theme.spacing(2),
  },
  contentWithCollapsedSidebar: {
    '&:not(.full)': {
      paddingLeft: CollapsedSidebarWidth + 30,
    },
  },
  contentWithStepper: {
    paddingLeft: '30px !important',
  },
}));

function MainLayout({
  children,
  breadcrumbs,
  key,
  isShowSidebar,
  isShowSideBarStepper,
  trigger,
  errors,
  handleSubmit,
  setDataToRecoilStore,
  step,
}) {
  const classes = useStyles();
  const sidebarState = useRecoilValue(sidebarStateAtom);
  const { pathname } = useLocation();
  // const isHasStepper = useState(true);
  const [globalState, setGlobalState] = useRecoilState(globalStateAtom);
  const isFullContent = pathname.includes('dashboard');
  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );

  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      setGlobalState({
        mainLayout: {
          scrollTop,
        },
      });
    }
  };

  return (
    <main>
      {!isFullContent && (
        <>
          {isMobileOrTablet || isShowSidebar ? (
            isShowSideBarStepper ? (
              <SideBarStepper
                trigger={trigger}
                handleSubmit={handleSubmit}
                errors={errors}
                setDataToRecoilStore={setDataToRecoilStore}
              />
            ) : (
              <SideBar />
            )
          ) : (
            <HorizontalLinearStepper
              trigger={trigger}
              handleSubmit={handleSubmit}
              errors={errors}
              setDataToRecoilStore={setDataToRecoilStore}
              step={step}
            />
          )}

          {(isMobileOrTablet || isShowSidebar) && (
            <Breadcrumbs {...breadcrumbs} isShowSidebar={isShowSidebar} />
          )}
        </>
      )}
      <div
        id="123456"
        className={classNames(classes.contentContainer, {
          full: isFullContent,
          [classes.contentContainerSmall]: isMobileOrTablet || isShowSidebar,
        })}
        ref={listInnerRef}
        onScroll={debounce(onScroll, 50)}
      >
        <div
          className={classNames(classes.content, {
            [classes.contentWithCollapsedSidebar]:
              !sidebarState && !isFullContent,
            full: isFullContent,
            [classes.contentWithStepper]: !isMobileOrTablet && !isShowSidebar,
          })}
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
