#include <stdio.h>

int main(){
	char metin[5000];
	int harfSayisi=0,i,a=-3;
	printf("Girdi:\n");
	fgets(metin, 5000, stdin);
	// metin harf sayisini bulma
	while(metin[harfSayisi]!=0){
		harfSayisi++;
	}
	// metinin hepsini tarama ve 2 arkasinda ya da 1 arkasinda ise o harfi buyutme
	for(i=0;i<harfSayisi;i++){
		//.yi bulma a ya atama
		if(metin[i]=='.'){
			a=i;
		}
		//metin kucuk harfmi diye kontrol etme
		if(metin[i]>96&&metin[i]<123){
			if((metin[i]!=' '&&i==0)||(metin[i-1]==' '&&metin[i]!=' '&&i==1)||(metin[i]!=' '&&i-a==1)||(metin[i]!=' '&&metin[i-1]==' '&&i-a==2)){
			metin[i]-=32;
			}
		}
	}
	printf("Cikti:\n%s\n",metin);  
}
