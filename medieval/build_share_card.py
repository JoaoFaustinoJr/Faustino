from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter
from pathlib import Path

W,H=1200,630
paper=(249,239,207)
green=(13,74,49)
green2=(8,57,39)
gold=(184,138,42)
ink=(39,45,37)
muted=(102,80,45)
white=(255,248,225)

root=Path(__file__).resolve().parents[1]
hero_path=root/"assets/img/hero.jpg"
day1_path=root/"assets/img/day1.jpg"
out_path=Path(__file__).resolve().parent/"share-card.png"

def font(size,bold=False,serif=True):
    choices=[]
    if serif:
        choices += [
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
            "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf",
        ]
    else:
        choices += [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ]
    for p in choices:
        if Path(p).exists():
            return ImageFont.truetype(p,size=size)
    return ImageFont.load_default()

def cover(im,size):
    im=im.convert("RGB")
    target_ratio=size[0]/size[1]
    ratio=im.width/im.height
    if ratio>target_ratio:
        nw=int(im.height*target_ratio)
        left=(im.width-nw)//2
        im=im.crop((left,0,left+nw,im.height))
    else:
        nh=int(im.width/target_ratio)
        top=(im.height-nh)//2
        im=im.crop((0,top,im.width,top+nh))
    return im.resize(size,Image.Resampling.LANCZOS)

def rounded_paste(base,im,box,radius,border=None,bw=0):
    x,y,w,h=box
    src=cover(im,(w,h))
    mask=Image.new("L",(w,h),0)
    md=ImageDraw.Draw(mask)
    md.rounded_rectangle((0,0,w,h),radius=radius,fill=255)
    base.paste(src,(x,y),mask)
    if border and bw:
        ImageDraw.Draw(base).rounded_rectangle((x,y,x+w,y+h),radius=radius,outline=border,width=bw)

img=Image.new("RGB",(W,H),paper)
d=ImageDraw.Draw(img)

# subtle parchment texture
for y in range(H):
    shade=int(8*((y/H)-0.5))
    d.line((0,y,W,y),fill=(max(0,paper[0]+shade),max(0,paper[1]+shade),max(0,paper[2]+shade)))
for x in range(22,W-22,34):
    if x<180 or x>1020:
        d.ellipse((x,34,x+5,39),fill=gold)

# double frame
d.rounded_rectangle((10,10,W-10,H-10),radius=22,outline=gold,width=5)
d.rounded_rectangle((20,20,W-20,H-20),radius=18,outline=green,width=2)

# corner ornaments
for sx in (1,-1):
    ox=28 if sx==1 else W-28
    pts=[(ox,86),(ox+sx*38,48),(ox+sx*92,42),(ox+sx*132,61),(ox+sx*92,66),(ox+sx*57,96)]
    d.line(pts,fill=green,width=7,joint="curve")
    d.line([(ox,96),(ox+sx*42,75),(ox+sx*76,78)],fill=gold,width=3)

hero=Image.open(hero_path)
day1=Image.open(day1_path)
rounded_paste(img,hero,(40,74,315,438),38,gold,6)

# caption over hero
d.rounded_rectangle((53,427,342,504),radius=16,fill=(251,239,205),outline=gold,width=2)
d.text((197,451),"SANTA HILDEGARDA",font=font(25,True),fill=green,anchor="mm")
d.text((197,482),"Virgem e Doutora da Igreja",font=font(18,False),fill=muted,anchor="mm")

# phone on right with actual first-day art
d.rounded_rectangle((912,78,1160,535),radius=44,fill=(17,23,26),outline=gold,width=5)
d.rounded_rectangle((924,90,1148,523),radius=34,fill=(248,237,203))
rounded_paste(img,day1,(934,107,204,390),28,None,0)
d.rounded_rectangle((940,112,1132,175),radius=13,fill=(251,239,208),outline=gold,width=1)
d.text((1036,132),"1º DIA",font=font(14,True),fill=green,anchor="mm")
d.text((1036,155),"A SABEDORIA DE DEUS",font=font(15,True),fill=green,anchor="mm")
d.rounded_rectangle((945,449,1127,487),radius=15,fill=green,outline=gold,width=2)
d.text((1036,468),"Iniciar oração de hoje  ›",font=font(13,True),fill=white,anchor="mm")

# central heading
cx=635
d.text((cx,44),"FÉ  •  SABEDORIA  •  CURA  •  VIDA PLENA EM DEUS",font=font(15,True),fill=green,anchor="mm")
d.text((cx,90),"NOVENA DIGITAL DE",font=font(35,True),fill=green,anchor="mm")
d.text((cx,150),"SANTA HILDEGARDA",font=font(58,True),fill=green2,anchor="mm")
d.text((cx,200),"DE BINGEN",font=font(40,True),fill=green2,anchor="mm")
d.text((cx,238),"Virgem e Doutora da Igreja",font=font(26,False),fill=muted,anchor="mm")
d.line((410,264,858,264),fill=gold,width=2)
d.text((cx,300),"9 dias de oração, reflexão, intenção e música.",font=font(25,False),fill=ink,anchor="mm")

# chips
chips=[("INSTALÁVEL",412,337,135),("LIVRO DEVOCIONAL",560,337,150),("FORMATO DE LIVRO",724,337,150)]
for label,x,y,w in chips:
    d.rounded_rectangle((x,y,x+w,y+70),radius=16,fill=green,outline=gold,width=3)
    d.ellipse((x+w//2-17,y+4,x+w//2+17,y+38),fill=(242,215,127))
    icon="•" if label=="INSTALÁVEL" else ("▤" if label=="LIVRO DEVOCIONAL" else "↔")
    d.text((x+w//2,y+21),icon,font=font(18,True,False),fill=green,anchor="mm")
    d.text((x+w//2,y+53),label,font=font(12 if len(label)>12 else 14,True,False),fill=white,anchor="mm")

d.text((cx,432),"Deslize como as páginas de um livro.",font=font(22,False),fill=muted,anchor="mm")
d.rounded_rectangle((430,460,858,527),radius=22,fill=green,outline=gold,width=4)
d.text((644,494),"ABRIR A NOVENA  ›",font=font(30,True),fill=white,anchor="mm")

# footer/url
d.rounded_rectangle((388,544,1060,598),radius=15,fill=(251,239,205),outline=gold,width=2)
d.text((724,571),"joaofaustinojr.github.io/Faustino/medieval/",font=font(18,True,False),fill=green,anchor="mm")
d.text((38,568),"“Que a Sabedoria divina guie a sua jornada.”",font=font(17,False),fill=muted)
d.text((600,615),"Santa Hildegarda de Bingen, rogai por nós!",font=font(16,False),fill=green,anchor="ms")

img.save(out_path,"PNG",optimize=True)
print(out_path, out_path.stat().st_size)
