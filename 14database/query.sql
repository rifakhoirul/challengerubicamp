PRAGMA foreign_keys = ON;
CREATE TABLE jurusan 
(
    kodejurusan varchar(4) primary key not null, 
    namajurusan varchar(100) not null
);
INSERT INTO jurusan VALUES ('J10','Psikologi');

CREATE TABLE mahasiswa 
(
    nim int primary key not null, 
    namamahasiswa varchar(100) not null, 
    alamat varchar(100) not null, 
    kodejurusan varchar(4) not null, 
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan)
);
INSERT INTO mahasiswa VALUES(1001,'Andi','Bandung','J10');
INSERT INTO mahasiswa VALUES(1002,'Budi','Jakarta','J10');

CREATE TABLE dosen 
(
    nip int primary key not null, 
    namadosen varchar(100) not null, 
    kodejurusan varchar(4) not null, 
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan)
);
INSERT INTO dosen VALUES (1101, 'Asep', 'J10');
INSERT INTO dosen VALUES (1102, 'Bambang', 'J10');

CREATE TABLE matakuliah (
    kodematkul varchar(4) primary key not null, 
    namamatkul varchar(100) not null, 
    sks int not null, 
    kodejurusan varchar(4), 
    nip int not null, 
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan), 
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);
INSERT INTO matakuliah VALUES('P01', 'Pengantar Psikologi', 2, 'J10', 11001);
INSERT INTO matakuliah VALUES('P02', 'Psikologi Umum', 2, 'J10', 11002);

CREATE TABLE krs 
(
    kodematkul varchar(4) not null, 
    noabsen int not null,
    nim int not null, 
    nilai int not null, 
    FOREIGN KEY (kodematkul) REFERENCES matakuliah (kodematkul), 
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim)
);
INSERT INTO krs VALUES('P01', 1, 1001, 80);
INSERT INTO krs VALUES('P01', 2, 1002, 90);
INSERT INTO krs VALUES('P02', 1, 1001, 85);
INSERT INTO krs VALUES('P02', 2, 1002, 95);