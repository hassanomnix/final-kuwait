// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    swipeBackPage: true,
    pushState: true,
    template7Pages: true
});

// Export selectors engine
var $$ = Dom7;
var pictureSource; // picture source
var destinationType;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false,
});


function save() {

    $('input').each(function () {
        localStorage.setItem($(this).attr('name'), $(this).val());
    });
}


function CameraAccedantHits() {

}



function onPhotoURISuccessfarimage(imageData) {

    $('.farimage').attr({
        'src': imageData,
        'width': '100%'
    });
}

function onPhotoURISuccesshitsimages(imageData) {


    var image = '<li><a rel="gallery-3" href="' + imageData + '" title="Photo title" class="swipebox"><img width="100%" height="80%" src="' + imageData + '" alt="image"/></a></li>';
    $('#photoslist').prepend(image);

}


function capturePhotoWithFile(type) {

    if (type == 'farimage') {

        navigator.camera.getPicture(onPhotoURISuccessfarimage, onFail, {
            quality: 50,
            encodingType: Camera.EncodingType.JPEG,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true
        });
    } else {
        navigator.camera.getPicture(onPhotoURISuccesshitsimages, onFail, {
            quality: 50,
            encodingType: Camera.EncodingType.JPEG,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true
        });
    }
}

function getPhoto(source, type) {
    // Retrieve image file location from specified source


    if (type == 'farimage') {
        navigator.camera.getPicture(onPhotoURISuccessfarimage, onFail, {
            quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: source
        });
    } else {
        navigator.camera.getPicture(onPhotoURISuccesshitsimages, onFail, {
            quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: source
        });
    }

}
// Called if something bad happens.
// 
function onFail(message) {
    //    alert('Failed because: ' + message);
}

document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready to be used!
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;



}

$$(document).on('pageInit', function (e) {


    /* Custom Code */
    $calenderInput = $('#calendar-default');
    if ($calenderInput.length > 0) {
        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
            dateFormat: 'dd / mm / yyyy',
            closeOnSelect: true
        });
    }


    $addcar = $('a.addcar');
    if ($addcar.length > 0) {
        var carscounter = 2;
        $('a.addcar').click(function () {

            carscounter++;
            var element = '<li><div class="item-content"><div class="item-inner"><a href="#" class="removecar" data-remove="' + carscounter + '"><i class="fa fa-times-circle"></i></a>&nbsp;<div class="item-title label">رقم المركبة ' + carscounter + '</div><div class="item-input"><input type="text" name="other_car_number_' + carscounter + '" id="other_car_number"/></div></div></div></li>';

            $('ul.car_numbers_forms').append(element);


        });

    }

    /* end Custom Code */


    $(".swipebox").swipebox();
    $(".videocontainer").fitVids();

    $("#ContactForm").validate({
        submitHandler: function (form) {
            ajaxContact(form);
            return false;
        }
    });


    $(".posts li").hide();
    size_li = $(".posts li").size();
    x = 3;
    $('.posts li:lt(' + x + ')').show();
    $('#loadMore').click(function () {
        x = (x + 1 <= size_li) ? x + 1 : size_li;
        $('.posts li:lt(' + x + ')').show();
        if (x == size_li) {
            $('#loadMore').hide();
            $('#showLess').show();
        }
    });



    $("a.switcher").bind("click", function (e) {
        e.preventDefault();

        var theid = $(this).attr("id");
        var theproducts = $("ul#photoslist");
        var classNames = $(this).attr('class').split(' ');


        if ($(this).hasClass("active")) {
            // if currently clicked button has the active class
            // then we do nothing!
            return false;
        } else {
            // otherwise we are clicking on the inactive button
            // and in the process of switching views!

            if (theid == "view13") {
                $(this).addClass("active");
                $("#view11").removeClass("active");
                $("#view11").children("img").attr("src", "images/switch_11.png");

                $("#view12").removeClass("active");
                $("#view12").children("img").attr("src", "images/switch_12.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_13_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_11");
                theproducts.removeClass("photo_gallery_12");
                theproducts.addClass("photo_gallery_13");

            } else if (theid == "view12") {
                $(this).addClass("active");
                $("#view11").removeClass("active");
                $("#view11").children("img").attr("src", "images/switch_11.png");

                $("#view13").removeClass("active");
                $("#view13").children("img").attr("src", "images/switch_13.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_12_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_11");
                theproducts.removeClass("photo_gallery_13");
                theproducts.addClass("photo_gallery_12");

            } else if (theid == "view11") {
                $("#view12").removeClass("active");
                $("#view12").children("img").attr("src", "images/switch_12.png");

                $("#view13").removeClass("active");
                $("#view13").children("img").attr("src", "images/switch_13.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_11_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_12");
                theproducts.removeClass("photo_gallery_13");
                theproducts.addClass("photo_gallery_11");

            }

        }

    });

    document.addEventListener('touchmove', function (event) {
        if (event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1) {
            event.preventDefault();
        }
    }, false);

    // Add ScrollFix
    var scrollingContent = document.getElementById("pages_maincontent");
    new ScrollFix(scrollingContent);


    var ScrollFix = function (elem) {
        // Variables to track inputs
        var startY = startTopScroll = deltaY = undefined,

            elem = elem || elem.querySelector(elem);

        // If there is no element, then do nothing	
        if (!elem)
            return;

        // Handle the start of interactions
        elem.addEventListener('touchstart', function (event) {
            startY = event.touches[0].pageY;
            startTopScroll = elem.scrollTop;

            if (startTopScroll <= 0)
                elem.scrollTop = 1;

            if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
                elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
        }, false);
    };



});