"use strict";

$(document).ready(function(){
    $('.color').colpick({
        colorScheme:'dark',
        layout:'rgbhex',
        color:'ff8800',
        onSubmit:function(hsb,hex,rgb,el) {
            $(el).css('background-color', '#'+hex);
            $(el).colpickHide();
            calculateColorVariationAndUpdateStatus();
        }});
    calculateColorVariationAndUpdateStatus();
});

var calculateColorVariationAndUpdateStatus = function () {
    var result = calculateColorVariation($('#left-picker').css('background-color'),$('#right-picker').css('background-color'));
    updateStatusDivision(result);
};

var calculateColorVariation = function(rgb1,rgb2){
    var left_color= parseRgb(rgb1);
    var right_color = parseRgb(rgb2);
    return findColorDifference(left_color,right_color);
};

var parseRgb = function(rgb){
    var colorsOnly = rgb.substring(rgb.indexOf('(') + 1, rgb.lastIndexOf(')')).split(/,\s*/);
    var  components = {};
    components.red = colorsOnly[0];
    components.green = colorsOnly[1];
    components.blue = colorsOnly[2];
    components.opacity = colorsOnly[3];
    return components;
};

var updateStatusDivision = function(status){
    $('#color_difference').text(status);
};

var findColorDifference = function(color1,color2){
    var sumOfsquaresOfDifferences = 0;
    var SCALING_CONSTANT = 2.2641187;
    sumOfsquaresOfDifferences+= Math.pow((color1.red - color2.red),2);
    sumOfsquaresOfDifferences+= Math.pow((color1.green - color2.green),2);
    sumOfsquaresOfDifferences+= Math.pow((color1.blue - color2.blue),2);
    return Math.round(Math.sqrt(sumOfsquaresOfDifferences)* SCALING_CONSTANT);
};