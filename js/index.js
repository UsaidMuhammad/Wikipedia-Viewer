$.fn.enterKey = function (fnc) {
      return this.each(function () {
        $(this).keypress(function (ev) {
          var keycode = (ev.keyCode ? ev.keyCode : ev.which);
          if (keycode == '13') {
              fnc.call(this, ev);
          }
        })
      })
    }

    $(document).ready(function()
    {
      

      $('#search').enterKey(function()
      {
        $('#results').empty();
        $('#container').removeClass().addClass('container margin-contrainer-result');
        $('h3').addClass('hide')
        var queryData = $('#search').val();
        var remoteUrlWithOrigin = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+queryData+"&callback=JSON_CALLBACK";
        // Using jQuery
        $.ajax( {
            url: remoteUrlWithOrigin,
            dataType: 'jsonp',
            type: 'POST',
            success: function(data) {

              for (const pages in data.query.pages) {
                  const element = pages;
                  var HTMLValue ='<a href="https://en.wikipedia.org/?curid='+data.query.pages[element].pageid+'">'+
                                  '<div class="result flow-text blue-grey lighten-4 z-depth-3">' +
                                  '<h4>'+data.query.pages[element].title+'</h4>' +
                                  '<p>'+data.query.pages[element].extract+'</p>' +
                                  '</div>' +
                                  '</a>';
                  $('#results').append(HTMLValue);
                }
              
              
            }
        } );
      })
    });