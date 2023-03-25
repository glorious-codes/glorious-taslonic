class PendingPromiseMock {
  then(){
    return this;
  }
  catch(){
    return this;
  }
  finally(){}
}

export { PendingPromiseMock };
