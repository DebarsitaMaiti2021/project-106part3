
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    })
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Nrih032MR/model.json',modelLoaded);

function modelLoaded(){
    console.log("MODEL IS LOADED");
}

prediction1="";

function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is"+prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if(results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="Best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="Unlike"){
            document.getElementById("update_emoji").innerHTML="&#128078;";
        }
        if(results[0].label=="Rock"){
            document.getElementById("update_emoji").innerHTML="&#129304;";
        }
        
        
    }
}