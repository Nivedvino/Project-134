object = [];
img = "";
status = "";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video= createCapture();
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("span").innerHTML = "Status: Detecting Objects";
}

function preload() {
    song= loadSound("old_telephone.mp3");
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("span").innerHTML = "Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Objects: " + object.length;
            fill(r, g, b);
            percent = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (objects[i].label== "person") {
                document.getElementById("number_of_objects").innerHTML= "Baby is Found";
                song.stop();
            } else {
                document.getElementById("number_of_objects").innerHTML= "Baby is Not Found";
                song.play()
            }
        }
    }
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    objectdetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}