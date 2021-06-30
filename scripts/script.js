$(document).ready(function() {
    var phrasesArrey = new Array;
    var phraseQunty = 4;
    var colorsArrey = new Array;
    var dataXArrey = new Array;
    var dataYArrey = new Array;

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
        if (leen == phraseQunty) {

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
        if (leen < phraseQunty) {

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
    //enter will funtion as button AddIt without reloading the page
    $("#phraseInput").keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#add").click();
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
        var seen = phrasesArrey;

        for (var i = 0; i < leen; i++) {
            console.log(i);
            $('#inner-dropzone').append('<div id="yes-drop" class="drag-drop "></div>');
            $('#right-construct').append('<div class="accordion"><div class="img-acc"></div><p class="name-acc"></p><div class="img-arr"></div><div class="img-del"></div></div><div class="panel"><p id="color-choice">Colour</p><input class="colr" type="range" min="0" max="100" value="75" title="Drag me, baby."></div>');
        }
        var idx = 0
        $("#inner-dropzone div").each(function(index) {
            idd = idx + 1;
            $(this).addClass('drag' + idd);
            $(this).text(seen[idx]);


            idx += 1;


        });
        var ida = 0

        $("#right-construct div.accordion").each(function(index) {
            idd = ida + 1;

            $(this).addClass('acc' + idd);

            $(this).children('p').text(seen[ida]);
            $(this).next().find('input').addClass('color-range ccol' + idd);

            ida += 1;


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


        var colida = 0
        var colorArrey = new Array
        $("#inner-dropzone div").each(function(index) {
            idd = colida + 1;


            var colorRange = document.querySelector('.ccol' + idd)
            var color2
            var randomRange = Math.floor(100 * Math.random())

            var thiz = this
            colorRange.addEventListener('input', function(e) {
                var hue = ((this.value / 100) * 360).toFixed(0)
                var hsl = "hsl(" + hue + ", 100%, 50%)"

                colorRange.style.color = hsl

                thiz.style.color = hsl
                color2 = hsl
            });
            colorRange.value = randomRange;
            thiz.value = randomRange;
            var event2 = new Event('input');
            colorRange.dispatchEvent(event2);
            colorsArrey.push(color2);
            console.log(colorsArrey);
            colida += 1;
        });




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

                //tap to view accardion
                var idz = 0
                $("#inner-dropzone div").each(function(index) {
                    var idd = idz + 1;


                    $(this).on("click", function() {

                        var index = $(this).get(0).classList[1].replace(/drag/g, '');

                        console.log(index);

                        var panel = document.getElementsByClassName('acc' + index)[0].nextElementSibling;
                        $('.acc' + index).toggleClass('active');

                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                            $(this).find('.img-arr').toggleClass('twist');
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";
                            $(this).find('.img-arr').toggleClass('twist');
                        }
                    })
                });


            })
            // fo
    });

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
                // move: dragMoveListener,

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





    //ajax POST funtionality
    $(document).on('click', '#ajaxbtn', function() {
        var som = 0;
        for (var i = 0; i < phrasesArrey.length; i++) {
            idd = som + 1;
            oopx = document.getElementsByClassName('drag' + idd)[0].getAttribute('data-x');
            oopy = document.getElementsByClassName('drag' + idd)[0].getAttribute('data-y');
            dataXArrey.push(oopx);
            dataYArrey.push(oopy);
            som += 1
        }

        jQuery.ajax({
            url: '#',
            method: 'POST',
            data: {

                text: phrasesArrey,
                position_x: dataXArrey,
                position_y: dataYArrey,
                color: colorsArrey,


            },
            success: function(data) {
                // alert(this.data, true);
                // console.log(this.data, true);
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