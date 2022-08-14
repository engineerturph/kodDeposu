#include<stdio.h>
#include<windows.h>
#include<MMsystem.h>
#include<time.h>
int main(){
	PlaySound(TEXT("\music.wav"),NULL,SND_ASYNC);
	while(1){
		printf("Oyun");
		Sleep(1000);
	}
	return 0;
}
