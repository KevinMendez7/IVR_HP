var subscriberTemplate = {
  local: {
	  number: "66666666", //numero
	  mask: false, //mascara
	  openPlan: false, //plan libre
	  audioPromo: "no_loc", //audiopromo
	  subscriberType: "0", //tipoabonado 
	  transfer: "512", //numero desvio
	  recaller: false, //rellamador
	  outOfService: false //fuera de horario
  }, 
  external:{
	  statePlan: "A|CN", //estadoplan
	  balance: {
		  total: "0",
		  date: ""
	  } //saldo
  },
  segmentation: {
	  id: "3",
	  name: "PLAN_LIBRE",
	  type: ""	  	  	  
  },
  state: {
	  last: "",
	  now: "",
	  next: ""
  },
  actions: {
	  a: updateDataAPPDPP,
	  b: updateDataIVRPA,
	  c: defineSegment,
	  d: refreshRules
  }
  
}

/////////////////////////////////Get validations by IVRPA/////////////////////////////////

function updateDataIVRPA(subscriber, obj){
	
	var response = obj.HttpResponse.WSIVRCAMResponse["return"][0].valorWS
	
	subscriber.local.mask = response.mascara
	subscriber.local.openPlan = response.planlibre
	subscriber.local.subscriberType = response.tipoabonado
	subscriber.local.audioPromo = response.audiopromo
	subscriber.local.transfer = response.transfer
	subscriber.segmentation.type = response.segmentacion
	
	return subscriber
	
}

///////////////////////////////Get validations by APPDPP/////////////////////////////////

function updateDataAPPDPP(subscriber, obj){
	
	var response = obj.HttpResponse.WSIVRCAMResponse["return"][0].valorWS
	
	subscriber.statePlan = response.estadoplan
	subscriber.balance = response.saldo	
	
	return subscriber
	
}

///////////////////////////////Define segment(Menus & audios)/////////////////////////////////

function defineSegment(subscriber,audioStream){
	for(var i = 0; i<audioStream.length; i++){
		if(audioStream[i].id===subscriberTemplate.local.subscriberType){
		    subscriberTemplate.segmentation=audioStream[i]		       
		}   
	}
}

///////desactivated meanwhile test define segment
///////////////////////////////Get audios by segment/////////////////////////////////

//function getSubscriberAudios(typeSubscriber, audioStream){	
//	typeSubscriber.audio = getAudiosByValidation(typeSubscriber.segmentation.segment);
//	return typeSubscriber;	
	
//}

//function getAudiosByValidation(val){
//	for(var i=0; i<audioStream.length; i++){
//		if(audioStream[i].name==val.toLowerCase()){
//			return audioStream[i].list
//		}	  
//	}
//}

///////////////////////////////Update state in App/////////////////////////////////

//removed by changes
//function handleState(subscriber){
//	
//	subscriber.state.last = subscriber.state.now
//	subscriber.state.now = subscriber.state.next
//	
//	return subscriber
//}

function handleState(subscriber){
	  if(subscriber.state.next!=undefined){
		   subscriber.state.last = subscriber.state.now
		   subscriber.state.now = subscriber.state.next	     
	     return subscriber
	  }	  
		return subscriber
	}

/*************************************************************/
/***********************HANDLE RULES**************************/
/*************************************************************/

function clone( obj ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }

    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }

    return temp;
}

function refreshRules(sub, object){	
	if(object.hasOwnProperty("rules")){
		sub.state = clone(object.rules)		
	}
}

/////temporalmente actualizado
//function getCallflowByDigit(sub, option){
//	  for(var i = 0;i<sub.segmentation.list.length;i++){
//	    if(sub.segmentation.list[i].type=="option"){
//	      for(var j = 0;j<sub.segmentation.list[i].script.length; j++){
//	        if(sub.segmentation.list[i].script[j].option==option){
//	        	refreshRules(sub, sub.segmentation.list[i].script[j])
//	        }
//	      }
//	    }
//	  }
//	}

function getCallflowByDigit(sub, option){
	  for(var i = 0;i<sub.segmentation.list.length;i++){
	    if(sub.segmentation.list[i].type=="option"){
	      for(var j = 0;j<sub.segmentation.list[i].script.length; j++){
	        if(sub.segmentation.list[i].script[j].id==sub.state.now.id){
	          for(var k = 0;k<sub.segmentation.list[i].script[j].list.length; k++){
	            if(sub.segmentation.list[i].script[j].list[k].option==option){
	  	        	refreshRules(sub, sub.segmentation.list[i].script[j].list[k])
	  	        }
	          }
	        }
	      }
	    }
	  }
}


/*************************************************************/
/*************************************************************/
/*************************************************************/

/*************************************************************/
/*********************HANDLE CALLFLOWS************************/
/*************************************************************/

function handleCallflow(subscriber){
	return subscriber.state.now.flow + '.vxml'	
}

function handleNextCallflow(subscriber){
	var temp = subscriber
	handleState(subscriber)
	return temp.state.next.flow + '.vxml'	
}


/*************************************************************/
/*************************************************************/
/*************************************************************/

//Changed by update in principal object
//function getAudio(obj){
//	  var menu = obj.segmentation.list
//	  var state = obj.state.now
//	  for(var i = 0; i<menu.length; i++){
//	    if(menu[i].type==state.type){
//	      var script = menu[i].script
//	      for(var j = 0;j<script.length;j++){
//	        if(script[j].hasOwnProperty("option")){
//	          if(script[j].option==state.num){
//	        	  return script[j].src
//	          }
//	        } else if(script[j].name==state.name){
//	        	return script[j].src	          
//	        }
//	      }
//	    }

//	  }
//}

function getAudio(obj){
	  var menu = obj.segmentation.list
	  var state = obj.state.now
	  for(var i = 0; i<menu.length; i++){
	    if(menu[i].type==state.type){
	      var script = menu[i].script
	      for(var j = 0;j<script.length;j++){
	        if(script[j].id==state.id){
	          if(script[j].hasOwnProperty("list")){
	            for(var k = 0; k<script[j].list.length;k++){
	              if(script[j].list[k].hasOwnProperty("option")){
	                if(script[j].list[k].option==state.num){
	                	return script[j].list[k].src	                  
	                }
	              }
	            }
	          } else if(script[j].name==state.name){
	            return script[j].src	           
	          }
	        }
	      }
	    }

	  }
}

function getAudioPath(subscriber, audio){
	return "../promptFiles/audio/"+subscriber.segmentation.name.toLowerCase()+"/"+audio+".wav"
}



/*************************************************/
/***************Audio diagram*********************/
/*************************************************/

function mergeAudioInfo(subscriber){
	var state = subscriber.state.now.name
	switch(state){
		case 'balance' :
			return validateBalance(subscriber)
			break;		
		default : 
			var loc = getAudio(subscriber)
			return loc.slice()
	}	
	
}


/**************************************************/
/**************************************************/
/*****************Prepago callflow*****************/
/**************************************************/
/**************************************************/

function validateBalance(sub){	
	var balance = sub.external.balance.total
	switch(balance){
		case "0" :
			var audio = getAudio(sub).slice()			
			audio.splice(1,1,sub.external.balance.total);
			audio.push(sub.local.audioPromo)
			return audio
			break;
		default :		
			var audio = getAudio(sub).slice()
			audio.splice(1,0,sub.external.balance.total)
			audio.splice(3,0, sub.external.balance.date)
			audio.push(sub.local.audioPromo)
			return audio
			break;
			
	}
}

function validateMarket(sub){
	
}

function validateRequest(sub){
	
}

function validateTransfer(sub){
	if(!sub.local.outOfService){
		if(!sub.local.reCaller){
			return sub.local.transfer
		}
	}
}


/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/


//////////////SOLO PARA PRUEBAS///////////////////

function getMsisdn(number){
	var response = new Array();
	var callingNumber = "";
	try {
		number = number.substring(4);
		response = number.split("@");
		callingNumber = response[0];
	}  catch(e) {
		var response = "Error";
		return response;
	}	 	 
	return callingNumber; 
}

function getCalledNumber(number){
	var response = new Array();
	try {
		number = number.substring(4);
		response = number.split("@");
	}  catch(e) {
		var response = "Error";
		return response;
	}		
	return response[0];
}

function getServerIP(url){
	var response = new Array();
	try {
		
		response = url.split("@");
		response = response[1].split(";");
	}  catch(e) {
		var response = "Error";
		return response;
	}		
	return response[0];
}

function getSessionId(url){
	var response = "";
	try {
		var array = new Array();
		array = url.split("/");
		response = array[3].substring(13);
	} catch(e) {
		var response = "Error";
		return response;
	} 
	return response;
}
