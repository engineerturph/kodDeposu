#include <stdio.h>
#define N 5000
int main(void)
{
 FILE *fp;
 char text[N];
 /********* degisken tanimlari ************/
int harfSayisi=0,boslukSayisi=0,kelimeSayisi=1,c,i;
 /********* degisken tanimlari sonu ************/

 // Dosyayi açma
 if ((fp = fopen ("soru.txt", "r")) == NULL) {
 printf("Dosya açma hatasi!");
 return 1;
 }
 // Dosyadan okuma
 fgets(text, N-1, fp);
// printf("%s\n", text);

 /*
 * text karakter dizisi degiskeninde dosyadan okunan metin yer almaktadir.
 * toplam kelime sayisinin hesabi ve bosluk temizleme islemleri -TERCIHEN-
 * bu dizi üzerinde yapilmalidir. Harici dizi kullanimi önerilmemektedir.
 */
 /********* kod blogu ************/
while(text[harfSayisi]!=0){
	// harf sayisini sayma
	harfSayisi++;
}

for(i=0;i<harfSayisi;i++){
	// bosluklari bulma
	if(text[i]== ' '){
		boslukSayisi++;
		// art arda gelen bosluklari bulma
		if(text[i]==text[i+1]){
			for(c=i;c<harfSayisi;c++){
				text[c]=text[c+1];
				
			}
			i--;
		}
		// eger ardinda bir bosluk yoksa kelime vardir o yuzden kelime sayisi artar
		else{kelimeSayisi++;
		}
		// bosluk ilk bastaysa (ilk bastaki boslugun ardinda boslukta varsa i==-1 oluyor) ya da en sondaysa kelime sayisini arttirmaz
		if(i==0||text[i+1]==0){
			kelimeSayisi--;
		}
	}
}

//cumle tamamen bosluktan olusuyorsa kelime yoktur.
if(boslukSayisi==harfSayisi){
			kelimeSayisi--;
		}

printf("cikti:\n%s|\n\n",text);
printf("kelime sayisi:%d\n", kelimeSayisi);
 /********* kod blogu sonu ************/
 // Dosyayi kapama
 fclose(fp);
 return 0;
}
