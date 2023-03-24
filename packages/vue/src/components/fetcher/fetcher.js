import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import { TRIGGER_TEXT } from '@base/constants/fetcher';
import { tBanner } from '@vue/components/banner/banner';
import { tLoader } from '@vue/components/loader/loader';
import fetcherService from '@base/services/fetcher/fetcher';
import template from './fetcher.html';

export const tFetcher = {
  name: 't-fetcher',
  components: { tBanner, tLoader },
  props: [
    'onFetch',
    'onFetchSuccess',
    'onFetchError',
    'onMount',
    'fetchErrorMessage'
  ],
  data(){
    return {
      fetcher: null,
      isFetching: false,
      fetchFailed: false,
      banner: null,
      closeButtonAriaLabel: CLOSE_BUTTON_ARIA_LABEL,
      triggerText: TRIGGER_TEXT
    };
  },
  created(){
    const fetcher = fetcherService.build({
      onFetch: () => this.handleCallbackProp(this.onFetch),
      onFetchSuccess: response => this.handleCallbackProp(this.onFetchSuccess, response),
      onFetchError: err => this.handleFetchError(this.onFetchError, err),
      onProcessChange: this.handleProccess
    });
    this.setFetcher(fetcher);
    this.handleCallbackProp(this.onMount, fetcher);
  },
  methods: {
    handleProccess({ isFetching, fetchFailed }){
      this.setFetching(isFetching);
      this.setFetchFailed(fetchFailed);
      if(isFetching) this.setBanner(null);
    },
    handleFetchError(callback, err){
      this.setBanner({
        message: this.getBannerMessage(),
        onTriggerClick: () => this.fetcher.fetch()
      });
      this.handleCallbackProp(callback, err);
    },
    handleCallbackProp(callback, data){
      return callback && callback(data);
    },
    setFetcher(fetcher){
      this.fetcher = fetcher;
    },
    setFetching(isFetching){
      this.isFetching = isFetching;
    },
    setFetchFailed(hasFailed){
      this.fetchFailed = hasFailed;
    },
    setBanner(banner){
      this.banner = banner;
    },
    getBannerMessage(){
      return this.fetchErrorMessage || fetcherService.getMessage('FETCH_ERROR_MESSAGE');
    }
  },
  computed: {
    classes(){
      const { isFetching, fetchFailed } = this;
      return fetcherService.buildCssClasses({ fetching: isFetching, fetchFailed });
    },
    isBusy(){
      return this.isFetching ? 'true' : 'false';
    },
    isContentHidden(){
      return this.fetchFailed || this.isFetching ? 'true' : 'false';
    }
  },
  template
};
