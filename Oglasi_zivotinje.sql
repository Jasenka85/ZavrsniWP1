use master;
drop database if exists Oglasi_zivotinje;
go
create database Oglasi_zivotinje collate Croatian_CI_AS;
go
use Oglasi_zivotinje;

create table korisnik(
	sifra int not null primary key identity(1,1),
	uloga int not null,     -- 1 = admin, 2 = moderator, 3 = obican korisnik, moze se dodati jos
	ime varchar(30) not null,
	prezime varchar(50) not null,
	email varchar(50) not null,
	lozinka varchar(30),  -- ne moraju se svi registrirati
	mobitel varchar(20),
	grad varchar(30),
	ip_adresa varchar(30),
	crna_lista bit not null
)

create table oglas(
	sifra int not null primary key identity(1,1),
	korisnik int not null,
	kategorija int not null,     -- 1 = poklanjam, 2 = trazim...
	datum_objave datetime not null,
	naslov varchar(50) not null,
	opis varchar(500) not null,
	vrsta_z varchar(30) not null,   -- vrsta zivotinje je obavezna za sve oglase, ostalo se trazi samo za "poklanjam"
	ime_z varchar(30),  -- ime zivotinje
	spol_z varchar(50),  -- muzjak, zenka, muzjak i zenka, 2 muzjaka...
	kastriran varchar(50),  -- moze npr. upisati da je muzjak kastriran, a zenka nije
	dob_z varchar(50),  -- 3 godine, 2 mjeseca i razne kombinacije
	fotografija bit not null,   -- ako korisnik nije prilozio fotografije, prikaze se neka univerzalna 
	aktivan bit not null   -- ako oglas nije aktivan, nece biti vidljiv drugim korisnicima
)

create table fotografija(
	sifra int not null primary key identity(1,1),
	oglas int not null,
	link varchar(100) not null
)

create table crna_lista(
	sifra int not null primary key identity(1,1),
	korisnik int not null,
	razlog varchar(500) not null,
	datum_blokiranja datetime not null
)


create table posalji_poruku(
	sifra int not null primary key identity(1,1),
	korisnik int not null,
	oglas int not null,
	ime_p varchar(50) not null,    -- posiljatelj obicno nije korisnik
	email_p varchar(50) not null,    -- zato mora dati svoj e-mail, da mu vlasnik oglasa moze odgovoriti
	datum_poruke datetime not null
)

alter table oglas add foreign key (korisnik) references korisnik(sifra);
alter table crna_lista add foreign key (korisnik) references korisnik(sifra);

alter table posalji_poruku add foreign key (korisnik) references korisnik(sifra);
alter table posalji_poruku add foreign key (oglas) references oglas(sifra);

alter table fotografija add foreign key (oglas) references oglas(sifra);

insert into korisnik (uloga, ime, prezime, email, lozinka, mobitel, grad, ip_adresa, crna_lista)
values 
(1,'Jasenka','Augustinovic','jaugustinovic@gmail.com','crvenkapica123','091555666','Osijek',null,0),
(2,'Sanja','Habus','shabus@gmail.com','snjeguljica123','098444333','Zapresic',null,0),
(2,'Ana','Marasovic','amarasovic@gmail.com','trnoruzica555','091888666','Zagreb',null,0),
(2,'Maja','Kuzelj','mkuzelj@gmail.com','ivicaimarica888','091666777','Zagreb',null,0),
(3,'Adriana','Bosnjak','abosnjak@gmail.com','pepeljuga123','098555222','Osijek',null,0),
(3,'Kristina','Jerkovic','kjerkovic@gmail.com','petarpan111','095333111','Slavonski Brod',null,0),
(3,'Zoran','Mackic','zmackic@gmail.com','batman555','099111444','Zapresic',null,0);



insert into oglas (korisnik, kategorija, datum_objave, naslov, opis, vrsta_z, ime_z, spol_z, kastriran, dob_z, fotografija, aktivan)
values 
(3, 1,'2021-08-11 14:50:44','Fifi traži dom','Patuljasta, stara oko 2 godine, jako pitoma i mazna. Sin jako alergičan na dlaku i moramo ju pokloniti.','kunić','Fifi','ženka',1,'oko 2 godine',1,1),
(4, 1,'2021-11-15 21:33:20','Greta traži dom','Zamorčica stara oko 3 mjeseca, udomljava se isključivo kao društvo drugom zamorčiću, nikako sama.','zamorčić','Greta','ženka',0,'oko 3 mjeseca',1,1),
(5, 1,'2022-02-16 08:55:31','Albert traži dom','Kunić srednjeg rasta, jako pitom i drag. Nađen na parkingu u Osijeku.','kunić','Albert','mužjak',1,'oko 1 godinu',1,1),
(6, 2,'2022-07-06 12:42:15','Tražim muškog zamorčića','Moj Miško je ostao sam i hitno mu tražim društvo.','zamorčić',null,'mužjak',null,'po mogućnosti beba',0,1);


insert into fotografija (oglas, link)
values
(1, 'https://i.postimg.cc/W3dVHqKZ/Ivancica.jpg'),
(3, 'https://i.postimg.cc/MGDJTmkV/David.jpg');