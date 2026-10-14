/* RS Auto Clinic: nav, smooth scroll, open/closed status, appointment date mapping */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
  var b=document.querySelector('.burger'), m=document.getElementById('menu');
  function set(o){ m.classList.toggle('open',o); b.setAttribute('aria-expanded',o); b.setAttribute('aria-label',o?'Close menu':'Open menu'); }
  b.addEventListener('click',function(){ set(!m.classList.contains('open')); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') set(false); });
  document.querySelectorAll('a[href^="#"]').forEach(function(a){ a.addEventListener('click',function(e){
    var id=a.getAttribute('href'), t=id.length>1&&document.querySelector(id); if(!t) return;
    e.preventDefault(); set(false); t.scrollIntoView({behavior:reduce?'auto':'smooth'}); history.replaceState(null,'',id); }); });

  if('IntersectionObserver' in window){
    var links=[].slice.call(m.querySelectorAll('a'));
    var so=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting) links.forEach(function(l){ l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id); }); }); },{rootMargin:'-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){ so.observe(s); });
    if(!reduce){ var ro=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); ro.unobserve(en.target);} }); },{threshold:.1});
      document.querySelectorAll('.deal,.svc,.rev,.gal figure,.form,.about__img,.award').forEach(function(el){ el.classList.add('rv'); ro.observe(el); }); }
  }

  // Open / closed indicator (shop time = America/Toronto). Mon–Fri 7:30–16:30.
  var st=document.getElementById('openStatus');
  try{
    var p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var g=function(t){ return (p.find(function(x){return x.type===t;})||{}).value; };
    var d=g('weekday'), mins=(+g('hour')%24)*60+(+g('minute'));
    var open=['Mon','Tue','Wed','Thu','Fri'].indexOf(d)>-1 && mins>=450 && mins<990;
    st.classList.add(open?'open':'closed');
    st.querySelector('b').textContent=(open?'Open now · ':'Closed now · ')+'Mon–Fri 7:30am–4:30pm';
  }catch(e){}

  // Appointment form: map the date picker onto Jotform's month/day/year fields; block past dates.
  var f=document.getElementById('apptForm'), di=document.getElementById('apptDate');
  if(f&&di){
    var t=new Date(); di.min=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
    f.addEventListener('submit',function(e){
      var v=di.value.split('-'); if(v.length!==3){ e.preventDefault(); di.focus(); return; }
      document.getElementById('dY').value=v[0]; document.getElementById('dM').value=v[1]; document.getElementById('dD').value=v[2];
    });
  }
})();
