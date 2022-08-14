#include <stdio.h>
#define N 5000
int main(void)
{
 char text[N];
 /********* degisken tanimlari ************/
int harfSayisi=0,boslukSayisi=0,kelimeSayisi=1,c,i;
 /********* degisken tanimlari sonu ************/

 gets(text);
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
printf("%d\n",harfSayisi);

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
if(boslukSayisi==harfSayisi){
			kelimeSayisi--;
		}

printf("cikti:\n%s|\n\n",text);
printf("kelime sayisi:%d\n", kelimeSayisi);
 /********* kod blogu sonu ************/
 // Dosyayi kapama
 return 0;
}
/*
int main(){
	int cumleElemanSilme(int eleman, char cumle[]);
	char cumle[5000];
	int i,a,c,kelimeSayisi=1;
	for(a=0;a<5000;a++){
		cumle[a]='a';
	}
	printf("Cumleyi giriniz:\n");
	gets(cumle);
	// Ilk olarak bosluklarin cumledeki yerlerini bulalim.
	for(i=0;i<5000;i++){
		if(cumle[i]== ' '){
			printf("Bosluk olan yer:%d\n",i);
			// Basta ve sondaki bosluklari bulma
			// Art arda gelen bosluklari bulma
			if(cumle[i]==cumle[i+1]){
				printf("Art arda bosluk olan yerler:%d\n",i);
				// Bosluklarin sayisini bire indirme
				cumleElemanSilme(i,cumle);
				i--;
			}
			else{kelimeSayisi++;
			}
			if(cumle[i+1]==0||i-1==-1){
				kelimeSayisi--;
			}
		}
	}
	///// Bosluklarin sayisini bire indirelim(bosluklarin sayisini bire indirdikten sonra bosluk sayisini 1 arttirip kelime sayisini bulabiliriz.)
	
	
	printf("Kelime Sayisi :%d",kelimeSayisi);
	printf("Cumle:%s/",cumle);
	return 0;
}

// Eleman silme functionu
	cumleElemanSilme(int eleman, char cumle[]){
		int c;
		for(c=0;c<5000;c++){
			if (eleman <=c){
				cumle[c]=cumle[c+1];
			}
		}
		return 0;
	}*/
