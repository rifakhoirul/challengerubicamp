create table mahasiswa (nim varchar(4) primary key not null, namamahasiswa varchar(100) not null, alamat varchar(100) not null, kode jurusan varchar(4) not null);
insert into mahasiswa values('1001','Andi','Bandung','K10');
insert into mahasiswa values('1002','Budi','Jakarta','K10');
create table jurusan (kode jurusan varchar(4) primary key not null, namajurusan varchar(100) not null);\
insert into jurusan values ('K10','Psikologi');
create table dosen (nip varchar(4) primary key not null, namadosen varchar(100) not null, kode jurusan varchar(4) not null, kodematkul varchar(4) not null);
insert into dosen ('1101', 'Asep', 'K10', 'P01');
insert into dosen ('1102', 'Bambang', 'K10', 'P02');
create table matakuliah (kode matkul varchar(4) not null, nama matkul varchar(100) not null, sks int not null, kode jurusan varchar(4), nip varchar(4) not null);
insert into matakuliah values('P01', 'Pengantar Psikologi', 2, 'K10', '11001');
insert into matakuliah values('P02', 'Psikologi Umum', 2, 'K10', '11002');
create table krs (kode matkul varchar(4) primary key not null, no absen int not null, nim varchar(4) not null, nilai int not null);
insert into krs values('P01', 1, '1001', 80);
insert into krs values('P01', 2, '1002', 90);
insert into krs values('P02', 1, '1001', 85);
insert into krs values('P02', 2, '1002', 95);