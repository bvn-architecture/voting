$(document).ready(function() {


    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    var blankCandidateMarkup = "<li>" 
    + "<table>" 
    + "  <tr>" 
    + "    <td class='mugshot'><img src='%(mug)s'></td>" 
    + "    <td class='name'>%(name)s</td>" 
    + "    <td class='arrow up'  >&uArr;</td>" 
    + "    <td class='arrow down'>&dArr;</td>" 
    + "    <td class='arrow top' >⇞</td>" 
    + "  </tr>" 
    + "</table>" 
    + "</li>";
    candidates = shuffle(candidates);
    for (i in candidates) {
        var person = candidates[i]
        var candidateMarkup = sprintf(blankCandidateMarkup, person);
        $("#candidate-sortable").append(candidateMarkup);
    }

    //insert "don't care" line
    var unrankedLine = sprintf(blankCandidateMarkup, {
        "name": "Unranked Below",
        "mug": "mugs/Twitter.png"
    });
    unrankedLine = unrankedLine.replace(/<li>/, "<li class='unranked-line'>");
    $("#candidate-sortable li:eq(19)").after(unrankedLine);

    //ui controls
    $('.up').click(function() {
        var liItem = $(this).closest("li");
        if (liItem.prev().is('li')) {
            liItem.insertBefore(liItem.prev())
        }
    });

    $('.down').click(function() {
        var liItem = $(this).closest("li");
        if (liItem.next().is('li')) {
            liItem.insertAfter(liItem.next())
        }
    });
    $('.top').click(function() {
        var liItem = $(this).closest("li");
        $("#candidate-sortable").prepend(liItem);
    });

    $(".vote-button").click(function() {
        var ballot = {};
        ballot["aaa_email"] = $("[name=user_email]").val();
        ballot["aaa_timestamp"] = new Date(Date.now());

        var peeps = $("#candidate-sortable li .name");
        var stoppedCaring = false;
        var stoppedCaringAt = -1;
        var uniformScore = -1;
        for (var i = 0; i < peeps.length; i++) {
            var key = peeps[i].innerText;
            if (!stoppedCaring) {
                if (key != "Unranked Below") {
                    ballot[key] = i;
                } else {
                    stoppedCaring = true;
                    uniformScore = ((peeps.length - 1 - i) / 2) + i;
                }
            } else {
                ballot[key] = uniformScore;
            }
        }

        console.log(JSON.stringify(ballot));
        console.log(ballot);

        $("#entry_1847381329").val(JSON.stringify(ballot));
        $("[name=submit]").trigger("click");
    });

    // var el = document.getElementById('candidate-sortable');
    // var sortable = Sortable.create(el);
});
