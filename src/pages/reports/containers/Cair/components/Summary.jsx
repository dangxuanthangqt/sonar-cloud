import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { TEXT_COLOR } from '@/layouts/constant';
import WrapCollapse from './WrapCollapse';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    height: '37px',
    paddingRight: '10px',
    borderBottom: '1px solid #E5E5E5',
    gap: '10px',
  },
  wrapSubItem: {
    // boderRight: '1px solid #E5E5E5',
    height: '100%',
    gap: '10px',
    color: TEXT_COLOR.BLUE.BLUE1,
  },
  subItem: {
    borderRight: '1px solid #E5E5E5',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    minWidth: '50px',
    // paddingRight: '20px',
    // gap: '18px',
  },
  title: {
    height: '100%',
    minWidth: '135px',
    background: '#EDF4FB',
    fontWeight: 600,
    padding: '0  0 0 10px',
    fontSize: '12px',
    color: TEXT_COLOR.BLUE.BLUE1,
  },
}));

function ItemData({ title, children }) {
  const classes = useStyles();
  return (
    <div className={classNames('flex', classes.item)}>
      <div
        className={classNames('flex flex-col justify-center', classes.title)}
      >
        {title}
      </div>
      <div
        className={classNames(
          'flex flex-1  items-center text-xs',
          classes.wrapSubItem
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Summary({ data }) {
  const classes = useStyles();
  const {
    vin,
    modelYear,
    builtDate,
    mileage,
    market,
    openDate,
    lineOfBusiness,
    customerVPN,
    body,
    plant,
    engine,
    transmission,
  } = data;
  return (
    <WrapCollapse title="Summary">
      <Grid container>
        <Grid style={{ margin: '0px' }} item xs={12} md={4}>
          <ItemData title="VIN">
            <span className="text-xs">{vin}</span>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={4}>
          <ItemData title="Model Year">
            <span className="text-xs">{modelYear}</span>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={4}>
          <ItemData title="Built Date">
            <span className="text-xs">{builtDate}</span>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={4}>
          <ItemData title="Mileage">
            <span className="text-xs">{mileage}</span>
          </ItemData>
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemData title="Market">
            <div className={classNames('', classes.subItem)}>
              {market?.code}
            </div>
            <div>{market?.name}</div>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={4}>
          <ItemData title="Open Date">
            <span className="text-xs">{openDate}</span>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={6}>
          <ItemData title="Line of Business">
            <span className="text-xs">
              {!lineOfBusiness ? '----' : lineOfBusiness}
            </span>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={6}>
          <ItemData title="Customer Provided VPN">
            <span className="text-xs">
              {!customerVPN ? '----' : customerVPN}
            </span>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={6}>
          <ItemData title="Body">
            <div className={classNames('', classes.subItem)}>{body?.code}</div>
            <div>{body?.name}</div>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={6}>
          <ItemData title="Plant">
            <div className={classNames('', classes.subItem)}>{plant?.code}</div>
            <div>{plant?.name}</div>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={12}>
          <ItemData title="Engine">
            <div className={classNames('', classes.subItem)}>
              {engine?.code}
            </div>
            <div className={classNames('pr-8', classes.subItem)}>
              {engine?.name}
            </div>
            <div>{engine?.serialNo}</div>
          </ItemData>
        </Grid>
        <Grid style={{ margin: '0px' }} item xs={12} md={12}>
          <ItemData title="Transmission">
            <div className={classNames('', classes.subItem)}>
              {transmission?.code}
            </div>
            <div className={classNames('pr-8', classes.subItem)}>
              {transmission?.name}
            </div>
            <div>{transmission?.serialNo}</div>
          </ItemData>
        </Grid>
      </Grid>
    </WrapCollapse>
  );
}

export default Summary;
