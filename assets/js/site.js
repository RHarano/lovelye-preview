// lovelye — shared behaviour
(function(){
  var hdr=document.getElementById('hdr');
  if(hdr){
    var onLight=hdr.classList.contains('on-light');
    addEventListener('scroll',function(){hdr.classList.toggle('solid',scrollY>60)},{passive:true});
  }
  var burger=document.getElementById('burger');
  var mnav=document.getElementById('mnav');
  if(burger){
    burger.addEventListener('click',function(){document.body.classList.toggle('menu-open')});
    if(mnav)mnav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open')})});
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})
  },{threshold:.12,rootMargin:'0px 0px -7% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

  // hero / subhero content parallax (cheap: transform+opacity on text only)
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var pel=document.querySelector('.hero-in')||document.querySelector('.subhero-in');
  if(pel&&!reduce){
    var tick=false;
    function para(){
      var y=scrollY;
      if(y<1000){pel.style.transform='translate3d(0,'+(y*0.16).toFixed(1)+'px,0)';pel.style.opacity=Math.max(0,1-y/620).toFixed(3);}
      tick=false;
    }
    addEventListener('scroll',function(){if(!tick){requestAnimationFrame(para);tick=true;}},{passive:true});
  }
})();
