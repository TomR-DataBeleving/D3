VisualizeData();
        		
                $("input[type='checkbox']").click(function() {
                	VisualizeData();
                });
                
                function VisualizeData(){
                	$(".data, #info, #errorHandling").empty();
                	
                	//FILTERS (make arrays with checked checkboxes)
				        //LOCATIONS
					        //Fill array with values of checked checkboxes
		                	var locationsChecked = $('.locations:checked').map(function() {
							    return this.value;
							}).get();
							
						//EDUCATIONS
		                	var educationsChecked = $('.educations:checked').map(function() {
							    return this.value;
							}).get();
							
						//GENDER
		                	var gendersChecked = $('.gender:checked').map(function() {
							    return this.value;
							}).get();
							
						//NATURE
		                	var naturesChecked = $('.nature:checked').map(function() {
							    return this.value;
							}).get();
							
						//STATUS
		                	var statusChecked = $('.status:checked').map(function() {
							    return this.value;
							}).get();

						//RELIGION
		                	var religionsChecked = $('.religion:checked').map(function() {
							    return this.value;
							}).get();
							
						//AGE
						var ageChecked = [];
						if($('#age1').is(':checked')){
								ageChecked.push(20,21,22,23,24,25);
							}
							
							if($('#age2').is(':checked')){
								ageChecked.push(26,27,28,29,30);
							}
							
							if($('#age3').is(':checked')){
								ageChecked.push(31,32,33,34,35);
							}
							
							console.log(locationsChecked);
        
        
                	//DATA
	       				//BED PARTNERS
	                	var fuckTotal = 0;
	                	var fuckDivide = 0;
	                	
	                	//Relationships
	                	var relationsTotal = 0;
	                	var relationsDivide = 0;
                	

                	d3.csv('data/data.csv', function(d) {
		                for (var i = 0; i < d.length; i = i + 1) {
		                	var location = d[i].V005;
		                	var education = d[i].V006;
		                	var gender = d[i].V002;
		                	var natures = d[i].V008;
		                	var status = d[i].V012;
		                	var religion = d[i].V067;
		                	var age = d[i].V003; var age2 = parseInt(age);
		                	
		                	var fucks = d[i].V082;
		                	var relationships = d[i].V010;
		                	
		                	

		                	//IF THIS DATA VALUE IS EQUAL TO ONE OF THE FILTERS VALUES IN ARRAY
		                	if(locationsChecked.indexOf(location) > -1){
		                		if(educationsChecked.indexOf(education) > -1){
		                			if(gendersChecked.indexOf(gender) > -1){
		                				if(naturesChecked.indexOf(natures) > -1){
		                					if(statusChecked.indexOf(status) > -1){
		                						if(religionsChecked.indexOf(religion) > -1){
		                							if(ageChecked.indexOf(age2) > -1){

											                		//SKIP INCORRECT VALUES AND GET DESIRED DATA
													                if(fucks != 99999){
													                	fuckTotal += parseInt(fucks);
													                	fuckDivide ++;
													                }
													                
													                if(relationships != 99999){
													                	relationsTotal += parseInt(relationships);
													                	relationsDivide ++;
													                }
													}
												}
											}
										}
									}
								}
				            }
		                }
		              
		               	//CALCULATE AVG's FOR DATA AND APPEND TO BODY ELEMENTS
			               	//BEDPARTNERS
			                if(fuckDivide > 0){
				                fuckAvg = fuckTotal / fuckDivide;
				                FuckAverage = Math.round(fuckAvg);
				                
				                var Barwidth = FuckAverage * 20 + 'px';
			                    var text = '<div class="bar" style="width:0px;">'  + FuckAverage + '</div>';
			                    $(".visualization .data").append(text);
			                    
			                   $(".visualization .bar").animate({ width: Barwidth }, 1000 )
							
							//RELATIONS
				                relationsAvg = relationsTotal / relationsDivide;
				                RelationsAverage = Math.round(relationsAvg);
				                
				                var Barwidth = RelationsAverage * 20 + 'px';
			                    var text = '<div class="bar" style="width:0px;">'  + RelationsAverage + '</div>';
			                    $(".visualization2 .data").append(text);
			                    
			                   $(".visualization2 .bar").animate({ width: Barwidth }, 1000 )
			                   
			                //FACTOR
				                LoveFactor = RelationsAverage / FuckAverage;
				                LoveFactor = Math.floor(LoveFactor*100)/100;
				                
				                var Barwidth = LoveFactor * 200 + 'px';
			                    var text = '<div class="bar" style="width:0px;">'  + LoveFactor + '</div>';
			                    $(".visualization3 .data").append(text);
			                    
			                   $(".visualization3 .bar").animate({ width: Barwidth }, 1000 )
			                   
			                //DISPLAY NUMBER OF RESPONDENTS
			                   var numberOfRespondents = '<p><em>BASED ON ' + fuckDivide + ' RESPONDENTEN</em> (bron: enquete Romeo and Juliet)</p>';
			                   $("#info").append(numberOfRespondents);
			                }
		                
		                
		                //ERROR HANDLING FOR NULL VALUES
		                else{
		                	
		                	var text = '<div class="bar" style="width:0px;">NO RESPONDENTS</div>';
		                    $("#errorHandling").append(text);
		                    
		                   $(".bar").animate({ width: "200px" }, 1000 )
		                }
		                
                });
            }