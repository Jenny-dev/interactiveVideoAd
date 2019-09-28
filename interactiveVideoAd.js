
function initVideoAd(){

    const downloadUrl = {
        ANDRIOD:"https://play.google.com/store/apps/details?id=com.huuuge.casino.texas&hl=en",
        IOS: "https://apps.apple.com/us/app/billionaire-casino-slots-777/id1098617974"
    };
    const trackingTarget = {
        START: "http://www.mocky.io/v2/5be098b232000072006496f5",
        END: "http://www.mocky.io/v2/5be098d03200004d006496f6"	
    };

    const spinTimeSec = 4;                          //video's time value- when to pause it and show spin button
    const downloadTimeSec = 21;                     //video's time value- when to show download button
    const WaitForUserInteractionMiliSecs = 10000;   //timeout before jump to downloadTimeSec

    runVideoAd(downloadUrl,trackingTarget,spinTimeSec,downloadTimeSec,WaitForUserInteractionMiliSecs);

}

function runVideoAd(downloadUrl,trackingTarget,spinTimeSec,downloadTimeSec,WaitForUserInteractionMiliSecs){
    
    let prevVideoTime = -1;
    let timeoutId = 0;
    const operatingSystems = {ANDRIOD: "andriod", IOS: "ios", OTHER: "other"};
    	
    const videoContainerElement = document.getElementById("videoContainer"); 
    const adVideoElement = document.getElementById("adVideo");
    const spinBtnElement = document.getElementById("spinBtn");
    const downloadBtnElement = document.getElementById("downloadBtn");


    (function(){                        
        videoContainerElement.addEventListener('click',unmuteVideo);

        adVideoElement.addEventListener('canplay',canPlayVideo);                        
        adVideoElement.addEventListener('timeupdate',screenplay);
        adVideoElement.addEventListener('ended',videoEnded);
                      
        spinBtnElement.addEventListener('click',resumeVideo);

        downloadBtnElement.addEventListener('click',downloadNow);
    })();


    function unmuteVideo(){
        if(adVideoElement.muted){
            adVideoElement.muted = false;
        }
    }

    function screenplay(){
		
        let videoCurrTime = adVideoElement.currentTime;
        let currentTimeInSecs = Math.floor(videoCurrTime);
        let prevTimeInSecs = Math.floor(prevVideoTime);
        prevVideoTime = videoCurrTime;

        if(currentTimeInSecs == spinTimeSec && prevTimeInSecs != spinTimeSec){ //Detect first video currentTime>=spinTimeSec
            adVideoElement.pause();
            spinBtnElement.style.visibility = "visible";
            timeoutId = setTimeout(function(){
                spinBtnElement.style.visibility = "hidden";	
                adVideoElement.currentTime = downloadTimeSec; //Jump to downloadTimeSec
                adVideoElement.play(); 
            },WaitForUserInteractionMiliSecs);
        }
    
        if(currentTimeInSecs == downloadTimeSec && prevTimeInSecs != downloadTimeSec){ //Detect first video currentTime>=downloadTimeSec
            downloadBtnElement.style.visibility = "visible";		
        }

    }

    function resumeVideo(){
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        spinBtnElement.style.visibility = "hidden";
        adVideoElement.play();
    }

    function downloadNow(){
        let operatingSystem = getOperatingSystem();
        switch(operatingSystem){
            case operatingSystems.ANDRIOD:
                window.open(downloadUrl.ANDRIOD);
                break;
            case operatingSystems.IOS:
                window.open(downloadUrl.IOS);
                break;
            //default:
        }
    }

    function getOperatingSystem(){
        let userAgent = navigator.userAgent;

        if(/Android/.test(userAgent)){
            return operatingSystems.ANDRIOD;
        }
        if(/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream){
            return operatingSystems.IOS;
        }

        return operatingSystems.OTHER;
    }

    function sendTrackingPixel(target){
        let img = document.createElement("img");
        img.src = target;
        img.classList.add("trackingPixelImg");
    }

    function videoEnded(){
        sendTrackingPixel(trackingTarget.END);
        removeUnneededEventListeners();
    }

    function removeUnneededEventListeners(){
        videoContainerElement.removeEventListener('click',unmuteVideo);

        adVideoElement.removeEventListener('canplay',canPlayVideo);                        
        adVideoElement.removeEventListener('timeupdate',screenplay);
        adVideoElement.removeEventListener('ended',videoEnded);
         
        spinBtnElement.removeEventListener('click',resumeVideo);
    }

    function canPlayVideo(){
        adVideoElement.addEventListener('play', function(event){
            sendTrackingPixel(trackingTarget.START);
        }, { once: true });
        adVideoElement.play();
    }

};
