
function initVideoAd(){
    
    var prevVideoTime = -1;
    var timeoutId = 0;
    const operatingSystems = {ANDRIOD: "andriod", IOS: "ios", OTHER: "other"};	
    const downloadUrl = {
                        ANDRIOD:"https://play.google.com/store/apps/details?id=com.huuuge.casino.texas&hl=en",
                        IOS: "https://apps.apple.com/us/app/billionaire-casino-slots-777/id1098617974"
                        };
    const trackingTarget = {
                        START: "http://www.mocky.io/v2/5be098b232000072006496f5",
                        END: "http://www.mocky.io/v2/5be098d03200004d006496f6"	
                        };


    (function(){                        
        var element;
        element = document.getElementById("videoContainer"); 
        element.addEventListener('click',unmuteVideo);

        element = document.getElementById("adVideo");
        element.addEventListener('canplay',canPlayVideo);                        
        element.addEventListener('timeupdate',screenplay);
        element.addEventListener('ended',videoEnded);

        element = document.getElementById("spinBtn");                       
        element.addEventListener('click',resumeVideo);

        element = document.getElementById("downloadBtn");;
        element.addEventListener('click',downloadNow);
    })();


    function unmuteVideo(){
        var video = document.getElementById("adVideo");
        if(video.muted){
            video.muted = false;
        }
    }

    function screenplay(){
		
        var btnElem;
        var video = document.getElementById("adVideo");
        var currentTimeInSecs = Math.floor(video.currentTime);
        var prevTimeInSecs = Math.floor(prevVideoTime);

        if(currentTimeInSecs == 4 && prevTimeInSecs != 4){ //Detect first video currentTime>=4
            video.pause();
            btnElem = document.getElementById("spinBtn");
            btnElem.style.visibility = "visible";
            timeoutId = setTimeout(function(){
                btnElem.style.visibility = "hidden";	
                video.currentTime = 21; //Jump to second 21
                video.play(); 
            },10000);
        }
    
        if(currentTimeInSecs == 21 && prevTimeInSecs != 21){ //Detect first video currentTime>=21
            btnElem = document.getElementById("downloadBtn");
            btnElem.style.visibility = "visible";		
        }

        prevVideoTime = video.currentTime;
    }

    function resumeVideo(){
        var btnElem = document.getElementById("spinBtn");
        var video = document.getElementById("adVideo");
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        btnElem.style.visibility = "hidden";
        video.play();
    }

    function downloadNow(){
        var operatingSystem = getOperatingSystem();
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
        var userAgent = navigator.userAgent;

        if(/Android/.test(userAgent)){
            return operatingSystems.ANDRIOD;
        }
        if(/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream){
            return operatingSystems.IOS;
        }

        return operatingSystems.OTHER;
    }

    function sendTrackingPixel(target){
        var img;
        img = document.createElement("img");
        img.src = target;
        img.classList.add("trackingPixelImg");
        document.body.appendChild(img);
    }

    function videoEnded(){
        sendTrackingPixel(trackingTarget.END);
    }

    function canPlayVideo(){
        var video = document.getElementById("adVideo");
        video.addEventListener('play', function(event){
            sendTrackingPixel(trackingTarget.START);
        }, { once: true });
        video.play();
    }

};
