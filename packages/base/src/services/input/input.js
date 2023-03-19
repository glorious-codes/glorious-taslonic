const _public = {};

_public.parseType = type => {
  return isValidCustomType(type) ? type : 'text';
};

function isValidCustomType(type){
  return [
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'month',
    'number',
    'password',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ].includes(type);
}

export default _public;
