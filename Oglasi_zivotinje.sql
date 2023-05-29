use master;
drop database if exists Oglasi_zivotinje;
go
create database Oglasi_zivotinje collate Croatian_CI_AS;
go
use Oglasi_zivotinje;

create table korisnik(
	sifra int not null primary key identity(1,1),
	uloga int,     -- moze biti admin, moderator, obican korisnik
	ime varchar(30) not null,
	prezime varchar(50) not null,
	email varchar(50) not null,
	lozinka varchar(30),  -- ne moraju se svi registrirati
	mobitel varchar(20),
	grad varchar(30),
	ip_adresa varchar(30),
	crna_lista bit
)

create table oglas(
	sifra int not null primary key identity(1,1),
	korisnik int,
	kategorija int not null,     -- poklanjam, trazim...
	datum_objave datetime not null,
	naslov varchar(50) not null,
	opis varchar(500) not null,
	vrsta_z varchar(30) not null,   -- vrsta zivotinje je obavezna za sve oglase, ostalo se trazi samo za "poklanjam"
	ime_z varchar(30),  -- ime zivotinje
	spol_z varchar(50),  -- muzjak, zenka, muzjak i zenka, 2 muzjaka...
	kastriran varchar(50),  -- moze npr. upisati da je muzjak kastriran, a zenka nije
	dob_z varchar(50),  -- 3 godine, 2 mjeseca i razne kombinacije
	fotografija bit,   -- ako korisnik nije prilozio fotografije, prikaze se neka univerzalna 
	aktivan bit    -- ako oglas nije aktivan, nece biti vidljiv drugim korisnicima
)

create table fotografija(
	sifra int not null primary key identity(1,1),
	oglas int,
	link varchar(100) not null
)

create table crna_lista(
	sifra int not null primary key identity(1,1),
	korisnik int,
	razlog varchar(500) not null,
	datum_blokiranja datetime not null
)


create table posalji_poruku(
	sifra int not null primary key identity(1,1),
	korisnik int,
	oglas int,
	ime_p varchar(50) not null,    -- posiljatelj obicno nije korisnik
	email_p varchar(50) not null,    -- zato mora dati svoj e-mail, da mu vlasnik oglasa moze odgovoriti
	datum_poruke datetime not null
)

alter table oglas add foreign key (korisnik) references korisnik(sifra);
alter table crna_lista add foreign key (korisnik) references korisnik(sifra);

alter table posalji_poruku add foreign key (korisnik) references korisnik(sifra);
alter table posalji_poruku add foreign key (oglas) references oglas(sifra);

alter table fotografija add foreign key (oglas) references oglas(sifra);

