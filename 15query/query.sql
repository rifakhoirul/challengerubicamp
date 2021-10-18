sqlite3 university.db

--, no 1
SELECT mahasiswa.nim, mahasiswa.namamahasiswa, mahasiswa.alamat, mahasiswa.ttl, jurusan.namajurusan  
FROM mahasiswa 
INNER JOIN jurusan ON mahasiswa.kodejurusan = jurusan.kodejurusan;

--, no 2
SELECT nim, namamahasiswa,
CASE
WHEN strftime('%m', date('now')) > strftime('%m', date(ttl)) THEN strftime('%Y', date('now')) - strftime('%Y', date(ttl))
WHEN strftime('%m', date('now')) = strftime('%m', date(ttl)) THEN 
    CASE
    WHEN strftime('%d', date('now')) >= strftime('%d', date(ttl)) THEN strftime('%Y', date('now')) - strftime('%Y', date(ttl))
    ELSE strftime('%Y', date('now')) - strftime('%Y', date(ttl)) -1
    END
WHEN strftime('%m', date('now')) < strftime('%m', date(ttl)) THEN strftime('%Y', date('now')) - strftime('%Y', date(ttl))-1
END AS 'umur'
FROM mahasiswa
WHERE umur < 20

--, no 3
SELECT krs.nim, mahasiswa.namamahasiswa, matakuliah.namamatkul, krs.nilai
FROM krs
INNER JOIN mahasiswa ON krs.nim = mahasiswa.nim 
INNER JOIN matakuliah ON krs.kodematkul = matakuliah.kodematkul
WHERE nilai = 'A' OR nilai = 'B'

--, no 4
SELECT krs.nim, mahasiswa.namamahasiswa, SUM(matakuliah.sks) AS totalsks
FROM krs
INNER JOIN mahasiswa ON krs.nim = mahasiswa.nim
INNER JOIN matakuliah ON krs.kodematkul = matakuliah.kodematkul
GROUP BY krs.nim, mahasiswa.namamahasiswa
HAVING totalsks > 10

--, no 5
SELECT krs.nim, mahasiswa.namamahasiswa, matakuliah.namamatkul
FROM krs
INNER JOIN mahasiswa ON krs.nim = mahasiswa.nim 
INNER JOIN matakuliah ON krs.kodematkul = matakuliah.kodematkul
WHERE matakuliah.namamatkul = 'Data Mining'

--, no 6
SELECT matakuliah.nip, dosen.namadosen, COUNT(krs.kodematkul) AS totalmahasiswa
FROM matakuliah
INNER JOIN dosen ON matakuliah.nip = dosen.nip
INNER JOIN krs ON matakuliah.kodematkul = krs.kodematkul
GROUP BY matakuliah.nip, dosen.namadosen

--, no 7
SELECT nim, namamahasiswa,
CASE
WHEN strftime('%m', date('now')) > strftime('%m', date(ttl)) THEN strftime('%Y', date('now')) - strftime('%Y', date(ttl))
WHEN strftime('%m', date('now')) = strftime('%m', date(ttl)) THEN 
    CASE
    WHEN strftime('%d', date('now')) >= strftime('%d', date(ttl)) THEN strftime('%Y', date('now')) - strftime('%Y', date(ttl))
    ELSE strftime('%Y', date('now')) - strftime('%Y', date(ttl)) -1
    END
WHEN strftime('%m', date('now')) < strftime('%m', date(ttl)) THEN strftime('%Y', date('now')) - strftime('%Y', date(ttl))-1
END AS 'umur'
FROM mahasiswa
ORDER BY umur ASC

--, no 8 using JOIN
SELECT krs.nim, mahasiswa.namamahasiswa, mahasiswa.alamat, mahasiswa.ttl, jurusan.namajurusan, jurusan.kodejurusan, matakuliah.namamatkul, matakuliah.kodematkul, krs.nilai, dosen.namadosen, dosen.nip
FROM krs
INNER JOIN mahasiswa ON krs.nim = mahasiswa.nim 
INNER JOIN matakuliah ON krs.kodematkul = matakuliah.kodematkul
INNER JOIN jurusan ON matakuliah.kodejurusan = jurusan.kodejurusan 
INNER JOIN dosen ON matakuliah.nip = dosen.nip
WHERE krs.nilai = 'D' OR krs.nilai = 'E'

--, no 8 using WHERE
SELECT krs.nim, mahasiswa.namamahasiswa, mahasiswa.alamat, mahasiswa.ttl, jurusan.namajurusan, jurusan.kodejurusan, matakuliah.namamatkul, matakuliah.kodematkul, krs.nilai, dosen.namadosen, dosen.nip
FROM krs, mahasiswa, matakuliah, jurusan, dosen
WHERE krs.nim = mahasiswa.nim 
    AND krs.kodematkul = matakuliah.kodematkul 
    AND matakuliah.kodejurusan = jurusan.kodejurusan 
    AND matakuliah.nip = dosen.nip 
    AND (krs.nilai = 'D' 
    OR krs.nilai = 'E') 