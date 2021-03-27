export class Fetcher {
  constructor({ onFetch, onFetchSuccess, onFetchError, onProcessChange }){
    this.setOptions({ onFetch, onFetchSuccess, onFetchError, onProcessChange });
    this.fetch();
  }
  setOptions(options){
    this.options = options;
  }
  fetch(){
    this.handleFetch(this.options.onFetch);
  }
  handleFetch(onFetch){
    const promise = onFetch && onFetch();
    if(isPromise(promise)){
      this.handleProcessChange({ isFetching: true });
      promise.then(response => {
        this.handleProcessChange({ fetchSucceeded: true });
        this.runCallbackOption(this.options.onFetchSuccess, response);
      }).catch(err => {
        this.handleProcessChange({ fetchFailed: true });
        this.runCallbackOption(this.options.onFetchError, err);
      });
    }
  }
  handleProcessChange(process){
    this.runCallbackOption(this.options.onProcessChange, process);
  }
  runCallbackOption(callback, data){
    return callback && callback(data);
  }
}

function isPromise(promise){
  return promise && promise.then;
}
