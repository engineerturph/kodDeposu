#include <stdio.h>
#define N 5000
int ilkCumleyeIkincisiniEkleme(char cumle[],char oburCumle[]);

int main(){
	char text[N];
	FILE *save; // creates a pointer to file
	save = fopen("soru.txt", "r+");// opens file with read+ permissions
	if (save == NULL) {
 	printf("Dosya açma hatasi!");
 	return 1;
 }
//	fgets(text, N-1, fp);
//	printf("%s",text);
	
//	float value = 0.0f;
//	fscanf(fp, "%f", &value);//reading contents of file
//	
//	printf("current value: %f\nvalue to add: ", value);
//	float add = 0.0f;
//	scanf("%f", &add);
//	
//	value+= add;
//	
//	// writing new value
//	fseek(fp,0,SEEK_SET);
//	fprintf(fp, "%f", value);// writing contents to file
//	fclose(fp);
//	return 0;
	
	
	// Texte yeni cumle ekleme(textteki bilgileri bu yuzden bitisik sekilde saklamak iyi olabilir)
	char eskiCumle[500],yeniCumle[500];
	gets(yeniCumle);
	fscanf(save, "%s", &eskiCumle);
	ilkCumleyeIkincisiniEkleme(eskiCumle,yeniCumle);
	fseek(save,0,SEEK_SET);
	fprintf(save, "%s", eskiCumle);
	printf("%s",eskiCumle);
	fclose(save);
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
