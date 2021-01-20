var $input;

function onInputFocus(event) {
  var $target = $(event.target);
  var $parent = $target.parent();
  $parent.addClass('input--filled');
};

function onInputBlur(event) {
  var $target = $(event.target);
  var $parent = $target.parent();

  if (event.target.value.trim() === '') {
    $parent.removeClass('input--filled');
  }
};

$(document).ready(function () {
  $input = $('.input__field');

  // in case there is any value already
  $input.each(function () {
    if ($input.val().trim() !== '') {
      var $parent = $input.parent();
      $parent.addClass('input--filled');
    }
  });

  $input.on('focus', onInputFocus);
  $input.on('blur', onInputBlur);
});

var whos = null;
function getplaces(gid, src) {
  whos = src

  //	var  request = "http://ws.geonames.org/childrenJSON?geonameId="+gid+"&callback=getLocation&style=long";
  var request = "http://www.geonames.org/childrenJSON?geonameId=" + gid + "&callback=listPlaces&style=long";
  aObj = new JSONscriptRequest(request);
  aObj.buildScriptTag();
  aObj.addScriptTag();
}

function listPlaces(jData) {
  counts = jData.geonames.length < jData.totalResultsCount ? jData.geonames.length : jData.totalResultsCount
  who = document.getElementById(whos)
  who.options.length = 0;

  if (counts) who.options[who.options.length] = new Option('Select', '')
  else who.options[who.options.length] = new Option('No Data Available', 'NULL')

  for (var i = 0; i < counts; i++)
    who.options[who.options.length] = new Option(jData.geonames[i].name, jData.geonames[i].geonameId)

  delete jData;
  jData = null
}

window.onload = function () { getplaces(6295630, 'continent'); }