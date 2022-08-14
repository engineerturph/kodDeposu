#app.py
text = input('text:')
harfSayisi=len(text)
kelimeSayisi=1
boslukSayisi=0
text.split()
text = list(text)
i=0
while i<harfSayisi:
    if text[i]==' ':
        boslukSayisi=boslukSayisi+1
        if text[i]==text[i+1]:
            c=i
            while c<harfSayisi:
                text[c]=text[c+1]
                c=c+1
        else:
            kelimeSayisi=kelimeSayisi+1
        if i==0 or text[i+1]==0:
            kelimeSayisi=kelimeSayisi-1
    i=i+1
if boslukSayisi==harfSayisi:
    kelimeSayisi=kelimeSayisi-1
s = ' '
s = s.join(text)
print("cikti:\n",text,"\n\n")
print("kelime sayisi:",kelimeSayisi,"\n")