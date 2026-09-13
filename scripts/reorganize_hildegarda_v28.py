from pathlib import Path
import re

index_path = Path('medieval/index.html')
app_path = Path('medieval/app.js')
html = index_path.read_text(encoding='utf-8')
js = app_path.read_text(encoding='utf-8')

if 'data-view="initial"' not in html:
    initial_pat = re.compile(r'\n\s*<section class="ritual-section" id="initialSection">.*?</section>', re.S)
    final_pat = re.compile(r'\n\s*<section class="ritual-section" id="finalSection">.*?</section>', re.S)
    im = initial_pat.search(html)
    fm = final_pat.search(html)
    if not im or not fm:
        raise SystemExit('Seções de oração não encontradas')
    initial_section = im.group(0).strip()
    final_section = fm.group(0).strip()

    html = html[:fm.start()] + html[fm.end():]
    im = initial_pat.search(html)
    html = html[:im.start()] + html[im.end():]

    wisdom_start = html.find('<section class="view" data-view="wisdom"')
    wisdom_end = html.find('</article>\n    </section>', wisdom_start)
    if wisdom_start < 0 or wisdom_end < 0:
        raise SystemExit('View Sabedoria não encontrada')
    wisdom_end += len('</article>\n    </section>')
    wisdom = html[wisdom_start:wisdom_end]
    wisdom = re.sub(r'\n\s*<div class="ritual-progress" aria-label="Etapas da oração">.*?</div>\s*', '\n', wisdom, count=1, flags=re.S)
    wisdom = re.sub(r'\n\s*<div class="ritual-divider">❦</div>\s*', '\n', wisdom, count=1)
    html = html[:wisdom_start] + wisdom + html[wisdom_end:]

    initial_view = f'''
    <section class="view ritual-page-view" data-view="initial" id="initialPrayerView">
      <div class="page-toolbar">
        <button class="icon-btn" id="initialBackHome" aria-label="Voltar ao início">←</button>
        <div><span>ETAPA 1 DE 3</span><h2>Oração Inicial</h2></div>
        <span class="mini-seal" aria-hidden="true">I</span>
      </div>
      <div class="ritual-progress" aria-label="Etapas da oração">
        <span class="ritual-step" data-ritual-step="initial"><b>1</b><small>Oração inicial</small></span>
        <span class="ritual-step" data-ritual-step="day"><b>2</b><small>Reflexão do dia</small></span>
        <span class="ritual-step" data-ritual-step="final"><b>3</b><small>Oração final</small></span>
      </div>
      <article class="illuminated-page textual ritual-page">
        {initial_section}
      </article>
    </section>
'''

    final_view = f'''
    <section class="view ritual-page-view" data-view="final" id="finalPrayerView">
      <div class="page-toolbar">
        <button class="icon-btn" id="finalBackDay" aria-label="Voltar à reflexão">←</button>
        <div><span>ETAPA 3 DE 3</span><h2>Oração Final</h2></div>
        <span class="mini-seal" aria-hidden="true">III</span>
      </div>
      <div class="ritual-progress" aria-label="Etapas da oração">
        <span class="ritual-step" data-ritual-step="initial"><b>1</b><small>Oração inicial</small></span>
        <span class="ritual-step" data-ritual-step="day"><b>2</b><small>Reflexão do dia</small></span>
        <span class="ritual-step" data-ritual-step="final"><b>3</b><small>Oração final</small></span>
      </div>
      <article class="illuminated-page textual ritual-page">
        {final_section}
      </article>
    </section>
'''

    prayers_start = html.find('<section class="view" data-view="prayers"')
    html = html[:prayers_start] + initial_view + '\n    ' + html[prayers_start:]
    wisdom_start = html.find('<section class="view" data-view="wisdom"')
    html = html[:wisdom_start] + final_view + '\n    ' + html[wisdom_start:]
    html = html.replace('./app.js?v=27', './app.js?v=28').replace('./styles.css?v=24', './styles.css?v=28')

old = '''  go("wisdom");
  const target=step==="initial"?$("initialSection"):$("finalSection");
  setTimeout(()=>target?.scrollIntoView({behavior:"smooth",block:"start"}),180);'''
new = '  go(step==="initial"?"initial":"final");'
if old in js:
    js = js.replace(old, new, 1)
elif new not in js:
    raise SystemExit('openRitualStep não encontrado')

marker = '$("startPrayerBtn").onclick=startOrResumePrayer;'
if '$("initialBackHome")?.addEventListener' not in js:
    addition = '''$("startPrayerBtn").onclick=startOrResumePrayer;
$("initialBackHome")?.addEventListener("click",()=>go("home"));
$("finalBackDay")?.addEventListener("click",()=>{
  const r=activeRitual();
  const day=r?.day||selected||currentDay();
  renderDay(day);go("prayers");
});'''
    js = js.replace(marker, addition, 1)

swipe_marker = '$("prevDay").onclick=()=>turn(-1);$("nextDay").onclick=()=>turn(1);'
if 'enableRitualPageSwipe' not in js:
    swipe = '''(function enableRitualPageSwipe(){
  const bind=(id,onLeft,onRight)=>{const view=$(id);if(!view)return;let x=0,y=0;view.addEventListener("touchstart",e=>{const t=e.changedTouches[0];x=t.clientX;y=t.clientY},{passive:true});view.addEventListener("touchend",e=>{const t=e.changedTouches[0],dx=t.clientX-x,dy=t.clientY-y;if(!(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2))return;if(dx<0)onLeft?.();else onRight?.()},{passive:true})};
  bind("initialPrayerView",()=>{const r=activeRitual();openRitualStep("day",r?.day||currentDay(),r?.review)},()=>go("home"));
  bind("finalPrayerView",()=>{},()=>{const r=activeRitual();const day=r?.day||selected||currentDay();renderDay(day);go("prayers")});
})();

$("prevDay").onclick=()=>turn(-1);$("nextDay").onclick=()=>turn(1);'''
    js = js.replace(swipe_marker, swipe, 1)

index_path.write_text(html, encoding='utf-8')
app_path.write_text(js, encoding='utf-8')

assert html.count('id="initialSection"') == 1
assert html.count('id="finalSection"') == 1
assert 'data-view="initial"' in html and 'data-view="final"' in html
assert new in js
print('Reorganização validada.')
