from pathlib import Path

path = Path('medieval/styles.css')
css = path.read_text(encoding='utf-8')
marker = '/* v29 — páginas rituais iluminadas + player compacto */'
if marker not in css:
    css += r'''

/* v29 — páginas rituais iluminadas + player compacto */

/* Identidade própria para Oração Inicial e Oração Final */
.ritual-page-view{
  position:relative;
  padding-bottom:26px;
}
.ritual-page-view .page-toolbar{
  margin:8px 10px 14px;
  padding:10px 12px;
  border:2px solid var(--gold);
  border-radius:22px;
  background:
    radial-gradient(circle at 50% -30%,rgba(214,180,84,.28),transparent 52%),
    linear-gradient(180deg,#105c3c,#0b432d);
  box-shadow:0 10px 24px rgba(13,74,49,.22),inset 0 0 0 1px rgba(255,241,191,.18);
}
.ritual-page-view .page-toolbar h2{
  color:#fff4d4;
  text-shadow:0 1px 0 rgba(0,0,0,.24);
  letter-spacing:.015em;
}
.ritual-page-view .page-toolbar div>span{
  color:#edcf79;
  letter-spacing:.16em;
  font-size:.68rem;
}
.ritual-page-view .page-toolbar .icon-btn{
  border:1px solid #e4c66b;
  background:#fff2cb;
  box-shadow:inset 0 0 0 2px rgba(13,74,49,.08);
}
.ritual-page-view .page-toolbar .mini-seal{
  width:42px;height:42px;margin:0;
  font-size:1rem;
  background:#f7e8b8;
  color:var(--green);
  border:2px solid #d5ac43;
  box-shadow:0 2px 8px rgba(0,0,0,.14);
}

.ritual-page-view>.ritual-progress{
  margin:0 14px 13px;
  padding:8px 9px;
  border:1px solid rgba(184,138,42,.55);
  border-radius:18px;
  background:rgba(255,247,220,.84);
  box-shadow:0 4px 13px rgba(87,60,14,.08);
}

.ritual-page-view .ritual-page{
  isolation:isolate;
  margin:0 4px;
  padding:30px 26px 34px;
  border:3px solid var(--gold);
  border-radius:28px;
  background:
    radial-gradient(circle at 50% 0,rgba(211,173,73,.22),transparent 26%),
    linear-gradient(rgba(255,249,229,.97),rgba(247,231,190,.98)),
    repeating-linear-gradient(0deg,rgba(109,76,19,.035) 0 1px,transparent 1px 4px);
  box-shadow:0 16px 36px rgba(55,40,12,.2),inset 0 0 0 1px rgba(255,255,255,.65);
  overflow:hidden;
}
.ritual-page-view .ritual-page:before{
  inset:10px;
  border:1px solid rgba(13,74,49,.28);
  border-radius:20px;
}
.ritual-page-view .ritual-page:after{
  content:"❦   ✦   ❦";
  display:block;
  margin:24px auto 0;
  text-align:center;
  color:var(--gold);
  font-family:Cinzel,serif;
  letter-spacing:.45em;
  font-size:1rem;
}

.ritual-page-view .ritual-section{
  position:relative;
  z-index:1;
}
.ritual-page-view .ritual-kicker{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:28px;
  margin:0 auto 8px;
  padding:5px 12px;
  border:1px solid rgba(184,138,42,.62);
  border-radius:999px;
  background:#fff5d8;
  color:#80601d;
  font:700 .65rem/1 Cinzel,serif;
  letter-spacing:.13em;
}
.ritual-page-view .ritual-section>h3{
  position:relative;
  margin:8px 0 18px;
  padding:0 0 14px;
  text-align:center;
  font-size:clamp(1.65rem,5vw,2.25rem);
  line-height:1.05;
  color:var(--green);
}
.ritual-page-view .ritual-section>h3:after{
  content:"✦ ❦ ✦";
  display:block;
  margin-top:10px;
  color:var(--gold);
  font-size:.78rem;
  letter-spacing:.3em;
}

/* Persignação vira um pequeno pórtico litúrgico */
.ritual-page-view .persignation-card{
  position:relative;
  margin:0 0 16px;
  padding:16px 18px;
  border:2px solid #cda43e;
  border-radius:18px;
  background:
    radial-gradient(circle at 50% 0,rgba(238,207,119,.2),transparent 45%),
    linear-gradient(180deg,#0f5539,#0b422d);
  color:#fff4d5;
  box-shadow:0 8px 18px rgba(13,74,49,.17),inset 0 0 0 1px rgba(255,245,208,.15);
}
.ritual-page-view .persignation-kicker{
  margin-bottom:7px;
  text-align:center;
  color:#efd27d;
  font-family:Cinzel,serif;
  font-size:.72rem;
  font-weight:800;
  letter-spacing:.14em;
}
.ritual-page-view .persignation-card p{
  margin:0;
  color:#fff6de;
  font-size:1.12rem;
  line-height:1.42;
  text-align:center;
}

/* Credo e Salve Rainha recebem a mesma linguagem de manuscrito */
.ritual-page-view .devotional-extra{
  position:relative;
  margin:14px 0 18px!important;
  padding:18px 18px 20px!important;
  border:1px solid rgba(184,138,42,.72)!important;
  border-radius:18px!important;
  background:
    radial-gradient(circle at 50% 0,rgba(219,180,79,.16),transparent 40%),
    linear-gradient(180deg,rgba(255,249,226,.98),rgba(244,225,178,.88))!important;
  box-shadow:inset 0 0 0 2px rgba(255,253,241,.66),0 5px 14px rgba(87,60,14,.08)!important;
}
.ritual-page-view .devotional-extra:before,
.ritual-page-view .devotional-extra:after{
  position:absolute;
  top:9px;
  color:rgba(184,138,42,.7);
  font-size:.85rem;
}
.ritual-page-view .devotional-extra:before{content:"❦";left:12px}
.ritual-page-view .devotional-extra:after{content:"❦";right:12px;transform:scaleX(-1)}
.ritual-page-view .devotional-extra-kicker{
  margin-bottom:11px!important;
  color:var(--green)!important;
  font-size:.72rem!important;
  letter-spacing:.14em!important;
}
.ritual-page-view .devotional-extra p{
  font-size:1.16rem!important;
  line-height:1.48!important;
  font-weight:600!important;
  text-align:left;
}

/* Texto principal da oração: bloco nobre, legível e destacado */
.ritual-page-view #initialText,
.ritual-page-view #finalText{
  position:relative;
  margin:16px 0 18px;
  padding:20px 18px 20px 20px;
  border-left:4px solid var(--gold);
  border-right:1px solid rgba(184,138,42,.28);
  border-top:1px solid rgba(184,138,42,.28);
  border-bottom:1px solid rgba(184,138,42,.28);
  border-radius:8px 18px 18px 8px;
  background:rgba(255,250,233,.72);
  color:#352c20;
  font-size:1.24rem;
  line-height:1.55;
  box-shadow:inset 0 0 20px rgba(208,169,65,.07);
}
.ritual-page-view #initialText::first-letter,
.ritual-page-view #finalText::first-letter{
  float:left;
  margin:.08em .28em 0 0;
  color:var(--green);
  font-family:Cinzel,serif;
  font-size:3.15rem;
  line-height:.78;
  text-shadow:1px 1px 0 #e0ba58;
}

.ritual-page-view .ritual-actions{
  display:grid;
  gap:10px;
  margin-top:18px;
}
.ritual-page-view .ritual-actions .soft-btn{
  min-height:52px;
  border:1px solid #c89d36;
  border-radius:16px;
  background:linear-gradient(180deg,#fff9e9,#f7e8bb);
  color:var(--green);
  font-family:Cinzel,serif;
  font-size:.88rem;
  box-shadow:0 4px 10px rgba(78,56,16,.08);
}
.ritual-page-view .ritual-actions .primary-cta{
  min-height:58px;
  border-radius:18px;
  letter-spacing:.02em;
}

/* Final: leve diferenciação mariana sem romper a identidade */
#finalPrayerView .ritual-page{
  background:
    radial-gradient(circle at 50% 0,rgba(210,171,69,.24),transparent 27%),
    linear-gradient(rgba(255,249,229,.98),rgba(246,229,186,.98)),
    repeating-linear-gradient(0deg,rgba(109,76,19,.035) 0 1px,transparent 1px 4px);
}
#finalPrayerView .devotional-extra.salve-card{
  border-color:#bf9330!important;
  background:
    radial-gradient(circle at 50% -10%,rgba(216,174,70,.24),transparent 48%),
    linear-gradient(180deg,#fff9e7,#f3dfab)!important;
}

/* Corrige a sobreposição: durante abertura/fechamento o player vira mini-player. */
@media(max-width:560px){
  .ritual-page-view{padding-bottom:86px}
  .ritual-page-view .page-toolbar{margin:4px 4px 10px;padding:8px 9px;border-radius:18px}
  .ritual-page-view .page-toolbar h2{font-size:1.35rem}
  .ritual-page-view .page-toolbar .mini-seal{width:38px;height:38px}
  .ritual-page-view>.ritual-progress{margin:0 5px 10px;padding:7px 6px}
  .ritual-page-view .ritual-page{margin:0;padding:24px 18px 28px;border-radius:21px}
  .ritual-page-view .ritual-section>h3{font-size:1.55rem}
  .ritual-page-view .persignation-card{padding:14px 15px}
  .ritual-page-view .persignation-card p{font-size:1.04rem}
  .ritual-page-view .devotional-extra{padding:15px 15px 17px!important}
  .ritual-page-view .devotional-extra p{font-size:1.07rem!important;line-height:1.43!important}
  .ritual-page-view #initialText,
  .ritual-page-view #finalText{padding:17px 14px 18px 16px;font-size:1.12rem;line-height:1.48}

  body:has(.ritual-page-view.active) .music-dock.playlist-enabled{
    bottom:calc(69px + env(safe-area-inset-bottom));
    width:calc(100% - 34px);
    min-height:58px;
    grid-template-columns:minmax(0,1fr) auto 40px!important;
    gap:7px!important;
    padding:7px 9px!important;
    border-radius:18px;
    box-shadow:0 5px 16px rgba(0,0,0,.22);
  }
  body:has(.ritual-page-view.active) .music-dock.playlist-enabled input[type="range"]{display:none!important}
  body:has(.ritual-page-view.active) .music-track-info small,
  body:has(.ritual-page-view.active) .music-credit{display:none!important}
  body:has(.ritual-page-view.active) .music-track-info strong{
    font-size:.86rem;
    line-height:1.15;
  }
  body:has(.ritual-page-view.active) .music-dock .playlist-nav .track-nav{
    width:27px;height:27px;
  }
  body:has(.ritual-page-view.active) .music-dock #musicBtn{
    width:38px;height:38px;
  }
}

@media(min-width:561px){
  .ritual-page-view .ritual-page{max-width:690px;margin-left:auto;margin-right:auto}
}
'''
    path.write_text(css, encoding='utf-8')
    print('v29 aplicada ao styles.css')
else:
    print('v29 já presente; nenhuma alteração necessária')
