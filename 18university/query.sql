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
    FOREIGN KEY (kodejurusan) REFERENCES jurusan (kodejurusan)
);
INSERT INTO mahasiswa VALUES(1001,'Andi','Bandung','J10');
INSERT INTO mahasiswa VALUES(1002,'Budi','Jakarta','J10');
INSERT INTO mahasiswa VALUES(1003,'Caca','Surabaya','J10');
INSERT INTO mahasiswa VALUES(1004,'Debora','Garut','J10');
INSERT INTO mahasiswa VALUES(1005,'Elis','Depok','J10');
INSERT INTO mahasiswa VALUES(1101,'Fira','Bogor','J11');
INSERT INTO mahasiswa VALUES(1102,'Gaga','Sukabumi','J11');
INSERT INTO mahasiswa VALUES(1103,'Hari','Cianjur','J11');
INSERT INTO mahasiswa VALUES(1104,'Inces','Malang','J11');
INSERT INTO mahasiswa VALUES(1105,'Jojo','Banten','J11');

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
    idkrs integer primary key autoincrement,
    kodematkul varchar(4) not null, 
    nim int not null, 
    nilai varchar(2) not null, 
    FOREIGN KEY (kodematkul) REFERENCES matakuliah (kodematkul), 
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim)
);
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1001', 1001, 'A');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1001', 1002, 'B');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1001', 1003, 'C');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1001', 1004, 'D');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1001', 1005, 'E');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1002', 1001, 'A');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1002', 1002, 'B');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1002', 1003, 'C');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1002', 1004, 'D');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1002', 1005, 'E');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1003', 1001, 'A');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1003', 1002, 'B');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1003', 1003, 'C');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1101', 1101, 'D');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1101', 1102, 'E');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1101', 1103, 'A');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1101', 1104, 'B');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1101', 1105, 'C');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1102', 1101, 'D');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1102', 1102, 'E');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1103', 1101, 'A');
INSERT INTO krs(kodematkul,nim,nilai) VALUES('M1103', 1102, 'B');

CREATE TABLE userdata 
(
    id integer primary key autoincrement, 
    user text not null,
    pwd text not null,
    roles text not null
);
INSERT INTO userdata (user, pwd, roles) VALUES('riko','riko123','ADMIN');
INSERT INTO userdata (user, pwd, roles) VALUES('rubi','rubicamp','ADMIN');