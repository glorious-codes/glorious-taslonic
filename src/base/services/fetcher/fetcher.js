import * as fetcherConstants  from '@base/constants/fetcher';
import { Fetcher } from '@base/models/fetcher/fetcher';

const _public = {};

_public.build = ({ onFetch, onFetchError, onFetchSuccess, onProcessChange }) => {
  return new Fetcher({ onFetch, onFetchError, onFetchSuccess, onProcessChange });
};

_public.buildCssClasses = ({ fetching, fetchFailed } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  if(fetching) cssClasses.push(`${baseCssClass}-fetching`);
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
