PRAGMA foreign_keys = ON;
CREATE TABLE jurusan 
(
    kodejurusan varchar(4) primary key not null, 
    namajurusan varchar(100) not null
);
INSERT INTO jurusan VALUES ('J10','Informatika');
INSERT INTO jurusan VALUES ('J11','Psikologi');

CREATE TABLE mahasiswa 
(
    nim int primary key not null, 
    namamahasiswa varchar(100) not null, 
    alamat varchar(100) not null, 
    kodejurusan varchar(4) not null,
    ttl date not null, 
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan)
);
INSERT INTO mahasiswa VALUES(1001,'Andi','Bandung','J10', '2000-10-18');
INSERT INTO mahasiswa VALUES(1002,'Budi','Jakarta','J10', '2001-10-18');
INSERT INTO mahasiswa VALUES(1003,'Caca','Surabaya','J10', '2002-10-18');
INSERT INTO mahasiswa VALUES(1004,'Debora','Garut','J10', '2003-10-18');
INSERT INTO mahasiswa VALUES(1005,'Elis','Depok','J10', '2004-10-18');
INSERT INTO mahasiswa VALUES(1101,'Fira','Bogor','J11', '2000-10-18');
INSERT INTO mahasiswa VALUES(1102,'Gaga','Sukabumi','J11', '2001-10-18');
INSERT INTO mahasiswa VALUES(1103,'Hari','Cianjur','J11', '2002-10-18');
INSERT INTO mahasiswa VALUES(1104,'Inces','Malang','J11', '2003-10-18');
INSERT INTO mahasiswa VALUES(1105,'Jojo','Banten','J11', '2004-10-18');
INSERT INTO mahasiswa VALUES(1106,'Koko','Banten','J11', '2004-10-18');
INSERT INTO mahasiswa VALUES(1107,'Lulu','Banten','J11', '2004-10-18');


CREATE TABLE dosen 
(
    nip int primary key not null, 
    namadosen varchar(100) not null, 
    kodejurusan varchar(4) not null, 
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan)
);
INSERT INTO dosen VALUES (91001, 'Pak Asep', 'J10');
INSERT INTO dosen VALUES (91002, 'Pak Bambang', 'J10');
INSERT INTO dosen VALUES (91101, 'Bu Cheri', 'J11');
INSERT INTO dosen VALUES (91102, 'Bu Donna', 'J11');

CREATE TABLE matakuliah (
    kodematkul varchar(4) primary key not null, 
    namamatkul varchar(100) not null, 
    sks int not null, 
    kodejurusan varchar(4), 
    nip int not null, 
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan), 
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);
INSERT INTO matakuliah VALUES('M1001', 'Data Mining', 4, 'J10', 91001);
INSERT INTO matakuliah VALUES('M1002', 'Software Architecture', 4, 'J10', 91001);
INSERT INTO matakuliah VALUES('M1003', 'Artificial Intelligence', 4, 'J10', 91002);
INSERT INTO matakuliah VALUES('M1101', 'Psikologi Klinis', 4, 'J11', 91101);
INSERT INTO matakuliah VALUES('M1102', 'Psikologi Industri', 4, 'J11', 91101);
INSERT INTO matakuliah VALUES('M1103', 'Psikologi Pendidikan', 4, 'J11', 91102);

CREATE TABLE krs 
(
    kodematkul varchar(4) not null, 
    noabsen int not null,
    nim int not null, 
    nilai varchar(2) not null, 
    FOREIGN KEY (kodematkul) REFERENCES matakuliah (kodematkul), 
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim)
);
INSERT INTO krs VALUES('M1001', 1, 1001, 'A');
INSERT INTO krs VALUES('M1001', 2, 1002, 'B');
INSERT INTO krs VALUES('M1001', 3, 1003, 'C');
INSERT INTO krs VALUES('M1001', 4, 1004, 'D');
INSERT INTO krs VALUES('M1001', 5, 1005, 'E');
INSERT INTO krs VALUES('M1002', 1, 1001, 'A');
INSERT INTO krs VALUES('M1002', 2, 1002, 'B');
INSERT INTO krs VALUES('M1002', 3, 1003, 'C');
INSERT INTO krs VALUES('M1002', 4, 1004, 'D');
INSERT INTO krs VALUES('M1002', 5, 1005, 'E');
INSERT INTO krs VALUES('M1003', 1, 1001, 'A');
INSERT INTO krs VALUES('M1003', 2, 1002, 'B');
INSERT INTO krs VALUES('M1003', 3, 1003, 'C');
INSERT INTO krs VALUES('M1101', 1, 1101, 'D');
INSERT INTO krs VALUES('M1101', 2, 1102, 'E');
INSERT INTO krs VALUES('M1101', 3, 1103, 'A');
INSERT INTO krs VALUES('M1101', 4, 1104, 'B');
INSERT INTO krs VALUES('M1101', 5, 1105, 'C');
INSERT INTO krs VALUES('M1102', 1, 1101, 'D');
INSERT INTO krs VALUES('M1102', 2, 1102, 'E');
INSERT INTO krs VALUES('M1103', 1, 1101, 'A');
INSERT INTO krs VALUES('M1103', 2, 1102, 'B');
INSERT INTO krs VALUES('M1103', 2, 1106, 'B');
INSERT INTO krs VALUES('M1103', 2, 1107, 'B');
