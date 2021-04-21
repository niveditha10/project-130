song1 = "";
song2 = "";

right_x=0;
right_y=0;

left_x=0;
left_y=0;

score_left=0;
score_right=0;


function preload(){
    song1=loadSound("song_1.mp3");
    song2=loadSound("song_2.mp3");
}

function setup(){
    canvas=createCanvas(370,350);
    canvas.position(500,200);
    video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet is loaded");
}

function draw(){
    image(video,0,0,370,350);

    fill("#ffffff");
    stroke("#ffffff");

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(score_right>0.2){
   
        song2.stop();

        if(song1_status==false){
            song1.play();
            song1.setVolume(1);
            document.getElementById("song").innerHTML="playing song 1";
            console.log("playing song 1");
        }

    }

    else if(score_left>0.2){
      
        song1.stop();

        if(song2_status==false){
            song2.play();
            song2.setVolume(1);
            document.getElementById("song").innerHTML="playing song 2";
            console.log("playing song 2");
        }

    }
    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        left_x=results[0].pose.leftWrist.x;
        left_y=results[0].pose.leftWrist.y;

        right_x=results[0].pose.rightWrist.x;
        right_y=results[0].pose.rightWrist.y;
        
        score_left=results[0].pose.keypoints[9].score;
        score_right=results[0].pose.keypoints[10].score;

        console.log(left_x+" "+left_y);
        console.log(right_x+"  "+right_y);
        console.log(score_left+"  "+score_right);
    }
}

