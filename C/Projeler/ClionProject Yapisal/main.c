#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <Windows.h>
#define MB 50
#define CS 20
#define HAVUZ 2048
#define MUTASYONSANSI 500//1 / mutasyon sansini belirler.
#define ORDERNUM 98
//Uzakliktaki sirasina gore fitness olacak(fitnessi sirasina gore verilecek).
//Fitness/Total Fitness = Ciftlesme sansi.
//Cocuk sayisi burada ebeveyn sayisindan az ya da fazla olabilir.
//Ata birey sayisi 50 olacak.
//Crossover birinin yarisini oburunun yarisini alacak.
//Yukari orderi 1 sag orderi 2 sol orderi 3.
//Ilk basta mutasyonlar cok olmasi iyi sonra isi yola soktuktan sonra mutasyon azalmasi iyi.
//En iyisi diversity ve fitnessa gore bir fitness da ayarlamak ama o cok zor ugrasamam.
//En cok fitnessa sahip olanlarin daha cok oldugu bir kume olustur ve o kumeden rastgele kisiler secerek ciftlestir.
//Sola gidenle solu saga gidenle sagi ciftlestir.
//Heralde 1 valueya 1 farkli random sayiyi atiyor ayni value olunca ayni random sayiyi atiyor.
//Duvara carpinca duvar uzakligini da ekle duvara ekstra penaltyli de dene.
//Duvar penaltysi uzerinden algoritma duvar penaltysi uzerinden sayisal analiz yapilarak da gelistirilebilir de.
//Bu yapay zeka algoritmasi farkli algoritmalar kullanarak kendi kendini de gelistirebilir de.
typedef struct cocuk{
    int order[ORDERNUM];
    int uzaklik;
    int konum[2];//0 x 1 y
    int sagSol;//0 sol 1 sag
} cocuk;
int haritaOlustur(int matris[MB][MB]);
void haritaYazdir(int matris[MB][MB]);
void cocuklarRandomOrder(cocuk c[CS]);
void cocuklarBasaKoy(cocuk c[CS]);
void cocuklarYurut(cocuk c[CS],int matris[MB][MB]);
void uzakliklariHesapla(cocuk c[CS], int xCoord);
void uzaklikSirala(cocuk c[CS]);
void swapChildren(cocuk* c1,cocuk* c2);
void sagSolAyir(cocuk c[CS],int xCoord);
void cocukAllAttributesYazdir(cocuk c[CS]);
void havuzOlustur(int havuz[HAVUZ]);
void havuzYazdir(int havuz[HAVUZ]);
void cocuklariYap(cocuk c[CS],int havuz[HAVUZ]);//GenerationNum sonradan ekle
void ciftlestir(cocuk* c1,cocuk* c2,cocuk* c3);
void yeniNesilEslestir(cocuk ata[CS],cocuk yeniNesil[CS]);
int main(){
	int matris[MB][MB];
    cocuk cocuklar[CS];
	int xCoord = haritaOlustur(matris);
    int havuz[HAVUZ];
    int generationNum;
    int i;
    srand(time(NULL));
    printf("Generation sayisini giriniz:");
    scanf("%d",&generationNum);
	haritaYazdir(matris);
    cocuklarRandomOrder(cocuklar);
    cocuklarBasaKoy(cocuklar);
    cocuklarYurut(cocuklar,matris);
    uzakliklariHesapla(cocuklar,xCoord);
    uzaklikSirala(cocuklar);
    sagSolAyir(cocuklar,xCoord);
    havuzOlustur(havuz);
    cocukAllAttributesYazdir(cocuklar);
    havuzYazdir(havuz);
    //Yeni generationda olacak islemler
    for(i=0;i<generationNum;i++) {
        cocuklariYap(cocuklar, havuz);
        cocuklarBasaKoy(cocuklar);
        cocuklarYurut(cocuklar, matris);
        uzakliklariHesapla(cocuklar, xCoord);
        uzaklikSirala(cocuklar);
        sagSolAyir(cocuklar, xCoord);
        havuzOlustur(havuz);

    }
    cocukAllAttributesYazdir(cocuklar);
}
void yeniNesilEslestir(cocuk ata[CS],cocuk yeniNesil[CS]){
    int i;
    for(i=0;i<CS;i++){
        swapChildren(&ata[i],&yeniNesil[i]);
    }
}
void ciftlestir(cocuk* c1,cocuk* c2,cocuk* c3){
    int i;
    for(i=0;i<ORDERNUM;i++){
        if(i<ORDERNUM/2){
            c3->order[i]=c1->order[i];
        }
        else{
            c3->order[i]=c2->order[i];
        }
        if(rand()%MUTASYONSANSI==0){//
            c3->order[i]=(c3->order[i]+1)%3;
        }
    }
}
void cocuklariYap(cocuk atalar[CS],int havuz[HAVUZ]){
    int i,j=0;

    cocuk yeninesil[CS];
//    printf("Yeni nesil Olusturuluyor");
    int randomlar[CS*2];
    for(i=0;i<CS*4;i++){
        randomlar[i]=rand()%2048;
    }
    for(i=0;i<CS;i++){
//        printf("a1=%d,a2=%d\n",randomlar[i*2],randomlar[i*2+1]);
        if(atalar[havuz[randomlar[(i+j)*2]]].sagSol==atalar[havuz[randomlar[(i+j)*2+1]]].sagSol) {//Sag sola gore ayni taraftaysa ciftlestirir.
            ciftlestir(&atalar[havuz[randomlar[(i + j) * 2]]], &atalar[havuz[randomlar[(i + j) * 2 + 1]]],
                       &yeninesil[i]);
        }
        else{
            i--;
            j++;
        }
    }
    yeniNesilEslestir(atalar,yeninesil);
}
void havuzYazdir(int havuz[HAVUZ]){
    int i;
    for(i=0;i<HAVUZ;i++){
        printf("%d ",havuz[i]);
    }
    printf("\n");
}
void havuzOlustur(int havuz[HAVUZ]){
    int havuzBuyukluk = HAVUZ/4,i;
    int j=0;
    int baslangic=0;
    while(havuzBuyukluk>1){
        for(i=baslangic;i<baslangic+havuzBuyukluk;i++){
            havuz[i] = j;
        }
        baslangic=baslangic+havuzBuyukluk;
        j++;
        if(j%2==0){
            havuzBuyukluk= havuzBuyukluk/2;
        }

    }
}
void cocukAllAttributesYazdir(cocuk c[CS]){
    int i,j;
    for(i=0;i<CS;i++){
        printf("\n");
        printf("Order:");
        for (j=0; j<ORDERNUM; j++) {
            printf("%d,", c[i].order[j]);
        }
        printf("\n");
        printf("[x][y]=[%d][%d]", c[i].konum[0], c[i].konum[1]);
        printf("\n");
        printf("%d.Uzaklik=%d\n",i+1,c[i].uzaklik);
        printf("%d.cocuk sag sol=%d\n",i+1,c[i].sagSol);
        printf("\n");
    }
}
void sagSolAyir(cocuk c[CS],int xCoord){
    int i;
    for(i=0;i<CS;i++){
        if(c[i].konum[0]<xCoord){
            c[i].sagSol=0;
        }
        else{
            c[i].sagSol=1;
        }
    }

}
void swapChildren(cocuk* c1,cocuk* c2){
    int temp,i;
    temp=c1->uzaklik;
    c1->uzaklik=c2->uzaklik;
    c2->uzaklik=temp;
    temp=c1->sagSol;
    c1->sagSol=c2->sagSol;
    c2->sagSol=temp;
    for(i=0;i<ORDERNUM;i++){
        temp=c1->order[i];
        c1->order[i]=c2->order[i];
        c2->order[i]=temp;
    }
    for(i=0;i<2;i++){
        temp=c1->konum[i];
        c1->konum[i]=c2->konum[i];
        c2->konum[i]=temp;
    }
}
void uzaklikSirala(cocuk c[CS]){
    int i,j,enKucuk,enKucukPos,temp;
    //Uzakliklar sorting
    for(i=0;i<CS;i++){
        enKucuk=9999999;

        for(j=i;j<CS;j++){
            if(c[j].uzaklik<enKucuk){
                enKucuk=c[j].uzaklik;
                enKucukPos=j;
            }
        }
        swapChildren(&c[i],&c[enKucukPos]);
        enKucuk=9999999;
    }
}
void uzakliklariHesapla(cocuk c[CS], int xCoord){
    int x,y,i;
    for(i=0;i<CS;i++){
        x=c[i].konum[0];
        y=c[i].konum[1];
        c[i].uzaklik=abs(xCoord-x)*abs(xCoord-x)+abs(MB-y)*abs(MB-y);
        if(y==MB/2){
            c[i].uzaklik=c[i].uzaklik*2;
        }
    }
}
void cocuklarYurut(cocuk c[CS],int matris[MB][MB]){
    int i,j;
    for(j=0;j<CS;j++){
        for(i=0;i<ORDERNUM;i++){
        if(c[j].order[i]==1){
            if(matris[c[j].konum[1]][c[j].konum[0]+1]==-1){
            }
            else if(c[j].konum[1]+1==MB+1){
            }
            else{
                c[j].konum[1]++;
            }
        }
        if(c[j].order[i]==2){
            if(c[j].konum[0]+1==MB+1){
            }
            else{
                c[j].konum[0]++;
            }
        }
        if(c[j].order[i]==3){
            if(c[j].konum[0]==0){
            }
            else{
                c[j].konum[0]--;
            }
        }
    }
    }
}
void cocuklarBasaKoy(cocuk c[CS]){
    int i;
    for(i=0;i<CS;i++) {
        c[i].konum[1] = 0;
        c[i].konum[0] = MB / 2;
    }
}
void cocuklarRandomOrder(cocuk c[CS]){
    int i,j;
    for(j=0;j<CS;j++) {
        for (i = 0; i < ORDERNUM; i++){
            c[j].order[i] = rand() % 3 + 1;
        }
    }
};
int haritaOlustur(int matris[MB][MB]){//matris[y][x]
	int i,j,xCoord;
    printf("Haritada gidilecek yerin x koordinati: ");
    scanf("%d",&xCoord);
	for(i=0;i<MB;i++){
		for(j=0;j<MB;j++){
			matris[i][j]=0;
		}
	}
	for(i=MB/4;i<=3*MB/4;i++){
		matris[MB/2][i]=-1;
	}
	matris[MB-1][xCoord]=2;
    return xCoord;
}

void haritaYazdir(int matris[MB][MB]){
	int i,j;
	for(i=0;i<MB;i++){
		for(j=0;j<MB;j++){
			if(matris[i][j]==0){
				printf("* ");
			}
			if(matris[i][j]==1){
				printf("# ");
			}
			if(matris[i][j]==-1){
				printf("X ");
			}
			if(matris[i][j]==2){
				printf("$ ");
			}
		}
		printf("\n");
	}
}