let startTime=document.getElementById('startTime');
let start=0;
let interval=0;
let cycle=0;
let cycles=[];
let cdTime=document.getElementById('countdown');
let cycleTime=document.getElementById('cycleTime');
let cycleProm=document.getElementById('promCycle');
let cList=document.getElementById('cyclesList');

function appendToList(cycleElement){
    let newp=document.createElement('span');
    newp.innerHTML=cycleElement;
    newp.classList.add('cycleElement');
    cList.appendChild(newp);
}

function cycleTrack(){
    let timer=0;
    cycle=setInterval(()=>{
        timer++;
        secs=parseInt(timer/1000,10);
        milis=((timer%1000)/10).toFixed(0);

        secs = secs < 10 ? "0" + secs : secs;
        milis = milis < 10 ? "0" + milis : milis;

        cycleTime.innerHTML = secs+"."+milis;
    },1)
}

function resetCylce(){
    cycles.push(parseFloat(cycleTime.innerHTML));
    appendToList(cycleTime.innerHTML);
    clearInterval(cycle);

    let avg = cycles.reduce((a,v,i)=>(a*i+v)/(i+1));
    let secs=parseInt(avg/1,10);
    let milis=((avg%1)*100).toFixed(0);
    secs = secs < 10 ? "0" + secs : secs;
    milis = milis < 10 ? "0" + milis : milis;
    cycleProm.innerHTML=secs+"."+milis;

    cycleTrack();
}

function countdown(duration){
    let timer=duration,minutes,seconds;
    interval=setInterval(()=>{
        minutes=parseInt(timer/60,10);
        seconds=timer%60;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        cdTime.innerHTML=minutes+":"+seconds;

        if(--timer<0){
            alert('¡Tiempo terminado!');
            clearInterval(interval);
            clearInterval(cycle);
        }
    },1000);
}

function stopInterval(){
    clearInterval(interval);
    clearInterval(cycle);
    txt=cdTime.innerHTML;
    alert("Medición detenida faltando: "+txt);
}

function startTimer(){
    endTime=prompt('Duración de la medición (en minutos):','0');
    if(endTime==null || endTime==''){
        alert('No se ingresó un valor.');
    }else{
        alert('Se hará una medición de '+endTime+' minutos.');
        var current = new Date();
        start=current.getTime();
        startTime.innerHTML = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
        endTime=parseFloat(endTime);
        countdown(endTime*60);
        cycleTrack();
    }
}


let unitCount=0;
let returnedCount=0;
let emptyCount=0;

let unitCounter=document.getElementById('unitCounter');
let returnedCounter=document.getElementById('returnedCounter');
let emptyCounter=document.getElementById('emptyCounter');


let endTime = 0;

function changeUnits(change){
    unitCount=unitCount+change;
    unitCounter.innerHTML=unitCount;
    resetCylce();
}

function changeReturned(change){
    returnedCount=returnedCount+change;
    returnedCounter.innerHTML=returnedCount;
}

function changeEmpty(change){
    emptyCount=emptyCount+change;
    emptyCounter.innerHTML=emptyCount;
}