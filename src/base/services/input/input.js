const _public = {};

_public.parseType = type => {
  return isValidCustomType(type) ? type : 'text';
};

function isValidCustomType(type){
  return ['email', 'number', 'password', 'search', 'tel', 'url'].includes(type);
}

export default _public;
