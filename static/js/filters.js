 app.filter('isLevel', function(){
  'use strict';
  return function(values, selectedLevel) {
    if(!selectedLevel) {
      // initially don't filter
      return values;
    }
    // filter when we have a selected level
    return values.filter(function(value){
      return value.level === selectedLevel;
    });
  };
});

app.filter('isType', function(){
  'use strict';

  return function(values, selectedType) {
    if(!selectedType) {
      // initially don't filter
      return values;
    }
    // filter when we have a selected level
    return values.filter(function(value){
      return value.type === selectedType;
    });
  };
});