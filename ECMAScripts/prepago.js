function validateBalance(sub){		
	switch(balance){
		case "0" :
			audio = getAudioBySegment(sub).slice()			
			audio.splice(1,1,sub.external.balance.total);
			audio.push(sub.local.audioPromo)
			return audio
			break;
		default :		
			audio = getAudioBySegment(sub).slice()
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