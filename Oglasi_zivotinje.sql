use master;
drop database if exists Oglasi_zivotinje;
go
create database Oglasi_zivotinje collate Croatian_CI_AS;
go
use Oglasi_zivotinje;

create table korisnik(
	sifra int not null primary key identity(1,1),
	uloga int not null,     -- po defaultu 0 = obican korisnik, 1 = admin, 2 = moderator, 3 = blokiran
	ime varchar(30) not null,
	prezime varchar(50) not null,
	email varchar(50) not null,
	lozinka varchar(30),  -- ne moraju se svi registrirati i imati lozinku
	mobitel varchar(20),
	grad varchar(30)
)

create table oglas(
	sifra int not null primary key identity(1,1),
	aktivan bit not null,   -- ako oglas nije aktivan, nece biti vidljiv drugim korisnicima
	korisnik int not null,  -- vanjski ključ, svaki oglas ima svog korisnika
	kategorija int not null,     -- 1 = poklanjam, 2 = trazim...
	datum_objave datetime not null,
	naslov varchar(50) not null,
	opis varchar(500) not null,
	vrsta_z varchar(30) not null,   -- vrsta zivotinje je obavezna za sve oglase, ostalo se trazi samo za "poklanjam"
	ime_z varchar(30),  -- ime zivotinje
	spol_z varchar(50),  -- muzjak, zenka, muzjak i zenka, 2 muzjaka...
	kastriran varchar(50),  -- moze npr. upisati da je muzjak kastriran, a zenka nije
	dob_z varchar(50),  -- 3 godine, 2 mjeseca i razne kombinacije
	
)

create table fotografija(
	sifra int not null primary key identity(1,1),
	oglas int not null,    -- vanjski ključ, jedan oglas može imati više fotografija
	naziv varchar(50) not null,
	link varchar(100) not null
)

create table crna_lista(
	sifra int not null primary key identity(1,1),
	korisnik int not null,   -- vanjski ključ, na listi se može nalaziti više korisnika
	razlog varchar(500) not null,
	datum_blokiranja datetime not null
)


create table poruka(
	sifra int not null primary key identity(1,1),
	oglas int not null,   -- vanjski ključ, jedan oglas može imati više poruka
	ime_p varchar(50) not null,    -- posiljatelj obicno nije korisnik
	email_p varchar(50) not null,    -- zato mora dati svoj e-mail, da mu vlasnik oglasa moze odgovoriti
	tekst_p varchar(500) not null,
	datum_poruke datetime not null
)

alter table oglas add foreign key (korisnik) references korisnik(sifra);
alter table crna_lista add foreign key (korisnik) references korisnik(sifra);

alter table poruka add foreign key (oglas) references oglas(sifra);

alter table fotografija add foreign key (oglas) references oglas(sifra);

insert into korisnik (uloga, ime, prezime, email, lozinka, mobitel, grad)
values 
(1,'Sanja','Habuš','shabus@gmail.com','Zoki123','092 146 3753','Zaprešić'),
(1,'Jasenka','Augustinović','jaugustinovic@gmail.com','Bruno123','091 543 6424','Osijek'),
(2,'Ana','Marasović','amarasovic@gmail.com','Ivan123','099 234 4422','Zagreb'),
(2,'Maja','Grgić','mgrgic@gmail.com','Josip123','095 632 7455','Sesvete'),
(0,'Ivana','Banić','ibanic@gmail.com',null,'091 555 7654','Našice'),
(0,'Adriana','Popović','apopovic@gmail.com',null,'098 323 7532','Tenja');




insert into oglas (aktivan, korisnik, kategorija, datum_objave, naslov, opis, vrsta_z, ime_z, spol_z, kastriran, dob_z)
values 
(1,3,1,'2023-03-20 12:50:44','Leona traži dom','Bivši vlasnici su ju napustili zbog odlaska u inozemstvo. Traži dobrog udomitelja.','kunić','Leona','ženka','nije','oko 6 mjeseci'),
(1,1,1,'2023-04-25 21:33:20','Dixie traži novi dom!','Bivši vlasnik ga je predao udruzi jer se djeca više ne žele brinuti za njega.','zamorčić','Dixie','mužjak','nije','1 godinu'),
(1,2,1,'2023-05-08 08:55:31','Mambo traži dom!','Mladi kunić nađen na parkingu u Osijeku, traži dobrog udomitelja.','kunić','Mambo','mužjak','da','oko 5 mjeseci'),
(1,6,2,'2023-05-23 12:42:15','Sheldon traži društvo!','Tražimo mužjaka kako Miki više ne bi bio sam. Ima 1 godinu.','zamorčić','dugodlaki','mužjak','nije važno','do 1 godinu'),
(1,5,2,'2023-06-08 17:12:37','Tražim činčilu!','Želim udomiti činčilu, po mogućnosti mladog mužjaka.','činčila','dugorepa','nije važno','nije važno','do 1 godinu'),
(1,6,2,'2023-06-13 14:55:18','Želim udomiti hrčka','Želim udomiti bebu hrčka, po mogućnosti sirijskog, ali može i ruski ili roborovski.','hrčak','sirijski','nije važno','ne','do 3 mjeseca');


insert into fotografija (oglas, naziv, link)
values
(1,'Leona','https://i.postimg.cc/N0zqmfMj/Leona.jpg'),
(2,'Dixie','https://i.postimg.cc/mrRGB6nT/Dixie.jpg'),
(3,'Mambo','https://i.postimg.cc/dtvX7TB9/Mambo.jpg');


insert into poruka (oglas, ime_p, email_p, tekst_p, datum_poruke)
values
(1,'Tihana','tihana.hajsok@gmail.com','Može prijevoz do Osijeka?','2023-03-23 19:24:11'),
(2,'Goran','goran.kos@gmail.com','Javljam se za Dixija, tražim društvo mom Pixiju. Ima 4 mjeseca.','2023-04-27 11:32:27'),
(3,'Marina','marina.simlesa@gmail.com','Javljam se za Mamba, imam curu Lily kojoj tražim društvo. Iz Osijeka sam.','2023-05-10 21:09:31'),
(4,'Josipa','josipa.kovac@gmail.com','Pozdrav! Imam bebu mužjaka za pokloniti, star je oko 3 mjeseca.','2023-05-25 14:21:03'),
(5,'Mirela','mirela.loncar@gmail.com','Pozdrav! Ako još niste udomili, imam mladu ženkicu, staru oko 6 mjeseci.','2023-06-15 18:05:34');