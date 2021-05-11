
class AngajatIT{
    //Proprietati
    constructor(CNP, nume, prenume, vechime, departament){
        this.CNP = CNP;
        this.nume = nume;
        this.prenume = prenume;
        this.vechime= vechime;
        this.departament = departament;
    }

    //Metode
    afiseazaVarsta(){
        console.log("am 22 de ani ")
    }
    afiseazaAnulAngajarii(){
        console.log("sunt angajata din  2021")
    }
    lucreaza(){
        console.log("Neimplementat!")
    }
}

class QA extends AngajatIT{
    lucreaza(){
        console.log("testeaza software")
    }
}

class Developer extends AngajatIT{
    lucreaza(){
        console.log("scrie cod")
    }
}

const AngajatIT_1 = new AngajatIT("Cristina");
AngajatIT_1.afiseazaVarsta();
AngajatIT_1.afiseazaAnulAngajarii();
AngajatIT_1.lucreaza();

var i;
for(i=0; i<=10; i++)
{
    console.log("Numerele sunt ", i*15+i);
}
//sau
const arr=[0,1,2,3,4,5,6,7,8,9,10];
const [a,b,c, ...rest] = arr;
console.log(a*15+a, b*15+b, c*15+c);

var i;
for(i=0; i<=10; i++)
{
    console.log(i, " este inlocuit de ", i*11);
}
//sau
const array=[0,1,2,3,4,5,6,7,8,9,10];
const [d,e,f, ...rest1] = array;
console.log(d*11, e*11, f*11);
