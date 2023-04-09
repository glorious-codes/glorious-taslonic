import * as fetcherConstants  from '@base/constants/fetcher';
import { Fetcher } from '@base/models/fetcher/fetcher';

const _public = {};

_public.build = params => new Fetcher(params);

_public.buildCssClasses = ({ isFetching, fetchFailed } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  if(isFetching) cssClasses.push(`${baseCssClass}-fetching`);
  if(fetchFailed) cssClasses.push(`${baseCssClass}-fetch-failed`);
  return cssClasses.join(' ');
};

_public.getMessage = constantKey => {
  return fetcherConstants[constantKey];
};

function getBaseCssClass(){
  return 't-fetcher';
}

export default _public;
