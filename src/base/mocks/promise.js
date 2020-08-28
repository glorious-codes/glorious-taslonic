class PromiseMock {
  constructor(responseType, { response, err, shouldAbort } = {}){
    this.responseType = responseType;
    this.response = response;
    this.err = err;
    this.shouldAbort = shouldAbort;
  }
  then(onSuccess, onError){
    const { responseType, shouldAbort, response, error } = this;
    handleCallback(responseType, { shouldAbort, onSuccess, onError, response, error });
    return this;
  }
  catch(onError){
    const { responseType, shouldAbort, err } = this;
    handleCallback(responseType, { shouldAbort, onError, err });
    return this;
  }
  finally(onComplete){
    if(!this.shouldAbort)
      onComplete();
  }
}

function handleCallback(responseType, { shouldAbort, onSuccess = () => {}, onError = () => {}, response, err } = {}){
  if(shouldAbort)
    return false;
  if(responseType == 'success')
    return onSuccess(response);
  onError(err);
}

export { PromiseMock };
