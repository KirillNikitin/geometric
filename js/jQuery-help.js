( function(){
    var widgetSquare = '<div class="widget square"><div class="resize"><div class="resize-sq"></div></div><div class="rotate"><div class="rotate-sq"></div></div></div>';
    var widgetRectangle = '<div class="widget rectangle"><div class="resize"><div class="resize-sq"></div></div><div class="rotate"><div class="rotate-sq"></div></div></div>';
    var widgetCircle = '<div class="widget circle"><div class="resize"><div class="resize-sq"></div></div><div class="rotate"><div class="rotate-sq"></div></div></div>';
    var widgetEllipse = '<div class="widget ellipse"><div class="resize"><div class="resize-sq"></div></div><div class="rotate"><div class="rotate-sq"></div></div></div>';
    var widgetTextbox = '<div class="widget textbox"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor. Praesent dictum, libero ut tempus dictum, neque eros elementum mauris, quis mollis arcu velit ac diam.</p><div class="resize"><div class="resize-sq"></div></div><div class="rotate"><div class="rotate-sq"></div></div></div>';

    $(document).on('change', '#select', function(event){
        var def = $('#select option:selected')[0].id;
        switch (def) {
            case 'square':
                $(widgetSquare).appendTo(".content");
                break;
            case 'rectangle':
                $(widgetRectangle).appendTo(".content");
                break;
            case 'circle':
                $(widgetCircle).appendTo(".content");
                break;
            case 'ellipse':
                $(widgetEllipse).appendTo(".content");
                break;
            case 'textbox':
                $(widgetTextbox).appendTo(".content");
                break;
            default:
                'default'
        }

        $('#set-default').click(function () {
            $('#select option').eq(0).attr('selected', 'selected');
        });

        (function($) {
            $.fn.drags = function(opt) {
                opt = $.extend({handle:"",cursor:"move"}, opt);
                var $el = this;
                var offset, rotating = false;
                $el.css('cursor', opt.cursor).on("mousedown", function(e) {
                    e.preventDefault(); // disable selection
                    var $drag = $(this).addClass('draggable');
                    var z_idx = $drag.css('z-index'),
                        drg_h = $drag.outerHeight(),
                        drg_w = $drag.outerWidth(),
                        pos_y = $drag.offset().top + drg_h - e.pageY,
                        pos_x = $drag.offset().left + drg_w - e.pageX;
                    $drag
                        .css('z-index', 1000)
                        .parents()
                            .on("mousemove", function(e) {
                                $('.draggable').offset({
                                    top:e.pageY + pos_y - drg_h,
                                    left:e.pageX + pos_x - drg_w
                                });
                            })
                            .on("mouseup", function() {
                                $drag.removeClass('draggable').css('z-index', '');
                            });
                });

                var offset, rotating = false;
                $el.find('.rotate').on('mousedown', function(e) {
                    e.stopPropagation(); // disable selection
                    rotating = true;
                    var $rot = $(this).parent().addClass('rotatable');

                    var RAD2DEG = 180 / Math.PI;
                    $rot.centerX = $rot.offset().left + $rot.width()/2;
                    $rot.centerY =  $rot.offset().top + $rot.height()/2;

                    offset = Math.atan2($rot.centerY - e.pageY, e.pageX - $rot.centerX);
                    $rot.parents()
                            .on("mousemove", function (e) {
                                if (rotating) {
                                    var newOffset = Math.atan2($rot.centerY - e.pageY, e.pageX - $rot.centerX);
                                    var r = (offset - newOffset) * RAD2DEG;
                                    $('.rotatable').css('-webkit-transform', 'rotate(' + r + 'deg)');
                               }
                            })
                            .on("mouseup", function (e) {
                                rotating = false;
                                $rot.removeClass('rotatable')
                            });
                });
                $el.find('.resize').on("mousedown", function(e) {
                    e.stopPropagation();
                    resizing = true;
                    var $res = $(this).parent().addClass('resizable');
                    var z_idx = $res.css('z-index'),
                        drg_h = $res.outerHeight(),
                        drg_w = $res.outerWidth(),
                        pos_y = $res.offset().top + drg_h - e.pageY,
                        pos_x = $res.offset().left + drg_w - e.pageX;

                    $res.css('z-index', 1000)
                        .parents()
                            .on("mousemove", function (e) {
                                if($('.resizable').hasClass('circle') || $('.resizable').hasClass('square')) {
                                    $('.resizable').css({
                                        height: e.pageY - $res.offset().top,
                                        width: e.pageY - $res.offset().top
                                    });
                                } else {
                                    $('.resizable').css({
                                        height: e.pageY - $res.offset().top,
                                        width: e.pageX - $res.offset().left
                                    });
                                }

                            })
                            .on("mouseup", function () {
                                $res.removeClass('resizable').css('z-index', '');
                            });
                });
                return $el;
            }
        })(jQuery);

        $(document).on('mouseover', '.widget', function() {
            $('.widget').drags();
        });
    });

}());
