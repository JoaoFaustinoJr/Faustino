from PIL import Image, ImageDraw, ImageOps
from pathlib import Path

root=Path(__file__).resolve().parents[1]
src_path=root/"assets/img/hero.jpg"
out_dir=Path(__file__).resolve().parent/"icons"
out_dir.mkdir(parents=True,exist_ok=True)

src=Image.open(src_path).convert("RGBA")

def make_icon(size, scale, name):
    bg=Image.new("RGBA",(size,size),(13,74,49,255))
    draw=ImageDraw.Draw(bg)
    pad=int(size*0.055)
    draw.ellipse((pad,pad,size-pad,size-pad),fill=(249,239,207,255),outline=(184,138,42,255),width=max(2,size//80))
    target=int(size*scale)
    art=ImageOps.contain(src,(target,target),Image.Resampling.LANCZOS)
    x=(size-art.width)//2
    y=(size-art.height)//2
    bg.alpha_composite(art,(x,y))
    bg.convert("RGB").save(out_dir/name,"PNG",optimize=True)

make_icon(192,.80,"icon-192.png")
make_icon(512,.80,"icon-512.png")
make_icon(512,.66,"maskable-512.png")

for p in out_dir.glob("*.png"):
    print(p, p.stat().st_size)
