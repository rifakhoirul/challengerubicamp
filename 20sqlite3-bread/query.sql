CREATE TABLE bread
(
    id integer primary key autoincrement,
    stringdb text,
    integerdb integer,
    floatdb decimal,
    datedb date,
    booleandb varchar(5)
);

insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Adi', 1, 1.5, '2021-10-10', 'true');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Budi', 2, 2.5, '2021-10-11', 'false');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Caca', 3, 3.5, '2021-10-13', 'true');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Debora', 4, 4.5, '2021-10-12', 'false');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Elang', 1, 1.5, '2021-10-10', 'true');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Fira', 2, 2.5, '2021-10-11', 'false');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Gina', 3, 3.5, '2021-10-13', 'true');
insert into bread (stringdb, integerdb, floatdb, datedb, booleandb) values ( 'Hailey', 4, 4.5, '2021-10-12', 'false');