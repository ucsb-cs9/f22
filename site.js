---
layout: null
---

// TODO: Rewrite in JQuery.  Add unit tests
function pointCount(n) {
  var text = n.data;
  // look for (x pts) where x is some sequence of [0-9]+
  // save the result of [0-9]+ in result[1]
  var pointRegExp = /\([ ]*([0-9]+)[ ]*pt[s]?[ ]*\)/i;  
  var result = pointRegExp.exec(text);
  return result ? parseInt(result[1]) : 0; 
  // if there was a match, result is truthy
  // if there was a match, numeric part is in result[1]
  // otherwise result is 0 points
}

// TODO: Rewrite in JQuery 
function countPoints(n) {                     // n is a Node 
  if (n.nodeType == 3 /*Node.TEXT_NODE*/)   // Check if n is a Text object
    return pointCount(n);                 // If so, parse its text and return number of points
  // Otherwise, iterate through n's children, totalling up the points
  var numpoints = 0; 
  for(var m = n.firstChild; m != null; m = m.nextSibling)  {
     numpoints += countPoints(m);  
  }
  return numpoints;   // Return total of all children's points
}



$(document).ready(function(){
    console.log("site.js: document is ready");
    $('[data-hfj]').each(function() {
	var chapter_num = $(this).data('hfj');
	var href = "{{ site.hfj_chapter_url_prefix }}" + chapter_num;
	$(this).html($('<a href="' + href + '">HFJ Chapter ' + $(this).data('hfj') + '</a>'));
    });

    $('[data-hfdp]').each(function() {
	var chapter_num = $(this).data('hfdp');
	var href = "{{ site.hfdp_chapter_url_prefix }}" + chapter_num;
	$(this).html($('<a href="' + href + '">HFDP Chapter ' + $(this).data('hfdp') + '</a>'));
    });

    if ($(".pointCount").length > 0 ) {
      var total = countPoints(document.body);
      $(".pointCount").html(total);
    }


	       
    console.log("site.js: done");
});
