function subject(name){
    this.name = name;
    this.chapters = [];
}

function chapter(title){
    this.title = title;
}

const fs = require('fs');
const titlefile = 'title.txt';
const planfile = 'plan.bin';
function saveValue(){
    localStorage.setItem('title',document.getElementById('title').value);
}
function setup(){
    free = true;
    document.getElementById('title').value = localStorage.getItem('title');
    let subjects = localStorage.getItem('subjects');
    if (subjects != null){
        subjects = JSON.parse(subjects);
        let htmlCode = "";
        for(sub in subjects){
            htmlCode += "<div class='container low-level-container'>";
            htmlCode += "<div class='alert alert-success subject-title'>" + subjects[sub].name + "</div>";
            for(chap in subjects[sub].chapters){
                htmlCode += "<div class='alert alert-dark chapter-title'>" +subjects[sub].chapters[chap].title + "</div>";
            }
            htmlCode += "<button class='plusButton' onclick='showContainer2("+sub+")'>-</button>"
            htmlCode += "</div>"
        }
        document.getElementById('display-area').innerHTML = htmlCode;
    }
}
var free;
function showContainer1(){
    if (free){
        document.getElementById('adding-subject-container').style = "visibility:visible";
        document.getElementById('floating-input1').focus();
        free = false;
    }
}
function showContainer2(concernedSubject){
    if (free){
        document.getElementById('adding-chapter-container').style = "visibility:visible";
        let subjects = localStorage.getItem('subjects');
        subjects = JSON.parse(subjects);
        document.getElementById("adding-container-header").innerHTML = "Adding a new chapter to " + subjects[concernedSubject].name;
        document.getElementById('confirm-button2').onclick = () => addChapter(concernedSubject);
        document.getElementById('confirm-button2').value = concernedSubject;
        document.getElementById('floating-input2').focus();
        free = false;
    }
}
function hideContainer1(){
    document.getElementById('adding-subject-container').style = "visibility:hidden";
    free = true;
}
function hideContainer2(){
    document.getElementById('adding-chapter-container').style = "visibility:hidden";
    free = true;
}
function attemptEnabling1(){
    const val = document.getElementById('floating-input1').value;
    if (val == ""){
        document.getElementById('confirm-button1').disabled = true;
    }
    else{
        document.getElementById('confirm-button1').disabled = false;
    }
}
function attemptEnabling2(){
    const val = document.getElementById('floating-input2').value;
    if (val == ""){
        document.getElementById('confirm-button2').disabled = true;
    }
    else{
        document.getElementById('confirm-button2').disabled = false;
    }
}
function addSubject(){
    let subjects = localStorage.getItem('subjects');
    if (subjects == null){
        subjects=[];
    }else{
        subjects = JSON.parse(subjects);
    }
    subjects.push(new subject(document.getElementById('floating-input1').value));
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    document.getElementById('floating-input1').value = "";
    setup();
    hideContainer1();
}
function addChapter(concernedSubject){
    let subjects = localStorage.getItem('subjects')
    subjects = JSON.parse(subjects);
    subjects[concernedSubject].chapters.push(new chapter( document.getElementById('floating-input2').value ));
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    document.getElementById('floating-input2').value = "";
    setup();
    hideContainer2();
}

function checkEnter2(event){
    if(event.key == "Enter" && document.getElementById('confirm-button2').disabled == false){
        addChapter(document.getElementById('confirm-button2').value);
    }
}
function checkEnter1(event){
    if(event.key == "Enter" && document.getElementById('confirm-button1').disabled == false){
        addSubject();
    }
}