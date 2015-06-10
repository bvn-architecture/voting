$(document).ready(function() {
      var arrowButtons ="<div class='buttons'>"
                       +"<span class='arrow up'>&uArr;</span>"
                       +"<span class='arrow down'>&dArr;</span>"
                       +"<span class='arrow top'>⇞</span>"
                       +"</div>";
      var dontCareLine = "TODO";
      for(i in candidates){
        var person = candidates[i]
        var candidateMarkup = sprintf("<li>"
                                      +"<table>"
                                      +"  <tr>"
                                      +"    <td class='mugshot'><img src='%(mug)s'></td>"
                                      +"    <td class='name'>%(name)s</td>"
                                      +"    <td class='arrow up'  >&uArr;</td>"
                                      +"    <td class='arrow down'>&dArr;</td>"
                                      +"    <td class='arrow top' >⇞</td>"
                                      +"  </tr>"
                                      +"</table>"
                                      +"</li>", person);
        $( "#candidate-sortable" ).append( candidateMarkup );
      }
      $('.up').click(function(){
          var liItem = $(this).closest("li");
          if (liItem.prev().is('li'))
          {
              liItem.insertBefore(liItem.prev())
          }
      });

      $('.down').click(function(){
          var liItem = $(this).closest("li");
          if (liItem.next().is('li'))
          {
              liItem.insertAfter(liItem.next())
          }
      });
      $('.top').click(function(){
          var liItem = $(this).closest("li");
          $( "#candidate-sortable" ).prepend( liItem );
      });



      // var el = document.getElementById('candidate-sortable');
      // var sortable = Sortable.create(el);
    });