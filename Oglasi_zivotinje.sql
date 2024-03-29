﻿
use master;
drop database if exists Oglasi_zivotinje;
go
create database Oglasi_zivotinje collate Croatian_CI_AS;
go
use Oglasi_zivotinje;

create table korisnik
(
	sifra int not null primary key identity(1,1),
	uloga int not null,     -- po defaultu 0 = obican korisnik, 1 = admin, 2 = moderator, 3 = blokiran
	ime varchar(30) not null,
	prezime varchar(50) not null,
	email varchar(50) not null,
	mobitel varchar(20),
	grad varchar(30)
)

create table oglas
(
	sifra int not null primary key identity(1,1),
	aktivan bit not null,   -- ako oglas nije aktivan, nece biti vidljiv drugim korisnicima
	korisnik int not null,  -- vanjski ključ, svaki oglas ima svog korisnika
	kategorija int not null,     -- 1 = poklanjam, 2 = trazim...
	datum_objave datetime not null,
	naslov varchar(50) not null,
	opis varchar(500) not null,
	vrsta_zivotinje varchar(30) not null,   -- vrsta zivotinje je obavezna za sve oglase, ostalo se trazi samo za "poklanjam"
	ime_zivotinje varchar(30),  -- ime zivotinje
	spol_zivotinje varchar(50),  -- muzjak, zenka, muzjak i zenka, 2 muzjaka...
	dob_zivotinje varchar(50),  -- 3 godine, 2 mjeseca i razne kombinacije
	kastriran varchar(50)  -- moze npr. upisati da je muzjak kastriran, a zenka nije
)


create table crna_lista
(
	sifra int not null primary key identity(1,1),
	korisnik int not null,     -- vanjski ključ, crna lista može imati više korisnika
	razlog_blokiranja varchar(500) not null,
	datum_blokiranja datetime not null
)

create table poruka
(
	sifra int not null primary key identity(1,1),
	oglas int not null,   -- vanjski ključ, jedan oglas može imati više poruka
	ime_posiljatelja varchar(50) not null,    -- posiljatelj obicno nije korisnik
	email_posiljatelja varchar(50) not null,    -- zato mora dati svoj e-mail, da mu vlasnik oglasa moze odgovoriti
	tekst_poruke varchar(500) not null,
	datum_poruke datetime not null
)

create table administrator
(
sifra int not null primary key identity(1,1),
email varchar(50) not null,
lozinka varchar(200) not null
);

alter table oglas add foreign key (korisnik) references korisnik(sifra);

alter table crna_lista add foreign key (korisnik) references korisnik(sifra);

alter table poruka add foreign key (oglas) references oglas(sifra);


insert into korisnik (uloga, ime, prezime, email, mobitel, grad)
values 
(1,'Sanja','Misić','miska@gmail.com','092 146 3753','Zaprešić'),
(1,'Jasna','Vidić','vidovita@gmail.com','091 543 6424','Osijek'),
(2,'Ana','Kristek','kiki@gmail.com','099 234 4422','Zagreb'),
(2,'Maja','Grgur','grga@gmail.com','095 632 7455','Sesvete'),
(0,'Ivana','Ban','iban@gmail.com','091 555 7654','Našice'),
(0,'Adriana','Pop','besposlenpop@gmail.com','098 323 7532','Tenja');




insert into oglas (aktivan, korisnik, kategorija, datum_objave, naslov, opis, vrsta_zivotinje, ime_zivotinje, spol_zivotinje, dob_zivotinje, kastriran)
values 
(1,3,1,'2023-03-20 12:50:44','Leona traži dom','Bivši vlasnici su ju napustili zbog odlaska u inozemstvo. Traži dobrog udomitelja.','kunić','Leona','ženka','oko 6 mjeseci','nije'),
(1,1,1,'2023-04-25 21:33:20','Dixie traži novi dom!','Bivši vlasnik ga je predao udruzi jer se djeca više ne žele brinuti za njega.','zamorčić','Dixie','mužjak','1 godinu','nije'),
(1,2,1,'2023-05-08 08:55:31','Mambo traži dom!','Mladi kunić nađen na parkingu u Osijeku, traži dobrog udomitelja.','kunić','Mambo','mužjak','oko 5 mjeseci','da'),
(1,6,2,'2023-05-23 12:42:15','Sheldon traži društvo!','Tražimo mužjaka kako Sheldon više ne bi bio sam. Ima 1 godinu.','zamorčić','dugodlaki','mužjak','do 1 godinu','nije važno'),
(1,5,2,'2023-06-08 17:12:37','Tražim činčilu!','Želim udomiti činčilu, po mogućnosti mladog mužjaka.','činčila','dugorepa','nije važno','do 2 godine','nije važno'),
(1,4,2,'2023-06-13 14:55:18','Želim udomiti hrčka','Želim udomiti bebu hrčka, po mogućnosti sirijskog, ali može i ruski.','hrčak','sirijski','nije važno','do 3 mjeseca','ne');


insert into poruka (oglas, ime_posiljatelja, email_posiljatelja, tekst_poruke, datum_poruke)
values
(1,'Tihana','tihana.hajsok@gmail.com','Može prijevoz do Osijeka?','2023-03-23 19:24:11'),
(2,'Goran','goran.kos@gmail.com','Javljam se za Dixija, tražim društvo mom Pixiju. Ima 4 mjeseca.','2023-04-27 11:32:27'),
(3,'Marina','marina.simlesa@gmail.com','Javljam se za Mamba, imam curu Lily kojoj tražim društvo. Iz Osijeka sam.','2023-05-10 21:09:31'),
(4,'Josipa','josipa.kovac@gmail.com','Pozdrav! Imam bebu mužjaka za pokloniti, star je oko 3 mjeseca.','2023-05-25 14:21:03'),
(5,'Mirela','mirela.loncar@gmail.com','Pozdrav! Ako još niste udomili, imam mladu ženkicu, staru oko 6 mjeseci.','2023-06-15 18:05:34');


insert into crna_lista (korisnik, razlog_blokiranja, datum_blokiranja)
values
(5, 'uzgajivač', '2023-07-20 12:50:44'),
(6, 'skupljač', '2023-09-20 12:50:44');


insert into administrator (email, lozinka)
values 
('tjakopec@gmail.com', '$2a$13$JpDMSmBb5sbGnwDOnsacceDwXBBDDJTZ4bsXlO7DA9sHbIXziu76G'),
('oglasi@mrkvica.hr', '$2a$12$7iBdM1OQW5OCnFjtGduwMOZ74RvUpksxurRq.HIeIdeh40e183De.');