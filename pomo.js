/* ================================================================
   POMODORO SYSTEM  (pomo.js)
   ================================================================ */
(function(){
'use strict';

/* ---------- inject HTML ---------- */
function injectHTML(){
  document.head.insertAdjacentHTML('beforeend','<link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>⭐</text></svg>">');

  document.body.insertAdjacentHTML('afterbegin',`
<button id="pomo-btn" onclick="togglePomo()" title="Pomodoro Timer"><span class="pomo-spin">⭐</span></button>

<div id="pomo-overlay">
 <div id="pomo-container" class="pomo-dark">
  <div id="pomo-ship">
   <div id="pomo-ship-fin"></div>
   <div class="pomo-wing l"></div><div class="pomo-wing r"></div>
   <div class="ship-stars" id="pomo-ship-stars"></div>
   <div class="pomo-mode-row">
    <div class="pomo-mode-btns">
     <button class="pomo-mode-btn active" id="pm-dark"  onclick="pomoMode('dark')">🌌 NEON</button>
     <button class="pomo-mode-btn"        id="pm-light" onclick="pomoMode('light')">🌸 PASTEL</button>
    </div>
    <button class="pomo-close-x" onclick="togglePomo()">✕</button>
   </div>
   <div class="pomo-ship-title">
    <span class="pomo-orbit">🚀</span>FOCUS·SHIP<span class="pomo-orbit" style="animation-delay:-2s">✨</span>
   </div>
   <div id="pomo-phase-tabs">
    <button class="pomo-ptab active" id="ptab-focus" onclick="pomoPhase('focus')">FOCUS</button>
    <button class="pomo-ptab" id="ptab-short" onclick="pomoPhase('short')">SHORT ☕</button>
    <button class="pomo-ptab" id="ptab-long"  onclick="pomoPhase('long')">LONG 🌙</button>
   </div>
   <div id="pomo-session-dots"></div>
   <div id="pomo-cockpit">
    <div id="pomo-time-display">25:00</div>
    <div id="pomo-phase-label">FOCUS TIME</div>
   </div>
   <div id="pomo-task-bar-wrap">
    <div class="pomo-bar-label"><span>TASK PROGRESS</span><span id="pomo-bar-pct">0%</span></div>
    <div class="pomo-bar-shell"><div class="pomo-bar-fill" id="pomo-bar-fill"></div></div>
   </div>
   <div id="pomo-controls">
    <button class="pomo-ctrl icon" onclick="pomoRestart()" title="Restart">↺</button>
    <button class="pomo-ctrl start" id="pomo-start-btn" onclick="pomoToggle()">START</button>
    <button class="pomo-ctrl icon" onclick="openPomoSettings()" title="Settings">⚙</button>
   </div>
   <div id="pomo-daily-row">
    <div class="pomo-daily-text">✦ TODAY: <span id="pomo-daily-count">0</span> TASKS DONE ✦</div>
   </div>
   <div class="pomo-puppy" id="pomo-puppy">👾</div>
  </div>

  <div id="pomo-tasks-panel">
   <div class="pomo-tasks-hdr">
    <div class="pomo-tasks-title">✦ TASKS</div>
    <div class="pomo-hdr-btns">
     <button class="pomo-sm-btn" onclick="togglePomoDone()">VIEW DONE</button>
     <button class="pomo-plus-btn" onclick="openPomoAdd()" title="Add task">+</button>
    </div>
   </div>
   <div id="pomo-cur-task" class="empty" onclick="openPomoAdd()">
    <span id="pomo-cur-icon">📋</span>
    <span id="pomo-cur-text" style="flex:1">no active task — tap to add</span>
   </div>
   <div id="pomo-add-panel">
    <div class="pomo-add-title">+ ADD TASK</div>
    <div class="pomo-src-tabs">
     <button class="pomo-ptab active" id="psrc-custom" onclick="pomoSrc('custom')">CUSTOM</button>
     <button class="pomo-ptab" id="psrc-unit" onclick="pomoSrc('unit')">FROM UNIT</button>
    </div>
    <div id="pomo-custom-area">
     <input class="pomo-inp" id="pomo-task-text" placeholder="task name…">
     <select class="pomo-select" id="pomo-task-unit">
      <option value="">no unit</option>
      <option value="u1">Unit 1 — Networking Concepts</option>
      <option value="u2">Unit 2 — Network Implementation</option>
      <option value="u3">Unit 3 — Network Operations</option>
      <option value="u4">Unit 4 — Network Security</option>
      <option value="u5">Unit 5 — Network Troubleshooting</option>
      <option value="u6">Unit 6 — Final Sprint</option>
     </select>
    </div>
    <div id="pomo-unit-area" style="display:none">
     <select class="pomo-select" id="pomo-filter-unit" onchange="loadPomoUnitTasks()">
      <option value="">— choose unit —</option>
      <option value="u1">Unit 1 — Networking Concepts</option>
      <option value="u2">Unit 2 — Network Implementation</option>
      <option value="u3">Unit 3 — Network Operations</option>
      <option value="u4">Unit 4 — Network Security</option>
      <option value="u5">Unit 5 — Network Troubleshooting</option>
      <option value="u6">Unit 6 — Final Sprint</option>
     </select>
     <div class="pomo-utask-list" id="pomo-utask-list"></div>
    </div>
    <div class="pomo-sec-hd">ICON</div>
    <div class="pomo-emoji-grid" id="pomo-emoji-grid"></div>
    <div class="pomo-sec-hd">COLOR</div>
    <div class="pomo-emoji-grid" id="pomo-color-grid"></div>
    <button class="pomo-save-btn" onclick="savePomoTask()">SAVE ✦</button>
    <button class="pomo-cancel-link" onclick="closePomoAdd()">cancel</button>
   </div>
   <div id="pomo-task-list"></div>
   <div id="pomo-done-panel">
    <div class="pomo-sec-hd">COMPLETED ✓</div>
    <div id="pomo-done-list"></div>
   </div>
  </div>
  <button class="pomo-close-bar" onclick="togglePomo()">close ✕</button>
 </div>
</div>

<div class="pomo-modal" id="pomo-settings-modal">
 <div class="pomo-modal-box">
  <button class="pomo-modal-x" onclick="closePomoSettings()">✕</button>
  <div class="pomo-modal-title">⚙ TIMER SETTINGS</div>
  <div class="pomo-sec-hd">DURATIONS (minutes)</div>
  <div class="pomo-field"><label>Focus Time</label>
   <input type="number" class="pomo-inp" id="set-focus" min="1" max="90" value="25"></div>
  <div class="pomo-field"><label>Short Break</label>
   <input type="number" class="pomo-inp" id="set-short" min="1" max="30" value="5"></div>
  <div class="pomo-field"><label>Long Break</label>
   <input type="number" class="pomo-inp" id="set-long" min="1" max="60" value="15"></div>
  <div class="pomo-field"><label>Sessions before long break</label>
   <input type="number" class="pomo-inp" id="set-sessions" min="1" max="10" value="4"></div>
  <div class="pomo-sec-hd">NOTIFICATIONS</div>
  <div class="pomo-toggle-row">
   <label>Sound alerts</label>
   <div class="pomo-toggle on" id="tog-sound" onclick="pomoTogSetting('sound')"></div>
  </div>
  <div class="pomo-toggle-row">
   <label>Pop-up notifications</label>
   <div class="pomo-toggle on" id="tog-notif" onclick="pomoTogSetting('notif')"></div>
  </div>
  <button class="pomo-save-btn" onclick="savePomoSettings()">SAVE SETTINGS ✦</button>
 </div>
</div>

<div id="pomo-notif">
 <div class="notif-stars" id="pomo-notif-stars"></div>
 <span class="notif-sprite" id="pomo-notif-sprite">🚀</span>
 <h3 id="pomo-notif-title">TIME'S UP!</h3>
 <p id="pomo-notif-msg">Great focus session!</p>
 <button class="pomo-ctrl start" onclick="dismissPomoNotif()" style="margin:0 auto;display:block;">OK ✦</button>
</div>

<div id="pomo-all-done">
 <div class="pomo-done-box">
  <span class="pomo-done-emoji">🌟</span>
  <h2>ALL TASKS DONE!</h2>
  <p>you're absolutely on fire! ✨💜</p>
  <button class="btn green close" onclick="document.getElementById('pomo-all-done').classList.remove('show')">yatta!! 🎉</button>
 </div>
</div>

<div id="site-daily-bar">
 <span class="site-daily-text">✦ TASKS COMPLETED TODAY: <span id="site-daily-count">0</span> ✦</span>
</div>
  `);
}

/* ---------- state ---------- */
const PKEY='netplus_pomo_v2';
let PS={
  mode:'dark',phase:'focus',running:false,
  timeLeft:25*60,sessionCount:0,
  settings:{focus:25,short:5,long:15,sessions:4,sound:true,notif:true},
  tasks:[],completedTasks:[],
  dailyCount:0,dailyDate:''
};
let pomoTimer=null,pomoSelEmoji='📚',pomoSelColor='#ff4fd8',pomoSrcMode='custom';

function loadPS(){
  try{
    const s=JSON.parse(localStorage.getItem(PKEY)||'{}');
    if(s.settings) PS.settings={...PS.settings,...s.settings};
    if(s.mode) PS.mode=s.mode;
    if(s.tasks) PS.tasks=s.tasks;
    if(s.completedTasks) PS.completedTasks=s.completedTasks;
    if(typeof s.sessionCount==='number') PS.sessionCount=s.sessionCount;
    const today=new Date().toISOString().slice(0,10);
    PS.dailyDate=today;
    PS.dailyCount=(s.dailyDate===today)?(s.dailyCount||0):0;
  }catch(e){}
}
function savePS(){
  try{localStorage.setItem(PKEY,JSON.stringify({...PS,running:false}));}catch(e){}
}
function phaseTime(ph){const s=PS.settings;return(ph==='focus'?s.focus:ph==='short'?s.short:s.long)*60;}
function pomoFmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}

/* ---------- open/close ---------- */
window.togglePomo=function(){
  const ov=document.getElementById('pomo-overlay');
  ov.classList.toggle('open');
  if(ov.classList.contains('open')) renderPomo();
};

/* ---------- full render ---------- */
function renderPomo(){
  const c=document.getElementById('pomo-container');
  c.className=PS.mode==='light'?'pomo-light':'pomo-dark';
  document.getElementById('pm-dark').classList.toggle('active',PS.mode==='dark');
  document.getElementById('pm-light').classList.toggle('active',PS.mode==='light');
  pomoBuildShipStars();
  pomoUpdateDisplay();
  ['focus','short','long'].forEach(p=>{
    const t=document.getElementById('ptab-'+p);
    if(t) t.classList.toggle('active',PS.phase===p);
  });
  const sb=document.getElementById('pomo-start-btn');
  if(sb){sb.textContent=PS.running?'PAUSE':'START';sb.classList.toggle('running',PS.running);}
  pomoBuildDots();
  pomoUpdateBar();
  renderPomoTasks();
  pomoUpdateCounter();
  renderPomoDoneList();
  document.getElementById('set-focus').value=PS.settings.focus;
  document.getElementById('set-short').value=PS.settings.short;
  document.getElementById('set-long').value=PS.settings.long;
  document.getElementById('set-sessions').value=PS.settings.sessions;
  document.getElementById('tog-sound').classList.toggle('on',PS.settings.sound);
  document.getElementById('tog-notif').classList.toggle('on',PS.settings.notif);
  renderPomoEmojiGrid();renderPomoColorGrid();
  const pups=['👾','🐾','🌟','✨','💫','🌙','🦊','🐱','🤖','👽'];
  document.getElementById('pomo-puppy').textContent=pups[Math.floor(Date.now()/60000)%pups.length];
}

function pomoBuildShipStars(){
  const w=document.getElementById('pomo-ship-stars');
  if(!w||w.children.length>12) return;
  w.innerHTML='';
  for(let i=0;i<16;i++){
    const s=document.createElement('div');s.className='ss';
    s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*3+'s';
    const pal=['rgba(255,255,255,.8)','rgba(200,160,255,.9)','rgba(255,79,216,.6)','rgba(72,255,192,.7)'];
    s.style.background=pal[i%pal.length];
    w.appendChild(s);
  }
}

/* ---------- display ---------- */
function pomoUpdateDisplay(){
  const d=document.getElementById('pomo-time-display');
  if(d) d.textContent=pomoFmt(PS.timeLeft);
  const labels={focus:'FOCUS TIME',short:'SHORT BREAK',long:'LONG BREAK'};
  const l=document.getElementById('pomo-phase-label');
  if(l) l.textContent=labels[PS.phase];
  document.title=PS.running?pomoFmt(PS.timeLeft)+' | NeTwOrK+':'NeTwOrK+ // Study Deck';
}
function pomoBuildDots(){
  const w=document.getElementById('pomo-session-dots');if(!w) return;
  w.innerHTML='';
  const total=PS.settings.sessions,filled=PS.sessionCount%total;
  for(let i=0;i<total;i++){const d=document.createElement('div');d.className='pomo-sdot'+(i<filled?' lit':'');w.appendChild(d);}
}

/* ---------- timer controls ---------- */
window.pomoToggle=function(){
  if(typeof ensureAudio==='function') ensureAudio();
  if(PS.running){PS.running=false;clearInterval(pomoTimer);pomoTimer=null;}
  else{PS.running=true;pomoTimer=setInterval(pomoTick,1000);}
  const sb=document.getElementById('pomo-start-btn');
  if(sb){sb.textContent=PS.running?'PAUSE':'START';sb.classList.toggle('running',PS.running);}
  pomoUpdateDisplay();savePS();
};
function pomoTick(){
  if(PS.timeLeft>0){PS.timeLeft--;pomoUpdateDisplay();}
  else{clearInterval(pomoTimer);pomoTimer=null;PS.running=false;pomoComplete();}
}
function pomoComplete(){
  const was=PS.phase;
  if(PS.settings.sound) playPomoAlarm(was);
  if(PS.settings.notif) showPomoNotif(was);
  if(was==='focus'){
    PS.sessionCount++;pomoBuildDots();
    const isLong=(PS.sessionCount%PS.settings.sessions===0);
    pomoPhase(isLong?'long':'short',true);
  } else {pomoPhase('focus',true);}
  const sb=document.getElementById('pomo-start-btn');
  if(sb){sb.textContent='START';sb.classList.remove('running');}
  savePS();
}
window.pomoPhase=function(ph,auto=false){
  if(PS.running&&!auto){clearInterval(pomoTimer);pomoTimer=null;PS.running=false;}
  PS.phase=ph;PS.timeLeft=phaseTime(ph);
  ['focus','short','long'].forEach(p=>{const t=document.getElementById('ptab-'+p);if(t) t.classList.toggle('active',p===ph);});
  const labels={focus:'FOCUS TIME',short:'SHORT BREAK',long:'LONG BREAK'};
  const l=document.getElementById('pomo-phase-label');if(l) l.textContent=labels[ph];
  pomoUpdateDisplay();
  const sb=document.getElementById('pomo-start-btn');if(sb){sb.textContent='START';sb.classList.remove('running');}
  savePS();
};
window.pomoRestart=function(){
  clearInterval(pomoTimer);pomoTimer=null;PS.running=false;
  PS.timeLeft=phaseTime(PS.phase);pomoUpdateDisplay();
  const sb=document.getElementById('pomo-start-btn');if(sb){sb.textContent='START';sb.classList.remove('running');}
};
window.pomoMode=function(m){
  PS.mode=m;
  const c=document.getElementById('pomo-container');
  if(c) c.className=m==='light'?'pomo-light':'pomo-dark';
  document.getElementById('pm-dark').classList.toggle('active',m==='dark');
  document.getElementById('pm-light').classList.toggle('active',m==='light');
  savePS();
};

/* ---------- sounds ---------- */
function getAudioCtx(){
  if(typeof actx!=='undefined'&&actx) return actx;
  try{return new (window.AudioContext||window.webkitAudioContext)();}catch(e){return null;}
}
function pTone(freq,start,dur,type,vol){
  const a=getAudioCtx();if(!a) return;
  try{
    const o=a.createOscillator(),g=a.createGain();
    o.type=type||'triangle';o.frequency.value=freq;o.connect(g);g.connect(a.destination);
    const t=a.currentTime+start;g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(vol||.15,t+.012);g.gain.exponentialRampToValueAtTime(.0008,t+dur);
    o.start(t);o.stop(t+dur+.02);
  }catch(e){}
}
function isMuted(){return typeof muted!=='undefined'?muted:false;}
function playPomoAlarm(phase){
  if(isMuted()) return;
  if(phase==='focus'){
    [1319,1047,784,659,523].forEach((f,i)=>pTone(f,i*.12,.35,'triangle',.16));
    pTone(523,.65,.6,'sine',.10);
  } else {
    [523,659,784,1047,1319,1568].forEach((f,i)=>pTone(f,i*.10,.22,'square',.12));
    [523,659,784,1047].forEach((f,i)=>pTone(f,.72+i*.08,.4,'triangle',.14));
  }
}
function playPomoTaskChime(){
  if(isMuted()) return;
  [523,659,784,1047].forEach((f,i)=>pTone(f,i*.08,.15,'triangle',.13));
  pTone(1319,.36,.28,'sine',.09);
}
function playPomoAllDoneSound(){
  if(isMuted()) return;
  [523,587,659,784,880,1047,1319,1568].forEach((f,i)=>pTone(f,i*.09,.22,'triangle',.16));
  [523,659,784,1047].forEach(f=>pTone(f,.82,.8,'triangle',.13));
  pTone(2093,.9,.7,'sine',.09);
}

/* ---------- notification ---------- */
function showPomoNotif(phase){
  const sprites={focus:'🌙',short:'🚀',long:'⭐'};
  const titles={focus:'BREAK TIME! 🌸',short:'BACK TO WORK! 💪',long:'BACK TO WORK! 🌟'};
  const msgs={focus:'Awesome focus session! Time to recharge ✨',
    short:'Break over — keep the momentum! 💜',long:'Long break done — you\'ve got this! 🌟'};
  document.getElementById('pomo-notif-sprite').textContent=sprites[phase]||'🚀';
  document.getElementById('pomo-notif-title').textContent=titles[phase]||'TIME\'S UP!';
  document.getElementById('pomo-notif-msg').textContent=msgs[phase]||'Timer done!';
  const ns=document.getElementById('pomo-notif-stars');ns.innerHTML='';
  ['⭐','✨','💫','🌟','★','✦'].forEach((e,i)=>{
    const s=document.createElement('span');s.className='notif-star';
    s.textContent=e;s.style.left=(10+i*15)+'%';s.style.top=(10+Math.random()*70)+'%';
    s.style.animationDelay=(i*.3)+'s';ns.appendChild(s);
  });
  document.getElementById('pomo-notif').classList.add('show');
  setTimeout(dismissPomoNotif,9000);
}
window.dismissPomoNotif=function(){document.getElementById('pomo-notif').classList.remove('show');};

/* ---------- settings ---------- */
window.openPomoSettings=function(){document.getElementById('pomo-settings-modal').classList.add('open');};
window.closePomoSettings=function(){document.getElementById('pomo-settings-modal').classList.remove('open');};
window.pomoTogSetting=function(key){
  if(key==='sound') PS.settings.sound=!PS.settings.sound;
  if(key==='notif') PS.settings.notif=!PS.settings.notif;
  document.getElementById('tog-sound').classList.toggle('on',PS.settings.sound);
  document.getElementById('tog-notif').classList.toggle('on',PS.settings.notif);
};
window.savePomoSettings=function(){
  PS.settings.focus=Math.max(1,Math.min(90,parseInt(document.getElementById('set-focus').value)||25));
  PS.settings.short=Math.max(1,Math.min(30,parseInt(document.getElementById('set-short').value)||5));
  PS.settings.long =Math.max(1,Math.min(60,parseInt(document.getElementById('set-long').value)||15));
  PS.settings.sessions=Math.max(1,Math.min(10,parseInt(document.getElementById('set-sessions').value)||4));
  PS.timeLeft=phaseTime(PS.phase);
  pomoUpdateDisplay();pomoBuildDots();savePS();closePomoSettings();
  if(typeof toast==='function') toast('⚙ Settings saved!');
};

/* ---------- task add panel ---------- */
window.openPomoAdd=function(){
  document.getElementById('pomo-add-panel').classList.add('open');
  renderPomoEmojiGrid();renderPomoColorGrid();
};
window.closePomoAdd=function(){
  document.getElementById('pomo-add-panel').classList.remove('open');
  document.getElementById('pomo-task-text').value='';
  document.getElementById('pomo-task-unit').value='';
  document.getElementById('pomo-filter-unit').value='';
  document.getElementById('pomo-utask-list').innerHTML='';
  pomoSrc('custom');
};
window.pomoSrc=function(m){
  pomoSrcMode=m;
  document.getElementById('psrc-custom').classList.toggle('active',m==='custom');
  document.getElementById('psrc-unit').classList.toggle('active',m==='unit');
  document.getElementById('pomo-custom-area').style.display=m==='custom'?'':'none';
  document.getElementById('pomo-unit-area').style.display=m==='unit'?'':'none';
};
window.loadPomoUnitTasks=function(){
  const uid=document.getElementById('pomo-filter-unit').value;
  const lst=document.getElementById('pomo-utask-list');lst.innerHTML='';
  if(!uid||typeof UNITS==='undefined') return;
  const unit=UNITS.find(u=>u.id===uid);if(!unit) return;
  unit.tasks.forEach(grp=>{
    const gh=document.createElement('div');
    gh.style.cssText='font-family:var(--f-title);font-size:7px;color:var(--green-soft);margin:8px 0 3px;';
    gh.textContent=grp.g;lst.appendChild(gh);
    grp.items.forEach(item=>{
      const inPomo=PS.tasks.some(t=>t.mainTaskId===item.id&&!t.done);
      const isDone=typeof checked!=='undefined'&&checked.has(item.id);
      const div=document.createElement('div');
      div.className='pomo-utask-item'+(inPomo?' sel':'')+(isDone?' done-main':'');
      div.innerHTML=`<span>${inPomo?'✓':'+'}</span><span style="flex:1">${item.t.length>60?item.t.slice(0,58)+'…':item.t}</span>`;
      if(!isDone&&!inPomo){
        div.onclick=()=>{
          const task={id:'pt-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),
            text:item.t,icon:pomoSelEmoji,color:pomoSelColor,unitId:uid,mainTaskId:item.id,done:false};
          PS.tasks.push(task);
          div.classList.add('sel');div.querySelector('span').textContent='✓';
          renderPomoTasks();pomoUpdateBar();savePS();
        };
      }
      lst.appendChild(div);
    });
  });
};

const EMOJIS=['📚','✏️','🎯','🚀','⭐','🌟','💫','✨','🌙','🪐','👾','🤖','💎','🔮','🎮','📖','🧠','⚡','🔥','💜','💙','💚','🌸','🦊','🐱','🐶','🌈','🎨','🏆','💡'];
const COLORS=['#ff4fd8','#a86bff','#48ffc0','#ff9fe8','#c6a4ff','#8effd8','#ffb347','#ff6b6b','#4ecdc4','#ffe66d','#ff8c94','#a8e6cf'];

function renderPomoEmojiGrid(){
  const g=document.getElementById('pomo-emoji-grid');if(!g) return;g.innerHTML='';
  EMOJIS.forEach(e=>{
    const b=document.createElement('button');b.className='pomo-emoji-opt'+(e===pomoSelEmoji?' sel':'');
    b.textContent=e;b.onclick=()=>{pomoSelEmoji=e;g.querySelectorAll('.pomo-emoji-opt').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');};
    g.appendChild(b);
  });
}
function renderPomoColorGrid(){
  const g=document.getElementById('pomo-color-grid');if(!g) return;g.innerHTML='';
  COLORS.forEach(c=>{
    const b=document.createElement('button');b.className='pomo-color-opt'+(c===pomoSelColor?' sel':'');
    b.style.background=c;
    b.onclick=()=>{pomoSelColor=c;g.querySelectorAll('.pomo-color-opt').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');};
    g.appendChild(b);
  });
}
window.savePomoTask=function(){
  if(pomoSrcMode==='custom'){
    const text=document.getElementById('pomo-task-text').value.trim();
    if(!text){if(typeof toast==='function') toast('⚠ Enter a task name!');return;}
    const uid=document.getElementById('pomo-task-unit').value||null;
    PS.tasks.push({id:'pt-'+Date.now(),text,icon:pomoSelEmoji,color:pomoSelColor,unitId:uid,mainTaskId:null,done:false});
  }
  renderPomoTasks();pomoUpdateBar();savePS();closePomoAdd();
  if(typeof toast==='function') toast('✦ Task added!');
};

/* ---------- task list render ---------- */
function renderPomoTasks(){
  const lst=document.getElementById('pomo-task-list');if(!lst) return;
  lst.innerHTML='';
  const active=PS.tasks.filter(t=>!t.done);
  if(active.length===0){
    lst.innerHTML='<div style="font-family:var(--f-head);font-size:12px;color:rgba(200,160,220,.5);text-align:center;padding:10px 0;">no tasks yet — tap + to add ✦</div>';
  }
  active.forEach(task=>{
    const div=document.createElement('div');div.className='pomo-task-item';
    const cb=document.createElement('div');cb.className='pomo-tcb';cb.onclick=()=>pomoCompleteTask(task.id);
    const ico=document.createElement('span');ico.textContent=task.icon;ico.style.fontSize='15px';
    const txt=document.createElement('span');txt.style.flex='1';txt.style.color=task.color;txt.style.fontWeight='600';
    txt.textContent=task.text;
    if(task.unitId&&typeof UNITS!=='undefined'){
      const u=UNITS.find(x=>x.id===task.unitId);
      if(u){const b=document.createElement('span');b.style.cssText='font-size:10px;opacity:.55;margin-left:4px;';b.textContent='·'+u.tag;txt.appendChild(b);}
    }
    const del=document.createElement('button');del.className='pomo-tdel';del.textContent='✕';
    del.onclick=e=>{e.stopPropagation();PS.tasks=PS.tasks.filter(t=>t.id!==task.id);renderPomoTasks();pomoUpdateBar();savePS();};
    div.append(cb,ico,txt,del);lst.appendChild(div);
  });
  pomoUpdateCurTask();
}
function pomoUpdateCurTask(){
  const active=PS.tasks.filter(t=>!t.done);
  const cur=document.getElementById('pomo-cur-task');
  const ci=document.getElementById('pomo-cur-icon');
  const ct=document.getElementById('pomo-cur-text');
  if(!cur||!ci||!ct) return;
  cur.querySelector('.pomo-cur-cb')?.remove();
  if(active.length>0){
    const task=active[0];
    cur.classList.remove('empty');
    ci.textContent=task.icon;ci.style.color=task.color;
    ct.textContent=task.text;ct.style.color=task.color;
    const ecb=document.createElement('div');ecb.className='pomo-cur-cb';
    ecb.title='Complete this task';
    ecb.onclick=e=>{e.stopPropagation();pomoCompleteTask(task.id);};
    cur.appendChild(ecb);
  } else {
    cur.classList.add('empty');
    ci.textContent='📋';ci.style.color='';ct.textContent='no active task — tap to add';ct.style.color='';
  }
}
function pomoCompleteTask(tid){
  const task=PS.tasks.find(t=>t.id===tid);if(!task||task.done) return;
  task.done=true;
  if(task.mainTaskId&&typeof checked!=='undefined'&&!checked.has(task.mainTaskId)){
    checked.add(task.mainTaskId);
    if(typeof saveChecked==='function') saveChecked();
    if(typeof updateMaster==='function') updateMaster(true);
    const li=document.querySelector(`li[data-id="${task.mainTaskId}"]`);
    if(li) li.classList.add('checked');
  }
  playPomoTaskChime();
  if(typeof confetti==='function') confetti(30,false);
  PS.dailyCount++;PS.dailyDate=new Date().toISOString().slice(0,10);
  PS.completedTasks.unshift({...task,completedAt:Date.now()});
  const remaining=PS.tasks.filter(t=>!t.done);
  if(remaining.length===0&&PS.tasks.length>0){
    setTimeout(()=>{playPomoAllDoneSound();if(typeof confetti==='function') confetti(140,true);document.getElementById('pomo-all-done').classList.add('show');},300);
  }
  savePS();renderPomoTasks();pomoUpdateBar();pomoUpdateCounter();updateSiteDailyCount();renderPomoDoneList();
}
function pomoUpdateBar(){
  const total=PS.tasks.length,done=PS.tasks.filter(t=>t.done).length;
  const pct=total>0?Math.round(done/total*100):0;
  const f=document.getElementById('pomo-bar-fill');if(f) f.style.width=pct+'%';
  const p=document.getElementById('pomo-bar-pct');if(p) p.textContent=pct+'%';
}
function pomoUpdateCounter(){
  const el=document.getElementById('pomo-daily-count');if(el) el.textContent=PS.dailyCount;
}
function updateSiteDailyCount(){
  const el=document.getElementById('site-daily-count');if(el) el.textContent=PS.dailyCount;
}
window.togglePomoDone=function(){document.getElementById('pomo-done-panel').classList.toggle('open');};
function renderPomoDoneList(){
  const lst=document.getElementById('pomo-done-list');if(!lst) return;
  lst.innerHTML='';
  if(PS.completedTasks.length===0){
    lst.innerHTML='<div style="font-family:var(--f-head);font-size:12px;color:rgba(200,160,220,.5);text-align:center;padding:6px;">none yet!</div>';return;
  }
  PS.completedTasks.slice(0,25).forEach(t=>{
    const d=document.createElement('div');d.className='pomo-done-item';
    const time=new Date(t.completedAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    d.innerHTML=`<span>${t.icon}</span><span style="flex:1">${t.text}</span><span style="font-size:10px;opacity:.5">${time}</span>`;
    lst.appendChild(d);
  });
}

/* ---------- init ---------- */
function initPomo(){
  loadPS();
  PS.timeLeft=phaseTime(PS.phase);
  updateSiteDailyCount();
  document.getElementById('pomo-overlay').addEventListener('click',function(e){if(e.target===this) togglePomo();});
  document.getElementById('pomo-settings-modal').addEventListener('click',function(e){if(e.target===this) closePomoSettings();});
  document.getElementById('pomo-all-done').addEventListener('click',function(e){if(e.target===this) this.classList.remove('show');});
}

/* ---------- boot ---------- */
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{injectHTML();initPomo();});
} else {
  injectHTML();initPomo();
}

})();
