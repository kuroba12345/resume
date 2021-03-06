// Generated by CoffeeScript 1.6.3
(function() {
  window.onload = function() {
    var oC, oGC,
      _this = this;
    oC = document.getElementById("c1");
    oGC = oC.getContext("2d");
    oC.onmousedown = function(ev) {
      ev = ev || window.event;
      oGC.save();
      oGC.beginPath();
      oGC.moveTo(ev.clientX - oC.offsetLeft, ev.clientY - oC.offsetTop);
      document.onmousemove = function(ev) {
        ev = ev || window.event;
        oGC.lineTo(ev.clientX - oC.offsetLeft, ev.clientY - oC.offsetTop);
        return oGC.stroke();
      };
      document.onmouseup = function(ev) {
        document.onmousemove = null;
        return document.onmouseup = null;
      };
      return oGC.restore();
    };
    $("#clear").bind("click", function() {
      return oGc.clearRect(0, 0, oC.width, oC.height);
    });
    $("#widthadjust").bind("click", function() {
      var d;
      if ($("#widthinput").val()) {
        d = $("#widthinput").val();
        return oC.width = $("#widthinput").val();
      } else {
        return oC.width = 600;
      }
    });
    $("#heightadjust").bind("click", function() {
      var d;
      if ($("#heightinput").val()) {
        d = $("#heightinput").val();
        return oC.height = $("#heightinput").val();
      } else {
        return oC.height = 500;
      }
    });
    $("#color").change(function() {
      var r;
      if ($("#color").val() === "black") {
        return oGC.lineWidth = "black";
      } else {
        r = $("#color").val();
        return oGC.strokeStyle = r;
      }
    });
    $("#thickness").change(function() {
      var r;
      if ($("#thickness").val() === "2") {
        return oGC.lineWidth = 2;
      } else {
        r = $("#thickness").val();
        return oGC.lineWidth = r;
      }
    });
    return $(function() {
      var bCanPreview, canvas, ctx, image, imageSrc;
      bCanPreview = true;
      canvas = document.getElementById('picker');
      ctx = canvas.getContext('2d');
      image = new Image();
      image.onload = function() {
        return ctx.drawImage(image, 0, 0, image.width, image.height);
      };
      imageSrc = 'images/colorwheel1.png';
      switch ($(canvas).attr('var')) {
        case '2':
          imageSrc = 'images/colorwheel2.png';
          break;
        case '3':
          imageSrc = 'images/colorwheel3.png';
          break;
        case '4':
          imageSrc = 'images/colorwheel4.png';
          break;
        case '5':
          imageSrc = 'images/colorwheel5.png';
      }
      image.src = imageSrc;
      $('#picker').mousemove(function(e) {
        var canvasOffset, canvasX, canvasY, dColor, imageData, pixel, pixelColor;
        if (bCanPreview) {
          canvasOffset = $(canvas).offset();
          canvasX = Math.floor(e.pageX - canvasOffset.left);
          canvasY = Math.floor(e.pageY - canvasOffset.top);
          imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
          pixel = imageData.data;
          pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
          $('.preview').css('backgroundColor', pixelColor);
          oGC.strokeStyle = $("#hexVal").val();
          $('#rVal').val(pixel[0]);
          $('#gVal').val(pixel[1]);
          $('#bVal').val(pixel[2]);
          $('#rgbVal').val(pixel[0] + ',' + pixel[1] + ',' + pixel[2]);
          dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
          return $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        }
      });
      $('.controls').click(function(e) {
        var b;
        bCanPreview = !bCanPreview;
        b = $("#hexVal").val();
        if (b !== "#00000") {
          return oGC.strokeStyle = $("#hexVal").val();
        } else {
          return oGC.strokeStyle = "black";
        }
      });
      $('.preview').click(function(e) {
        $('.colorpicker').fadeToggle("slow", "linear");
        return bCanPreview = ture;
      });
      return $("#eraseradjust").bind("click", function() {
        var hex, rgb;
        rgb = $(".preview").css('background-color');
        if (rgb >= 0) {
          return rgb;
        } else {
          rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
          hex = function(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
          };
          rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
        $("#eraser").change(function() {
          return oGC.lineWidth = $("#eraser").val();
        });
        oGC.strokeStyle = "white";
        return $("#pen").bind("click", function() {
          var n;
          oGC.strokeStyle = rgb;
          return n = $("#thickness").val();
        });
      });
    });
  };

}).call(this);
