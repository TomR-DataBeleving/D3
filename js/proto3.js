var drug = "cocaine";
$("#"+drug).css("background-color", "#a6002e");
DrawArc(drug);

$( ".filterDrug" ).click(function() {
	$("#drugs").empty();
	$(".filterDrug").css("background-color", "#f6f6f6");
	$(this).css("background-color", "#a6002e");
	drug=event.target.id;
	DrawArc(drug);
});


function DrawArc(){
	var width = 300,
	    height = 300,
	    radius = Math.min(width, height) / 2;
	
	var color = d3.scale.ordinal()
	    .range(["#a6002e", "#f35000"]);
	
	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(70);
	
	if(drug == "cocaine"){
		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d.cocaine; });
	}
	
	if(drug == "heroine"){
		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d.heroine; });
	}
	
	if(drug == "marijuana"){
		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d.marijuana; });
	}
	
	if(drug == "alcohol"){
		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d.alcohol; });
	}
	
	
	
	var svg = d3.select("#drugs").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	d3.csv("data/drugsUse.csv", function(error, data) {
	
	  var g = svg.selectAll(".arc")
	      .data(pie(data))
	    .enter().append("g")
	      .attr("class", "arc");
	
	  g.append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return color(d.data.geslacht); });
	
	  g.append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	      .attr("dy", ".20em")
	      .style("text-anchor", "middle")
	      .text(function(d) { 
		      	if(drug == "cocaine"){
		      		return d.data.cocaine; 
		      	}
		      	
		      	if(drug == "heroine"){
		      		return d.data.heroine; 
		      	}
		      	
		      	if(drug == "marijuana"){
		      		return d.data.marijuana; 
		      	}
		      	
		      	if(drug == "alcohol"){
		      		return d.data.alcohol; 
		      	}
		      			      	
	      	});
	});
}