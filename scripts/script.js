$(document).ready(function() {
    var phrasesArrey = new Array;

    console.log(phrasesArrey.length);
    //main input functionality
    $("#add").click(function(e) {

        var add = $('#phraseInput').val();
        if ('' != add) {


            $('.list').append('<div class="adPhrase"><p class="item">' + add + '</p> <a href = "#" class = "close">×</a></div> ');
            phrasesArrey.push(add);
            checkLenght();

        }
        $('#phraseInput').val('');
    });

    //check for max 2 phrases
    function checkLenght() {
        var leen = phrasesArrey.length;
        if (leen == 2) {

            $("#add").find('.edge').addClass("none");
            $("#add").find('.shadow').addClass("none");
            $("#add").find('.front').removeClass("front-hover");
            $('#add').attr('disabled', true);


        }
        if (leen > 0) {
            $("#generate").find('.front').removeClass("none");
            $("#generate").find('.edge').removeClass("none");
            $("#generate").find('.shadow').removeClass("none");
            $("#generate").find('.front').addClass("front-hover");
        }
        console.log(phrasesArrey);
        console.log('len ' + leen);

    }

    //toggle classes on butttons
    $(document).on('click', '.close', function() {
        $(this).closest('div').remove();
        var index = phrasesArrey.indexOf($(this).closest('div').find('p').text());
        if (index > -1) {
            phrasesArrey.splice(index, 1);
        }
        var leen = phrasesArrey.length;
        if (leen < 2) {

            $("#add").find('.edge').removeClass("none");
            $("#add").find('.shadow').removeClass("none");
            $("#add").find('.front').addClass("front-hover");


        }

        if (leen < 1) {
            $("#generate").find('.edge').addClass("none");
            $("#generate").find('.shadow').addClass("none");
            $("#generate").find('.front').addClass("none");
            $("#generate").find('.front').removeClass("front-hover");

            $('#add').prop('disabled', false);

        }

    });
    //on click #generate move to 2nd step
    $(document).on('click', '#generate', function() {
        $("#container-1").fadeOut(1000, function() {
            $("#container-1").addClass("none");
        });
        $("#container-2").fadeIn(2000);

        $("#container-2").removeClass("none");
        $("#container-1").addClass("none");

        var leen = phrasesArrey.length;

        $('.name-acc1').text(phrasesArrey[0]);
        $('.name-acc2').text(phrasesArrey[1]);


        $('.drag1').text(phrasesArrey[0]);
        $('.drag2').text(phrasesArrey[1]);
        if (leen == 2) {

            $('.drag2').removeClass('none');
            $('.acc2').removeClass('none');
        }

    });
    //enter will funtion as button AddIt without reloading the page
    $("#phraseInput").keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#add").click();
        }
    });



    //accardion functionality
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;


            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                $(this).find('.img-arr').toggleClass('twist');
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                $(this).find('.img-arr').toggleClass('twist');
            }
        });
    }

    //color selector and color randomizer
    var color1
    var colorRange = document.querySelector('.color-range')
    var randomRange = Math.floor(100 * Math.random())
    var colorChoice = document.getElementById("color-choice")
    var ddrag1 = document.getElementsByClassName("drag1")[0]

    colorRange.addEventListener('input', function(e) {
        var hue = ((this.value / 100) * 360).toFixed(0)
        var hsl = "hsl(" + hue + ", 100%, 50%)"
        var bgHsl = "hsl(" + hue + ", 100%, 95%)"
        colorRange.style.color = hsl
        colorChoice.style.color = hsl
        ddrag1.style.color = hsl
        color1 = hsl

    });
    colorRange.value = randomRange;
    var event = new Event('input');
    colorRange.dispatchEvent(event);

    var colorRange2 = document.querySelector('.color-range2')
    var color2
    var randomRange2 = Math.floor(100 * Math.random())
    var colorChoice2 = document.getElementById("color-choice2")
    var ddrag2 = document.getElementsByClassName("drag2")[0]

    colorRange2.addEventListener('input', function(e) {
        var hue2 = ((this.value / 100) * 360).toFixed(0)
        var hsl2 = "hsl(" + hue2 + ", 100%, 50%)"
        var bgHsl = "hsl(" + hue2 + ", 100%, 95%)"
        colorRange2.style.color = hsl2
        colorChoice2.style.color = hsl2
        ddrag2.style.color = hsl2
        color2 = hsl2


    });
    colorRange2.value = randomRange2;
    ddrag2.value = randomRange2
    var event2 = new Event('input');
    colorRange2.dispatchEvent(event2);



    //interactjs

    // target elements with the "draggable" class
    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            // enable autoScroll
            autoScroll: true,

            listeners: {
                // call this function on every dragmove event
                move: dragMoveListener,

                // call this function on every dragend event
                end(event) {
                    var textEl = event.target.querySelector('p')

                    textEl && (textEl.textContent =
                        'moved a distance of ' +
                        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2) | 0))
                        .toFixed(2) + 'px')
                }
            }
        })
        //moving the phrases
    function dragMoveListener(event) {
        var target = event.target
            // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }



    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener
        /* The dragging code for '.draggable' from the demo above
         * applies to this demo as well so it doesn't have to be repeated. */

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
            // only accept elements matching this CSS selector
            accept: '#yes-drop',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function(event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active')
            },
            ondragenter: function(event) {
                var draggableElement = event.relatedTarget
                var dropzoneElement = event.target

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target')
                draggableElement.classList.add('can-drop')

            },
            ondragleave: function(event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target')
                event.relatedTarget.classList.remove('can-drop')

            },

            ondropdeactivate: function(event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active')
                event.target.classList.remove('drop-target')
            }
        })
        //drag and drop
    interact('.drag-drop')
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,

            listeners: { move: dragMoveListener }
        })

    //on tap on phrase funtionality
    interact('.drag-drop')
        .on('tap', function(event) {

            event.currentTarget.classList.toggle('hover-drag')
            event.preventDefault()



            document.getElementsByClassName('drag1')[0].onclick = function() {

                document.getElementsByClassName('accordion')[0].classList.toggle('active');
                var fls = document.getElementsByClassName('acc1')[0]
                var panel = fls.nextElementSibling;


                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    $(fls).find('.img-arr').toggleClass('twist');
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    $(fls).find('.img-arr').toggleClass('twist');
                }
            }
            document.getElementsByClassName('drag2')[0].onclick = function() {

                document.getElementsByClassName('accordion')[0].classList.toggle('active');
                var fls = document.getElementsByClassName('acc2')[0]
                var panel = fls.nextElementSibling;


                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    $(fls).find('.img-arr').toggleClass('twist');
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    $(fls).find('.img-arr').toggleClass('twist');
                }
            }

        })

    //ajax POST funtionality
    $(document).on('click', '#ajaxbtn', function() {


        var dataX1 = document.getElementsByClassName('drag1')[0].getAttribute('data-x');
        var dataY1 = document.getElementsByClassName('drag1')[0].getAttribute('data-y');
        var dataX2 = document.getElementsByClassName('drag2')[0].getAttribute('data-x');
        var dataY2 = document.getElementsByClassName('drag2')[0].getAttribute('data-y');

        jQuery.ajax({
            url: '#',
            method: 'POST',
            data: {

                text1: phrasesArrey[0],
                position_x1: dataX1,
                position_y1: dataY1,
                color1: color1,

                text2: phrasesArrey[1],
                position_x2: dataX2,
                position_y2: dataY2,
                color2: color2
            },
            success: function(data) {
                console.log(this.data);
                $('#ajaxbtn').addClass('disabled')
                $("#ajaxbtn").find('.edge').addClass("none");
                $("#ajaxbtn").find('.shadow').addClass("none");

                $("#ajaxbtn").find('.front').removeClass("front-hover");
                $("#ajaxbtn").find('.front').addClass("disabled1");
                $('#ajaxbtn').prop('disabled', true);
            }
        });
    });


});