Interactive video ad that works on mobile (android and iOS). 
Developed with pure JS, html and css.

What makes a video interactive? 
The abilities to pause/resume the video, jump to a specific second of the video file and position DOM elements on top of the video.

Screenplay:
1. When the video is started fire tracking pixel.
2. On second 4- pause the video and show 'spin' button.
    2.1 Click on the button will resume the video and hide the button.
    2.2 If the user didn't click the button for 10 seconds then jump to second 21 of the video.
3. On second 21- show 'download now' button.
    3.1 Click on the button will open a link to download the app - appStore/googlePlay according to the operation system.
4. When the video is ended fire tracking pixel.

Assumptions:
1. Mobile device orientation is landscape.
2. The device screen ratio is 16:9 (same as the video).