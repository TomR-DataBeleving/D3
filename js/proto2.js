var selectedYear = "1950";
$("#"+selectedYear).css("background-color", "#a6002e");

readDataFile(selectedYear);

$( ".filterYear" ).click(function() {
	$(".filterYear").css("background-color", "#f6f6f6");
	$(this).css("background-color", "#a6002e");
	selectedYear=event.target.id;
	readDataFile(selectedYear);
});



function readDataFile() {
	var csv = d3.dsv(',');
	console.log(selectedYear);

	//Get data
	csv('data/divorced.csv', function(err, data) {    
	   var percentage1 = data[0][selectedYear];
	   percentage = Math.round(percentage1);
	   
	   DrawRadial(percentage);
	});
}
   
        
        
//Define sizes and animations for Radial
function radial1(parent) {
    var _data=null,
        _duration= 1000,
        _selection,
        _margin = {top:0, right:0, bottom:30, left:0},
        __width = 200,
        __height = 175,
        _diameter,
        _label="",
        _fontSize=10;


    var _mouseClick;

    var _value= 0,
        _minValue = 0,
        _maxValue = 100;

    var  _currentArc= 0, _currentArc2= 0, _currentValue=0;

    var _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI/180));




    _selection=d3.select(parent);

	//Build SVG with all elements
    function component() {

        _selection.each(function (data) {

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            var enter = svg.enter().append("svg").attr("class","radial-svg").append("g");

            measure();

            svg.attr("width", __width)
                .attr("height", __height);


            var background = enter.append("g").attr("class","component")
            
            _arc.endAngle(360 * (Math.PI/180))

            background.append("rect")
                .attr("class","background")
                .attr("width", _width)
                .attr("height", _height);

            background.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            background.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + _width/2 + "," + (_width + _fontSize) + ")")
                .text(_label);
           var g = svg.select("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

			
			//Add filled part of the radial
            _arc.endAngle(_currentArc);
            enter.append("g").attr("class", "arcs");
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                .attr("class","arc")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc)
                .style("fill", "#f35000");
            
            
            var firefox;
			var val = navigator.userAgent.toLowerCase(); 
			  if(val.indexOf("firefox") > -1)
			  {
			  firefox = "translate(87,103)";
			  }
			  else
			  {
			  	firefox = "translate(80,102)";
			  }
                      
            
            //Add % character after percentage value. Easier solution: (this.textContent = Math.round(i(t)) + "%";), but in this case, you can not adjust the size of the character.
            enter.append("g").attr("class", "percentageCharacter");
			var percentage = svg.select(".percentageCharacter").append("text")
	            .attr("transform", "translate(110,77)")
	            .attr("width",_width)
	            .style("fill","#FFF");
            
            //Add value as text inside radial
            enter.append("g").attr("class", "labels");
            var label = svg.select(".labels").selectAll(".label").data(data);
            label.enter().append("text")
                .attr("class","label")
                .attr("y",_width/2+50/3)
                .attr("x",_width/2)
                .attr("width",_width)
                //.text(function (d) { return Math.round((_value-_minValue)/(_maxValue-_minValue)*100)})
                .style("fill", "#FFF")
            path.exit().transition().duration(500).attr("x",1000).remove();

			
			//Animate transitions
            layout(svg);
            function layout(svg) {

                var ratio=(_value-_minValue)/(_maxValue-_minValue);
                var endAngle=Math.min(360*ratio,360);
                endAngle=endAngle * Math.PI/180;

                path.datum(endAngle);
                path.transition().duration(_duration)
                    .attrTween("d", arcTween);

                if (ratio > 1) {
                    path2.datum(Math.min(360*(ratio-1),360) * Math.PI/180);
                    path2.transition().delay(_duration).duration(_duration)
                        .attrTween("d", arcTween2);
                }

                label.datum(Math.round(ratio*100));
                label.transition().duration(_duration)
                    .tween("text",labelTween);
            }
            
            // Interactive hover on path
            var enter = svg.selectAll("path").on("mouseenter", function(d,i){
				d3.select("#divorces .arc")
				.transition()
				.ease("cubic-out")
				.duration("500")
				.style("fill", "#a6002e");					
			});
			
			var leave = svg.selectAll("path").on("mouseleave", function(d,i){
				d3.select("#divorces .arc")
				.transition()
				.ease("cubic-out")
				.duration("500")
				.style("fill", "#f35000");
			});

        });


    }
	
	//Get current arc and value and adjust them
    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);

        return function(t) {
            _currentValue = i(t);
            this.textContent = Math.round(i(t));
        }
    }

    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);

        return function(t) {
            _currentArc=i(t);
            return _arc.endAngle(i(t))();
        };
    }

	
	//Set size
    function measure() {
        _width=_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
        _height=_width;
        _fontSize=_width*.2;
        _arc.outerRadius(_width/2);
        _arc.innerRadius(_width/2 * .85);
    }


    component.render = function() {
        measure();
        component();
        return component;
    }
	
	//If there are no Arguments -> return values
    component.value = function (_) {
        if (!arguments.length) return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }
    
    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component.diameter = function(_) {
        if (!arguments.length) return _diameter
        _diameter =  _;
        return component;
    };

    component.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        return component;
    };

    component.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        return component;
    };

    component.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };


    return component;

}


function DrawRadial() 
	{
	var rp1 = radial1(document.getElementById('circle2'))
	    .diameter(200)
	    .value(percentage)
	    .render();
    }
		              
