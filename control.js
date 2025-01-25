function subject(name){
    this.name = name;
    this.chapters = [];
}

function chapter(title){
    this.title = title;
    this.crossed = false;
    this.subChapters = [];
}
function subChapter(title){
    this.title = title;
    this.crossed = false;
}

function saveValue(){
    localStorage.setItem('title',document.getElementById('title').value);
}
function setup(){
    //localStorage.setItem('subjects', JSON.stringify([]));
    free = true;
    document.getElementById('title').value = localStorage.getItem('title');
    let subjects = localStorage.getItem('subjects');
    if (subjects != null){
        subjects = JSON.parse(subjects);
        let htmlCode = "";
        for(sub in subjects){
            htmlCode += "<div class='container low-level-container'>";
            htmlCode += "<div class='alert alert-success subject-title' onclick='showOptions1(event,"+sub+")'>" + subjects[sub].name + "</div>";
            for(chap in subjects[sub].chapters){
                htmlCode += "<div class='alert alert-dark chapter-title ";
                if(subjects[sub].chapters[chap].crossed){
                    htmlCode += "crossed";
                }
                htmlCode += " ' onclick='showOptions2(event,"+sub+","+chap+")'>" +subjects[sub].chapters[chap].title + "</div>"
                for(subchap in subjects[sub].chapters[chap].subChapters){
                    htmlCode += "<div class='alert alert-dark sub-chapter-title ";
                    if(subjects[sub].chapters[chap].subChapters[subchap].crossed){
                        htmlCode += "crossed";
                    }
                    htmlCode +=" ' onclick='showOptions3(event,"+sub+","+chap+","+subchap+")' >"+subjects[sub].chapters[chap].subChapters[subchap].title + "</div>";
                }
            }
            htmlCode += "<button class='plusButton' onclick='showContainer2("+sub+")'>-</button>"
            htmlCode += "</div>"
        }
        document.getElementById('display-area').innerHTML = htmlCode;
    }
}
var concernedSubjectGlobal;
var concernedChapterGlobal;
var concernedSubChapterGlobal;
function showOptions1(event, concernedSubject){
    if (free){
        concernedSubjectGlobal = concernedSubject;
        concernedChapterGlobal = 0;
        let elem = document.getElementById('options-container1');
        elem.style.left = (event.clientX-1)+"px";
        elem.style.top = (event.clientY-1)+"px";
        elem.style.visibility = 'visible';
        free = false;
    }
}

function showOptions3(event, concernedSubject, concernedChapter, concernedSubChapter){
    if (free){
        concernedSubjectGlobal = concernedSubject;
        concernedChapterGlobal = concernedChapter;
        concernedSubChapterGlobal = concernedSubChapter;
        let elem = document.getElementById('options-container3');
        elem.style.left = (event.clientX-1)+"px";
        elem.style.top = (event.clientY-1)+"px";
        elem.style.visibility = 'visible';
        free = false;
    }
}

function deleteSubject(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);
    let result = [];
    for(sub in subjects){
        if (sub!=concernedSubjectGlobal){
            result.push(subjects[sub]);
        }
    }
    result = JSON.stringify(result);
    localStorage.setItem('subjects',result);
    hideOptionsContainer1();
    setup();
}

function showContainer3(){
    hideOptionsContainer1();
    showContainer2(concernedSubjectGlobal);
    document.getElementById('confirm-button2').onclick = () => addChapterIndex(0);
    document.getElementById('confirm-button2').value = -1;
}
function addChapterIndex(index){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);
    subjects[concernedSubjectGlobal].chapters.splice(index, 0, new chapter( toTitle(document.getElementById('floating-input2').value) ));
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    document.getElementById('floating-input2').value = "";
    setup();
    hideContainer2();
}
function cross(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);
    subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].crossed = true;
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    hideOptionsContainer2();
    setup();
}
function crossSub(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);
    subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].subChapters[concernedSubChapterGlobal].crossed = true;
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    hideOptionsContainer3();
    setup();
}
function uncross(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);
    subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].crossed = false;
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    hideOptionsContainer2();
    setup();
}
function uncrossSub(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);
    subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].subChapters[concernedSubChapterGlobal].crossed = false;
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    hideOptionsContainer3();
    setup();
}
function deleteChapter(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);

    let tmp = [];
    for(let chap=0; chap < subjects[concernedSubjectGlobal].chapters.length; chap++){
        if (chap != concernedChapterGlobal){
            tmp.push(subjects[concernedSubjectGlobal].chapters[chap]);
        }
    }
    subjects[concernedSubjectGlobal].chapters = tmp;
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    hideOptionsContainer2();
    setup();
}
function deleteSubChapter(){
    let subjects = localStorage.getItem('subjects');
    subjects = JSON.parse(subjects);

    let tmp = [];
    for(let subchap=0; subchap < subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].subChapters.length; subchap++){
        if (subchap != concernedSubChapterGlobal){
            tmp.push(subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].subChapters[subchap]);
        }
    }
    subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].subChapters = tmp;
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    hideOptionsContainer3();
    setup();
}

function showOptions2(event, concernedSubject, concernedChapter){
    if (free){
        concernedSubjectGlobal = concernedSubject;
        concernedChapterGlobal = concernedChapter;
        let elem = document.getElementById('options-container2');
        elem.style.left = (event.clientX-1)+"px";
        elem.style.top = (event.clientY-1)+"px";
        elem.style.visibility = 'visible';
        free = false;
    }
}

function showContainer4(){
    hideOptionsContainer2();
    showContainer2(concernedSubjectGlobal);
    document.getElementById('confirm-button2').onclick = () => addChapterIndex(concernedChapterGlobal+1);
    document.getElementById('confirm-button2').value = -1;
}

function showContainer5(){
    hideOptionsContainer2();
    showContainer3(concernedSubjectGlobal, concernedChapterGlobal);
}
function hideOptionsContainer1(){
    document.getElementById('options-container1').style.visibility = 'hidden';
    free = true;
}
function hideOptionsContainer2(){
    document.getElementById('options-container2').style.visibility = 'hidden';
    free = true;
}
function hideOptionsContainer3(){
    document.getElementById('options-container3').style.visibility = 'hidden';
    free = true;
}
var free;
function showContainer1(){
    if (free){
        document.getElementById('adding-subject-container').style = "visibility:visible";
        document.getElementById('floating-input1').focus();
        free = false;
    }
}
function showContainer3(concernedSubject, concernedChapter){
    if (free){
        document.getElementById('adding-sub-chapter-container').style = "visibility:visible";
        document.getElementById('floating-input3').focus();

        let subjects = localStorage.getItem('subjects');
        subjects = JSON.parse(subjects);
        document.getElementById("adding-container-header2").innerHTML = "Adding a sub-chapter to " + subjects[concernedSubject].chapters[concernedChapter].title;
        document.getElementById('confirm-button3').onclick = () => addSubChapter();
        document.getElementById('floating-input3').focus();

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
function hideContainer3(){
    document.getElementById('adding-sub-chapter-container').style = "visibility:hidden";
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
function attemptEnabling3(){
    const val = document.getElementById('floating-input3').value;
    if (val == ""){
        document.getElementById('confirm-button3').disabled = true;
    }
    else{
        document.getElementById('confirm-button3').disabled = false;
    }
}
function addSubject(){
    let subjects = localStorage.getItem('subjects');
    if (subjects == null){
        subjects=[];
    }else{
        subjects = JSON.parse(subjects);
    }
    subjects.push(new subject( toTitle(document.getElementById('floating-input1').value) ));
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    document.getElementById('floating-input1').value = "";
    
    setup();
    hideContainer1();
}
function addChapter(concernedSubject){
    let subjects = localStorage.getItem('subjects')
    subjects = JSON.parse(subjects);
    subjects[concernedSubject].chapters.push(new chapter( toTitle(document.getElementById('floating-input2').value) ));
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    document.getElementById('floating-input2').value = "";
    setup();
    hideContainer2();
}

function addSubChapter(){
    let subjects = localStorage.getItem('subjects')
    subjects = JSON.parse(subjects);
    subjects[concernedSubjectGlobal].chapters[concernedChapterGlobal].subChapters.push(new subChapter( toTitle(document.getElementById('floating-input3').value) ));
    subjects = JSON.stringify(subjects);
    localStorage.setItem('subjects', subjects);
    document.getElementById('floating-input3').value = "";
    setup();
    hideContainer3();
}

function checkEnter2(event){
    if(event.key == "Enter" && document.getElementById('confirm-button2').disabled == false){
        if (document.getElementById('confirm-button2').value != -1){
            addChapter(document.getElementById('confirm-button2').value);
        }else{
            addChapterIndex(concernedChapterGlobal+1);
        }
    }
}
function checkEnter3(event){
    if(event.key == "Enter" && document.getElementById('confirm-button3').disabled == false){
        addSubChapter();
        
    }
}
function checkEnter1(event){
    if(event.key == "Enter" && document.getElementById('confirm-button1').disabled == false){
        addSubject();
    }
}
function toTitle(str){
    return( str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') );
}