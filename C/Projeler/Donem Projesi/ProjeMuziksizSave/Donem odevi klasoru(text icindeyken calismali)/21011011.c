#include <stdio.h>
#include <time.h>
#include <dos.h>

/////////////ONEMLI NOT///////////////////////
//Functionlarda kullanimi daha kolay olmasi icin array kullanilmistir.
int displayMatrix(char matrix[],int limitNumber),saveUzunlugu,saveler;
int tilesReset(char matrix[],int limitNumber);
int ucNoktaBeklet(int ms);
int yavasyazdirma(char text[]);
int ilkCumleyeIkincisiniEkleme(char cumle[],char oburCumle[]);

int main(){
	int oyuncupuanlari[1000],oyuncuzorluklari[1000],highScore,h,i,saveSayisi;
	char oyuncuIsmi[3],saveDosyasi[1000],saveler[1000][7],puanYazi[2],zorlukYazi[2];
	int b;
	int oyuncu=1,game=1,oyunbasi=1;
	int mainMenu,zorluk=0,mainMenuAcik=1,zorlukAl=0,arrayLength,hafiza;
	char mainMenuText[100] = "MAIN MENU\n\n1-Oyuna basla\n2-Ayarlar\n3-Oyunu Kapat\n4-Skorlar\n\n";
	char ayarlarText[100] = "Zorluk seviyesini giriniz:\n1-Zor\n2-Orta\n3-Kolay\n\n";
	char r1[100] = "Rastgele sayilar/harfler/sekiller olusturuldu.\n";
	char satirGir[100] = "Satir sayisini giriniz:";
	char sutunGir[100] = "Sutun sayisini giriniz:";
	char oyuncuGir[100] = "3 buyuk harften olusan kullanici adinizi giriniz:";
	char oyuncuMerhaba[100] = "Merhaba ";
	char yuksekSkorlar[100] = "En yuksek skorlar:\n\n";
	char bitir[1] = "\0";
	//Main menu :D
	
	//Save dosyasini acma
	//Save kaydetme sekli TRB083 ve aralarda bosluk yok.(TRB isim 08 skor 3 zorluk)
	FILE *save; // creates a pointer to file
	save = fopen("save.txt", "r+");// opens file with read+ permissions
	if (save == NULL) {
 	printf("Dosya açma hatasi!");
 	return 1;
 	}
	while(mainMenuAcik==1){
	
	yavasYazdirma(mainMenuText);
	do{
		scanf("%d",&mainMenu);
		if(mainMenu!=1&&mainMenu!=2&&mainMenu!=3&&mainMenu!=4){
			printf("Invalid input!\n");
		}
	}while(mainMenu!=1&&mainMenu!=2&&mainMenu!=3&&mainMenu!=4);
	switch(mainMenu){
		case 1:
			if(zorluk==0){
				zorluk=3;
			}
			mainMenuAcik=0;
			zorlukAl=0;
			highScore=0;
			break;
		case 2:
			zorlukAl=1;
			mainMenuAcik=1;
			highScore=0;
			break;
		case 3:
			return 0;
			break;
		case 4:
			zorlukAl=0;
			mainMenuAcik=1;
			highScore=1;
	}
	//Zorluk alma
	if(zorlukAl==1){
		yavasYazdirma(ayarlarText);
		
		do{
			scanf("%d",&zorluk);
		if(zorluk!=1&&zorluk!=2&&zorluk!=3){
			printf("Invalid input!\n");
		}
		}while(zorluk!=1&&zorluk!=2&&zorluk!=3);
	}
	if(zorluk==1){
			arrayLength = 8;
			hafiza=16;
		}
		if(zorluk==2){
			arrayLength = 6;
			hafiza = 6;
		}
		if(zorluk==3){
			arrayLength=4;
			hafiza=2;
		}
	// High scorelari gorme
	fscanf(save, "%s", &saveDosyasi);
	if(highScore==1){
		yavasYazdirma(yuksekSkorlar);
		
		saveUzunlugu=0;
		while(saveDosyasi[saveUzunlugu]!=0){
			saveUzunlugu++;
		}
		saveSayisi=saveUzunlugu/7;
		for(h=0;h<saveSayisi;h++){
		for(i=0;i<7;i++){
			
			saveler[h][i]=saveDosyasi[i+(7*h)];
			saveler[h][7]='\0';
		}}
		for(i=0;i<saveSayisi;i++){
			printf("Oyuncu %d:", i+1);
			printf("%c",saveler[i][0]);
			printf("%c",saveler[i][1]);
			printf("%c",saveler[i][2]);
			printf("  Alinan skor:");
			printf("%c",saveler[i][3]);
			printf("%c",saveler[i][4]);
			printf("  Zorluk:");
			if(saveler[i][6]=='1'){
				printf(" Zor");
			}
			if(saveler[i][6]=='2'){
				printf(" Orta");
			}
			if(saveler[i][6]=='3'){
				printf(" Kolay");
			}
			printf("\n");
		}
		printf("\n");
		Sleep(3000);
	}
	
}
	//Oyuncu ismini alma
	
	yavasYazdirma(oyuncuGir);
	scanf("%s",&oyuncuIsmi);
	yavasYazdirma(oyuncuMerhaba);
	yavasYazdirma(oyuncuIsmi);
	Sleep(1000);
	printf("\n");
	//Rastgele Sayilari Olusturma
	
	
	int L2 = arrayLength*arrayLength;
	int hiddenTiles[L2],j,kartlar[L2/2],ikiTaneVarmi[L2/2];
	char tiles[L2];
	srand(time(NULL));
	int a = rand()%(L2/2);
	yavasYazdirma(r1);
	Sleep(1000);
	for(i=0;i<L2/2;i++){
		kartlar[i]=i+1;
		ikiTaneVarmi[i]=0;
	}
	
	for(i=0;i<arrayLength;i++){
		for(j=0;j<arrayLength;j++){
			hiddenTiles[(i*arrayLength)+j]=0;
			do {
				if(ikiTaneVarmi[a]<2){
				hiddenTiles[(i*arrayLength)+j]=kartlar[a];
				ikiTaneVarmi[a]++;
				a= rand()%(L2/2);
				}
				else{
				a= rand()%(L2/2);
				}
			}
			while(hiddenTiles[(i*arrayLength)+j]==0);
			tiles[(i*arrayLength)+j]='*';
//		printf("%c |",tiles[(i*arrayLength)+j]);
//		if(hiddenTiles[(i*arrayLength)+j]<10){
//			printf("%d |",hiddenTiles[(i*arrayLength)+j]);
//		}
//		else{
//			printf("%d|",hiddenTiles[(i*arrayLength)+j]);
//		}
		}
//		printf("\n");
	}
	int satir[hafiza],sutun[hafiza],sayilar[hafiza],hafizaYeri=0,yer,oynanmaSayisi=0,puan1=0,puan2=0,maxpuan=L2/2,eskiyer,ayni1;
	for(i=0;i<hafiza;i++){
		satir[i]=0;
		sutun[i]=0;
		sayilar[i]=0;
	}
	//Oyun baslangici
	while(game==1){
	//Sira 1. oyuncuya gectiginde tiles i resetleme
	tilesReset(tiles,arrayLength);
	//Oyuncu oynadigi zamanlar
	while(oyuncu==1&&game==1){
	//Satir sutun inputu alma(ayni zamanda hafizaya kaydeder ve oradan kontrolu yapar)
	
	yavasYazdirma(satirGir);
	scanf("%d",&satir[hafizaYeri]);
	yavasYazdirma(sutunGir);
	scanf("%d",&sutun[hafizaYeri]);
	
	//Ayni inputu alinca inputu kabul etme!
	
	eskiyer = ((satir[hafizaYeri-1]-1)*arrayLength)+sutun[hafizaYeri-1]-1;
	yer = ((satir[hafizaYeri]-1)*arrayLength)+sutun[hafizaYeri]-1;
	if(tiles[yer]!=hiddenTiles[yer]+48&&satir[hafizaYeri]<=arrayLength&&sutun[hafizaYeri]<=arrayLength&&tiles[yer]!='-'){
	
	//Verilen sayiyi gosterme
	
	tiles[yer]=hiddenTiles[yer]+48;
	displayMatrix(tiles,arrayLength);
	
	//Verilen sayi oncekiyle esitmi kontrolu
	
	sayilar[hafizaYeri]=hiddenTiles[yer]+48;
	if(sayilar[hafizaYeri]==sayilar[hafizaYeri-1]&&oynanmaSayisi==1){
		printf("Ayni birimleri buldunuz.\n");
		Sleep(500);
		puan1++;
		tiles[yer]='-';
		tiles[eskiyer]='-';
		
	}
	if(sayilar[hafizaYeri]!=sayilar[hafizaYeri-1]&&oynanmaSayisi==1){
		oyuncu=0;
	}
	if(puan1+puan2==L2/2){
			game=0;
		}
	oynanmaSayisi=(oynanmaSayisi+1)%2;
	hafizaYeri=(hafizaYeri+1)%hafiza;
	}
	else{
	printf("Invalid Input\n\n");
	}
}
char siraBilgisayarda[100] = "Sira Bilgisayarda\n";
char bgsHazir[100] = "Bilgisayar hazirlaniyor";
char ayni2Sayi[100] = "\nAyni 2 birim bilgisayar tarafindan tespit edildi";
char bgsOynadi[100] = "\nBilgisayar tespit ettigi birimleri oynadi";
char bgs1Hamle[100] = "\nBilgisayar rastgele birinci hamlesini oynuyor";
char bgs2Hamle[100] = "\nBilgisayar rastgele ikinci hamlesini oynuyor";
char bgsRandomEslesme[100] = "Bilgisayar oynadigi rastgele birimle ayni birim buldu ve onu oynadi";
char rastAyni[100] = "Bilgisayarin oynadigi 2 rastgele birim ayni cikti";
	while(oyuncu==0&&game==1){
		int movRow1,movCol1,movRow2,movCol2,mov1Bozuk=1,mov2Bozuk=1,mov1,mov2,ilkSayidaBasaDon=1,ikinciSayidaBasaDon=1;
		yavasYazdirma(siraBilgisayarda);
		Sleep(500);
		yavasYazdirma(bgsHazir);
		ucNoktaBeklet(800);
		tilesReset(tiles,arrayLength);
//		displayMatrix(tiles,arrayLength);
		
		// Hafizada eger oynanmis sayilar varsa silme
		
		for(i=0;i<hafiza-1;i=i+2){
			if(sayilar[i]==sayilar[i+1]){
				sayilar[i]=0;
				sayilar[i+1]=0;
			}
		}
		
		// Yerleri ayni olan 2 hafizadan birini silme
		
		for(i=0;i<hafiza;i++){
			for(j=i+1;j<hafiza;j++){
				if(satir[i]==satir[j]&&sutun[i]==sutun[j]&&satir[i]!=0&&satir[j]!=0){
					sayilar[i]=0;
				}
			}
		}
		
		// Ayni 2 sayiyi tespit etme(silinmis sayi = 0) ve oynama
		
		for(i=0;i<hafiza;i++){	
			for(j=i+1;j<hafiza;j++){
				if(sayilar[i]==sayilar[j]&&sayilar[i]!=0&&sayilar[j]!=0){
					sayilar[i]=0;
					sayilar[j]=0;
					yavasYazdirma(ayni2Sayi);
					// Ayni 2 sayi bulunduysa onlari oynama
					ucNoktaBeklet(800);
					int yer1 = ((satir[i]-1)*arrayLength)+sutun[i]-1;
					int yer2 = ((satir[j]-1)*arrayLength)+sutun[j]-1;
					tiles[yer1]='-';
					tiles[yer2]='-';
					puan2++;
					yavasYazdirma(bgsOynadi);
					ucNoktaBeklet(800);
					if(puan1+puan2==L2/2){
					game=0;
					}
				}
			}
		}
		
		// Hafiza yazdirma
//		for(i=0;i<hafiza;i++){
//			printf("%d.sayi %d\n",i,sayilar[i]);
//			printf("%d.satir %d\n",i,satir[i]);
//			printf("%d.sutun %d\n",i,sutun[i]);
//		}
		
		// Ayni 2 sayilari oynadiktan sonra rastgele bir sayi oynama
		while(ikinciSayidaBasaDon==1&&game==1){
		while(ilkSayidaBasaDon==1&&game==1){
		tilesReset(tiles,arrayLength);
		yavasYazdirma(bgs1Hamle);
		ucNoktaBeklet(800);
		mov1Bozuk=1;
		while(mov1Bozuk==1){
			movRow1=rand()%arrayLength+1;
			movCol1=rand()%arrayLength+1;
			mov1=((movRow1-1)*arrayLength)+movCol1-1;
			mov1Bozuk=0;
			for(i=0;i<hafiza;i++){
				if(mov1==((satir[i]-1)*arrayLength)+sutun[i]-1||tiles[mov1]=='-'){
					mov1Bozuk=1;
				}
			}
		}
		tiles[mov1]=hiddenTiles[mov1]+48;
		displayMatrix(tiles,arrayLength);
		// Rastgele sayi ile ayni sayi hafizasinda varsa oynama ve hafizadaki sayiyi silme(nolur nolmaz)
		ilkSayidaBasaDon=0;
		for(i=0;i<hafiza;i++){
			if(hiddenTiles[mov1]+48==sayilar[i]){
				sayilar[i]=0;
				tiles[((satir[i]-1)*arrayLength)+sutun[i]-1]='-';
				tiles[mov1]='-';
				puan2++;
				yavasYazdirma(bgsRandomEslesme);
				ucNoktaBeklet(800);
				ilkSayidaBasaDon=1;
				displayMatrix(tiles,arrayLength);
				if(puan1+puan2==L2/2){
				game=0;
				}
			}
		}	
}

		// Rastgele sayi ile ayni sayi yoksa baska bir rastgele sayi oynama
		if(game==1){
		yavasYazdirma(bgs2Hamle);
		ucNoktaBeklet(800);
		mov2Bozuk=1;
		while(mov2Bozuk==1){
			movRow2=rand()%arrayLength+1;
			movCol2=rand()%arrayLength+1;
			mov2=((movRow2-1)*arrayLength)+movCol2-1;
			mov2Bozuk=0;
			for(i=0;i<hafiza;i++){
				if(mov2==((satir[i]-1)*arrayLength)+sutun[i]-1||tiles[mov2]=='-'||mov1==mov2){
					mov2Bozuk=1;
				}
			}
		}
		tiles[mov2]=hiddenTiles[mov2]+48;
		displayMatrix(tiles,arrayLength);
		ikinciSayidaBasaDon=0;
		
		// Yeni gelen rastgele sayi oncekiyle ayni mi diye kontrol etme
		
		if(tiles[mov1]==tiles[mov2]){
				tiles[mov2]='-';
				tiles[mov1]='-';
				puan2++;
				yavasYazdirma(rastAyni);
				ucNoktaBeklet(800);
				ikinciSayidaBasaDon=1;
				ilkSayidaBasaDon=1;
				if(puan1+puan2==L2/2){
				game=0;
				}
		}
		else{
			// Farkli ise sayilari kaydetme
			satir[hafizaYeri]=movRow1;
			sutun[hafizaYeri]=movCol1;
			sayilar[hafizaYeri]=hiddenTiles[mov1]+48;
			hafizaYeri=(hafizaYeri+1)%hafiza;
			satir[hafizaYeri]=movRow2;
			sutun[hafizaYeri]=movCol2;
			sayilar[hafizaYeri]=hiddenTiles[mov2]+48;
			hafizaYeri=(hafizaYeri+1)%hafiza;
		}
	}
}
	oyuncu=1;
}}
if(game==0){
	// Biten oyunun skorlarini kaydetme
	ilkCumleyeIkincisiniEkleme(saveDosyasi,oyuncuIsmi);
	if(puan1<10){
		puanYazi[0]='0';
		puanYazi[1]=puan1+48;
	}
	if(puan1>10){
		puanYazi[0]=(puan1/10)+48;
		puanYazi[1]=(puan1%10)+48;
	}
	ilkCumleyeIkincisiniEkleme(saveDosyasi,puanYazi);
	zorlukYazi[0]='0';
	zorlukYazi[1]=zorluk+48;
	ilkCumleyeIkincisiniEkleme(saveDosyasi,zorlukYazi);
	fseek(save,0,SEEK_SET);
	fprintf(save, "%s", saveDosyasi);
	Sleep(2000);
	printf("\n\nOyun bitmistir.\n\nOYUNCU==%d puan\n\BILGISAYAR==%d puan",puan1,puan2);
	fclose(save);
}

	return 0;
}

int ucNoktaBeklet(int ms){
	printf(".");
	Sleep(ms);
	printf(".");
	Sleep(ms);
	printf(".");
	Sleep(ms);
}

int displayMatrix(char matrix[],int limitNumber){
	int i,j;
	printf("\n");
	printf("|------------|---");
	for(i=0;i<limitNumber;i++){
		printf("|---");
	}
	printf("|");
	printf("\n");
	printf("|  Koordinatlar  ");
	for(i=0;i<limitNumber;i++){
		printf("| %d ", i+1);
	}
	printf("|");
	printf("\n");
	printf("|------------|---");
	for(i=0;i<limitNumber;i++){
		printf("|---");
	}
	printf("|");
	printf("\n");
	
	for(i=0;i<limitNumber;i++){
		printf("|            ");
		printf("| %c ",i+49);
		for(j=0;j<limitNumber;j++){
			printf("| %c ",matrix[(i*limitNumber)+j]);
			}
			printf("|");
			printf("\n");
			printf("|------------|---");
		for(j=0;j<limitNumber;j++){
			printf("|---");
		}
		printf("|");
		printf("\n");
	}
	return 0;
}

int tilesReset(char matrix[],int limitNumber){
	int i,j;
	for(i=0;i<limitNumber;i++){
		for(j=0;j<limitNumber;j++){
			if(matrix[(i*limitNumber)+j]!='-'){
				matrix[(i*limitNumber)+j]='*';
			}
	}
	}
	return 0;
}

int yavasYazdirma(char text[]){
	int i=0,j;
	while(text[i]!=0){
		i++;
	}
	for(j=0;j<i;j++){
		printf("%c",text[j]);
		Sleep(30);
	}
}

int ilkCumleyeIkincisiniEkleme(char cumle[],char oburCumle[]){
	int cumleKelimeSayisi=0,oburCumleKelimeSayisi=0,i;
	while(cumle[cumleKelimeSayisi]!=0){
		cumleKelimeSayisi++;
	}
	while(oburCumle[oburCumleKelimeSayisi]!=0){
		oburCumleKelimeSayisi++;
	}
	for(i=0;i<oburCumleKelimeSayisi;i++){
		cumle[cumleKelimeSayisi+i]=oburCumle[i];
	}
}
