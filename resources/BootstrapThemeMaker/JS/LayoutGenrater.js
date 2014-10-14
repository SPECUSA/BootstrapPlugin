/**
 * @author gauravas
 */



$(document).ready(function(){

	var numCols=0;
	var numRows=0;
	var currentPanelIcon="";
	  
	// Advance Setting Load time Setting  - Strat
	 
	if($("#adanceSettingChk").is(":checked")) {
        
        $("#adanceSettingChk").prop("checked",false);
        $("#advanceSetting").hide().fadeOut(500);
	}
    
    if($("#gridshowChk").is(":checked")) {
        
        $("#gridshowChk").prop("checked",false);
        $("#gridShow").hide().fadeOut(500);
	}
	$("#LayoutMaker_container").css("top",$("#topButton").height()+10);
	  
	  
	  var cdaUrl = location.protocol + '//' + location.host + '/pentaho/plugin/cda/api/';
	  
	
	function sortable(jap){
		$(jap).sortable({
			// connect to timeline
 			connectWith: ".sortable-column",
			
			items: ' > .panel',
			
			revert: 150,
			start: function(event, ui) {
				ui.item.addClass('dragging');
			},
			stop: function(event, ui) {
				
				ui.item.removeClass('dragging');
			}
		});
	};
	
	function genrateAdvanceLayout(esCols,smCols,mdCols,lsCols,LayoutContainer)
	{
		
		esCols=esCols.trim().replace( /\s\s+/g, ' ' );
		smCols=smCols.trim().replace( /\s\s+/g, ' ' );
		mdCols=mdCols.trim().replace( /\s\s+/g, ' ' );
		lsCols=lsCols.trim().replace( /\s\s+/g, ' ' );
		
		/* Validation -Start*/
		if ( mdCols.length < 1 )
		{
			console.log("Please enter medium screen size values.");
			alert("Please enter medium screen size values.");
			document.getElementById("mdCols").focus();
			return;
		}
		else if(lsCols.length < 1)
		{
			console.log("Please enter  leage screen size values.");
			alert("Please enter leage screen size values.");
			document.getElementById("lsCols").focus();
			return;
		}
		else if (smCols.length < 1 )
		{
			console.log("Please enter  small screen size values.");
			alert("Please enter small  screen size values.");
			document.getElementById("smCols").focus();
			return;
		}
		else if(esCols.length <1 )
		{
			console.log("Please enter extra small screen size values.");
			alert("Please enter extra small screen size values.");
			document.getElementById("esCols").focus();
			return;
		}
		
		var esColsArr=esCols.split(" ");
		var smColsArr=smCols.split(" ");
		var mdColsArr=mdCols.split(" ");
		var lsColsArr=lsCols.split(" ");
		
		
		
		if(!(esColsArr.length == smColsArr.length && mdColsArr.length == smColsArr.length && lsColsArr.length == smColsArr.length)) 
		{
			
			console.log("All your screen size values must have same numbers of columns.");
			alert("All your screen size values must have same numbers of columns.");
			return;
		}
		
		/* Validation -end*/
		
		var htmlData="\t<div class='row clearfix'>\n";
		
		for(var i=0;i< esColsArr.length;i++)
		{
			numCols = numCols + 1 ;
			
			
			if(i==0)
				htmlData=htmlData + "\t\t<div class='col-xs-"+ esColsArr[i] + " col-sm-"+ smColsArr[i] + " col-md-"+ mdColsArr[i] + " col-lg-"+ lsColsArr[i] + " column first'>\n";
			else if(i==mdColsArr.length-1)
				htmlData=htmlData + "\t\t<div class='col-xs-"+ esColsArr[i] + " col-sm-"+ smColsArr[i] + " col-md-"+ mdColsArr[i] + " col-lg-"+ lsColsArr[i] + " column last'>\n";
			else
				htmlData=htmlData + "\t\t<div class='col-xs-"+ esColsArr[i] + " col-sm-"+ smColsArr[i] + " col-md-"+ mdColsArr[i] + " col-lg-"+ lsColsArr[i] + " column'>\n";
			
				/* htmlData=htmlData + "\t\t<div class='columnContainer'>"; */
			
					htmlData=htmlData + "\t\t\t<div class='panel panel-primary'>\n";
						htmlData=htmlData + "\t\t\t\t<div class='panel-heading clearfix'>\n";
							htmlData=htmlData + "\t\t\t\t\t<h3 class='panel-title pull-left' style='padding-top: 7.5px;' ><i class='glyphicon glyphicon-stats'></i> Panel "+numCols +  "</h3>\n";
							
							 htmlData=htmlData + "\t\t\t\t\t<div class='btn-group pull-right'>\n";  
								/* Zoom button htmlData=htmlData + " <button class='btn bg-teal btn-sm'><i class='glyphicon glyphicon-zoom-in'></i></button>"; */
								htmlData=htmlData + "\t\t\t\t\t\t <button class='btn  btn-sm panelSettingEvent' id='Penal_Setting'><i class='glyphicon glyphicon-cog'></i></button>\n";
					    		htmlData=htmlData + "\t\t\t\t\t\t <button class='btn  btn-sm ' id='Penal_Minimize' data-toggle='collapse' data-target='#Panel"+ numCols+ "_collapse'><i class='glyphicon glyphicon-minus'></i></button>\n";
					    		htmlData=htmlData + "\t\t\t\t\t\t <button class='btn  btn-sm panelCloseEvent '  id='Penal_Close' data-effect='fadeOut'  data-widget='remove'><i class='glyphicon glyphicon-remove'></i></button>\n";
					    		
			            	 htmlData=htmlData + "\t\t\t\t\t</div>\n"; 
						htmlData=htmlData + "\t\t\t\t</div>\n";
						htmlData=htmlData + "\t\t\t\t<div id='Panel"+ numCols+ "_collapse' class='panel-body collapse in'>\n";
			            htmlData=htmlData + "\t\t\t\t\t<div id='panel"+ numCols+ "'>Panel content [ Panel ID :Panel" +numCols + " ]</div>\n";        
						htmlData=htmlData + "\t\t\t\t</div>\n";
					htmlData=htmlData + "\t\t\t</div>\n";        	    
				/* htmlData=htmlData + "</div>\n"; */
			htmlData=htmlData + "\t\t</div>\n";
		}
		
		htmlData=htmlData + "\t</div>\n";
		
		numRows = numRows + 1;
		$('#' +LayoutContainer).append(htmlData);
		
		
	}
	
	function genrateSimpleLayout(mdCols,LayoutContainer)
	{
		mdCols=mdCols.trim().replace( /\s\s+/g, ' ' );

		/* Validation - Start */
		if( mdCols.length < 1 )
		{
			console.log("Please enter mideum screen size values.");
			document.getElementById("mdCols").focus();
			alert("Please enter screen size values.");
			return;
		}
		/* Validation - end */
		var mdColsArr=mdCols.split(" ");		
		
		/* console.log("\tMedium Screen  : Lenght : " + mdColsArr.length); */
		
		var htmlData="\t<div class='row clearfix'>\n";
		
		for(var i=0;i< mdColsArr.length;i++)
		{
			numCols = numCols + 1 ;
			if(i==0)
				htmlData=htmlData + "\t\t<div class='col-md-"+ mdColsArr[i] +  " column first sortable-column ui-sortable'>\n";
			else if(i==mdColsArr.length-1)
				htmlData=htmlData + "\t\t<div class='col-md-"+ mdColsArr[i] +  " column last sortable-column ui-sortable'>\n";
			else
				htmlData=htmlData + "\t\t<div class='col-md-"+ mdColsArr[i] +  " column sortable-column ui-sortable'>\n";
			
				/* htmlData=htmlData + "\t\t<div class='columnContainer'>"; */
			
					htmlData=htmlData + "\t\t\t<div class='panel panel-primary'>\n";
						htmlData=htmlData + "\t\t\t\t<div class='panel-heading clearfix'>\n";
							htmlData=htmlData + "\t\t\t\t\t<h3 class='panel-title pull-left' style='padding-top: 7.5px;' ><i class='glyphicon glyphicon-stats'></i> Panel "+numCols +  "</h3>\n";
							
							 htmlData=htmlData + "\t\t\t\t\t<div class='btn-group pull-right'>\n";  
								/* Zoom button htmlData=htmlData + " <button class='btn bg-teal btn-sm'><i class='glyphicon glyphicon-zoom-in'></i></button>"; */
								htmlData=htmlData + "\t\t\t\t\t\t <button class='btn  btn-sm panelSettingEvent' id='Penal_Setting'><i class='glyphicon glyphicon-cog'></i></button>\n";
					    		htmlData=htmlData + "\t\t\t\t\t\t <button class='btn  btn-sm ' id='Penal_Minimize' data-toggle='collapse' data-target='#Panel"+ numCols+ "_collapse'><i class='glyphicon glyphicon-minus'></i></button>\n";
					    		htmlData=htmlData + "\t\t\t\t\t\t <button class='btn  btn-sm panelCloseEvent '  id='Penal_Close' data-effect='fadeOut'  data-widget='remove'><i class='glyphicon glyphicon-remove'></i></button>\n";
					    		
			            	 htmlData=htmlData + "\t\t\t\t\t</div>\n"; 
						htmlData=htmlData + "\t\t\t\t</div>\n";
						htmlData=htmlData + "\t\t\t\t<div id='Panel"+ numCols+ "_collapse' class='panel-body collapse in'>\n";
			            htmlData=htmlData + "\t\t\t\t\t<div id='panel"+ numCols+ "'>Panel content [ Panel ID :Panel" +numCols + " ]</div>\n";        
						htmlData=htmlData + "\t\t\t\t</div>\n";
					htmlData=htmlData + "\t\t\t</div>\n";        	    
				/* htmlData=htmlData + "</div>\n"; */
			htmlData=htmlData + "\t\t</div>\n";
		}
		
		htmlData=htmlData + "\t</div>\n";
		
		numRows = numRows + 1;
		
		$('#' +LayoutContainer).append(htmlData);
		
		
	}
	
	function genrateHTML(ContainerID)
	{
		
		var html=$("#" +ContainerID).clone();
		
		$(html).find("#Penal_Setting").remove();
		

		
		return $(html).html().trim();
	}

	
	var removeElements = function(text, selector) 
	{
	    var wrapped = $("<div>" + text + "</div>");
	    wrapped.find(selector).remove();
	    return wrapped.html();
	};

	
	// Download HTML clicke event Start	
	$("#DonwloadHTML").on("click",function(event)
	{
		var html=genrateHTML('LayoutMaker_container');
		
		
      	if(html.length > 0)
		{
			BootstrapDialog.show({
	            title: 'Get HTML',
	            message: function(dialog) {
	                
	                var $message = $('<form><textarea id="code" name="code" style="display:none"></textarea></form>');
	      			          
	                return $message;
	      		},
	            cssClass: 'login-dialog',
	            draggable: true,
	            
	            onshown: function(dialogRef){
	                
	                ZeroClipboard.config({ moviePath: "JS/zeroClipboard/ZeroClipboard.swf" });
					var client = new ZeroClipboard( document.getElementById("btn-copy") );
					
					client.on( "ready", function( readyEvent ) {
					  // alert( "ZeroClipboard SWF is ready!" );
						client.setText(html);	
					  client.on( "aftercopy", function( event ) {
					    // `this` === `client`
					    // `event.target` === the element that was clicked
					   alert("Bootstrap code was copied.");
					  } );
					} );
					var editor = CodeMirror.fromTextArea(document.getElementById("code"),
						{mode: "text/html",
						lineNumbers: true,
						theme: "default"
						  }).setValue(html);        
	            
	            },
	            buttons: [{
              	id: 'btn-copy',
                label: 'Copy',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	
                    
                },
                cssClass: 'btn-default'
            }, {
	                label: 'Close',
	                action: function(dialogItself){
	                    dialogItself.close();
	                },
	                cssClass: 'btn-danger'
	            }]
	        });
			
			}
		
		
	});
	$("#DonwloadJS").on("click",function(event)
	{
		var html=genrateHTML('LayoutMaker_container');
		var jsCode="$(function(){\n" +
					"\t$(\".container\").addClass(\"container-fluid\").removeClass(\"container\");\n" +
					"\t$('.panelCloseEvent').on('click',function(){\n" +
						"\t\tvar effect = $(this).data('effect');\n" +
						"\t\t$(this).closest('.panel')[effect]();\n"+
						"\t});\n" +
						"}) ";
		
      	if(html.length > 0)
		{
			BootstrapDialog.show({
	            title: 'Get JS',
	            message: function(dialog) {
	                
	                var $message = $('<form><textarea id="code" name="code" style="display:none"></textarea></form>');
	      			          
	                return $message;
	      		},	            
	            draggable: true,
	            
	            onshown: function(dialogRef){
	                ZeroClipboard.config({ moviePath: "JS/zeroClipboard/ZeroClipboard.swf" });
					var client = new ZeroClipboard( document.getElementById("btn-copy") );
					
					client.on( "ready", function( readyEvent ) {
					  // alert( "ZeroClipboard SWF is ready!" );
						client.setText(jsCode);	
					  client.on( "aftercopy", function( event ) {
					    // `this` === `client`
					    // `event.target` === the element that was clicked
					   alert("Bootstrap code was copied.");
					  } );
					} );
					    

	                var editor = CodeMirror.fromTextArea(document.getElementById("code"),
						{mode: "javascript",
						lineNumbers: true,
						theme: "default"
						  }).setValue(jsCode);        
	            
	            },
	            buttons: [{
              	id: 'btn-copy',
                label: 'Copy',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	
                    
                },
                cssClass: 'btn-default'
            }, {
	                label: 'Close',
	                action: function(dialogItself){
	                    dialogItself.close();
	                },
	                cssClass: 'btn-danger'
	            }]
	        });
			
			}
		
		
		
	});
	// Download HTML clicke event end 
	
	
	// Layout Genrater clicke event Start
	$("#Layout1_genrate").on("click",function(event)
	{
		
		if(numRows==0)
		{
			$('#LayoutMaker_container' ).append('<div id="LayoutContainer" class="col-md-12" >\n</div>');
		}
		if ($('#adanceSettingChk').is(":checked"))
		{
			genrateAdvanceLayout($('#esCols').val(),$('#smCols').val(),$('#mdCols').val(),$('#lsCols').val(),'LayoutContainer');	
		}
		else
		{
			genrateSimpleLayout($('#mdCols').val(),'LayoutContainer');
		}
		
	});
	
	$("#Layout1_Clear").on("click",function(event)
	{
		
		BootstrapDialog.confirm('Are you sure wants to clear existing bootstrap design?', function(result){
            if(result) {
                numCols=0;
				numRows=0;
                $('#LayoutMaker_container').html("");
                
            }
        });
		
	});
		
	// Layout Genrater clicke event end

	// Advance setting change event start
	$('#adanceSettingChk').change(function() {
        
        if($(this).is(":checked")) {
            $("#advanceSetting").show().fadeIn(500);
        }
        else
        {
        	$("#advanceSetting").hide().fadeOut(500);
        }
                
    });
    $('#gridshowChk').change(function() {
        
        if($(this).is(":checked")) {
            $("#gridShow").show().fadeIn(500);
            
        }
        else
        {
        	$("#gridShow").hide().fadeOut(500);
        }
                
    });
    
    // Advance setting change event end
    
    // Page setting click event start
	$("#PageSettingEvent").on("click",function(event)
	{
		BootstrapDialog.show({
            title: 'Page Properties',
            message: function(dialog) {
                
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
        		return $message;
            },
            data: {
                'pageToLoad': 'PageProperties.html'
            },
            draggable: true,
            
            onshown: function(dialogRef){
                
                $("#PenalID").val($panelBody.attr('id'));
                
            },
            buttons: [{
              
                label: 'Apply',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	
                	$panelBody.attr('id',$("#PenalID").val());
                	dialogItself.close();
                    
                },
                cssClass: 'btn-default'
            }, {
                label: 'Close',
                action: function(dialogItself){
                    dialogItself.close();
                },
                cssClass: 'btn-danger'
            }]
        });
	});
	// Page setting click event end
	
	// Panel setting click event start
	$(document.body).on('click','.panelSettingEvent',function(event){
  		
  		var $clickedPanel = $(this);
    	var $panelBody=$clickedPanel.parents(".panel").find(".panel-body").children().eq(0);
    	var $panelTitle=$clickedPanel.parents(".panel-heading").find('.panel-title');
    	var $panelMinimizeBtn = $clickedPanel.parents(".btn-group").find("#Penal_Minimize");
    	var $panelCloseBtn = $clickedPanel.parents(".btn-group").find("#Penal_Close");
    	var $panelDiv = $clickedPanel.parents(".panel");
    	
    	BootstrapDialog.show({
            title: 'Panel Properties',
            message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
        
                return $message;
            },
            data: {
                'pageToLoad': 'Properties.html'
            },
            closable :false,
            draggable: true,
            onshown: function(dialogRef){
                
                $("#PenalID").val($panelBody.attr('id'));
                $("#PanelIcon").val($panelTitle.find("i").attr("class"));
                $("#PanelIconImg").attr("class",$panelTitle.find("i").attr("class"));
                currentPanelIcon =$panelTitle.find("i").attr("class");
                $("#PenalTitle").val(removeElements($panelTitle.html(),"i").trim());
				             
             	/*   $("#PenalCSSClass").val($clickedPanel.parents(".panel").attr("class")); */
                
                if ($panelMinimizeBtn.css('display') == 'none') {
   	 				$('#PenalMinimize').attr('checked', false);
				} 
				else
				{
					$('#PenalMinimize').attr('checked', true);
				}
				
				if ($panelCloseBtn.css('display') == 'none') {
   	 				$('#PenalClose').attr('checked', false);
				}
				else
				{
					$('#PenalClose').attr('checked', true);
				}
                /* $("#PenalMinimize").val();
                $("#PenalClose").val(); */
               	
           		if($panelDiv.hasClass("panel-default"))
               	{
               		$("#PanelColor").prop('selectedIndex', 0);
               	}
                else if($panelDiv.hasClass("panel-primary"))
                {
               		$("#PanelColor").prop('selectedIndex', 1);
               	}
                else if($panelDiv.hasClass("panel-success"))
                {
               		$("#PanelColor").prop('selectedIndex', 2);
               	}
               	else if($panelDiv.hasClass("panel-info"))
                {
               		$("#PanelColor").prop('selectedIndex', 3);
               	}
               	else if($panelDiv.hasClass("panel-warning"))
                {
               		$("#PanelColor").prop('selectedIndex', 4);
               	}
               	else if($panelDiv.hasClass("panel-danger"))
                {
               		$("#PanelColor").prop('selectedIndex', 5);
               	}

                
            },
            buttons: [{
              
                label: 'Apply',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	
                	$panelBody.attr('id',$("#PenalID").val());
                	
                	$panelBody.text("Panel content [ Panel ID :" +$("#PenalID").val() + " ]");
                	
                	$panelTitle.html("<i class='"+ $("#PanelIcon").val()+"'></i> " + $("#PenalTitle").val());
                	
                	
                	if ($('#PenalMinimize').is(":checked"))
                	{
                		$panelMinimizeBtn.show();
                	}
                	else
                	{
                		$panelMinimizeBtn.hide();
                	}
                	
                	if ($('#PenalClose').is(":checked"))
                	{
                		$panelCloseBtn.show();
                	}
                	else
                	{
                		$panelCloseBtn.hide();
                	}
                	
                	$panelDiv.attr("Class","panel " +$("#PanelColor  option:selected").val() );
                	var htmlId = "#" + $("#PenalID").val();
                	                
							
               		/* $clickedPanel.parents(".panel").attr("class",$("#PenalCSSClass").val()); */
                    dialogItself.close();
                    
                },
                cssClass: 'btn-default'
                
            }, {
                label: 'Close',
                action: function(dialogItself){
                    dialogItself.close();
                },
                cssClass: 'btn-danger'
            }]
        });
    	
    	
        
   });
	
	$(document.body).on('click','.panelCloseEvent',function(){
  		
  		var effect = $(this).data('effect');
        $(this).closest('.panel')[effect]();
   });

 	$('#maximize').on('click',function () {
 	
 		
        
        var printContents = new $("#divToPrint").clone();           
        var myWindow = window.open('', '1409222365140','width=1200,height=800,toolbar=1,menubar=1,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
        var doc = myWindow.document;
        
        var printContent=$('#LayoutMaker_container').clone();
        
       
        $(printContent).find("#Penal_Setting").remove();
        doc.open();
        doc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    	doc.write("<html>");
    	doc.write("<head>");
    	
    	doc.write("<script src='JS/jquery-1.7.2.min.js'></script>"); 
    	doc.write("<link href='JS/bootstrap/css/bootstrap.min.css' rel='stylesheet'>");
    	doc.write("<link href='JS/bootstrap/css/bootstrap-theme.min.css' rel='stylesheet'>");
    	doc.write("<script src='JS/bootstrap/js/bootstrap.min.js'></script>"); 
    	doc.write("<script src='JS/LayoutGenrater.js'></script>");
    	doc.write("</head>");
    	doc.write("<body style='padding-top:10px' >");
        	doc.write("<div class='container-fluid'>");
        		doc.write($(printContent).html());
        	doc.write("</div>");
		doc.write("</body>");
		doc.write("</html>");
        doc.close();
        
     
  	});
  	
  	$(document.body).on('change keyup paste mouseup','#PanelIcon',function(){
  		
	    if ($(this).val() != currentPanelIcon) {
	        currentPanelIcon = $(this).val();
	        $("#PanelIconImg").attr("class",currentPanelIcon);
	    	
	    }
	});
  
});

