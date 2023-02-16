# Progetto Brew Day!

## Università degli studi Milano Bicocca

- Anno 2022/23
- Corso : Ingegneria Del Software (Dipartimento di Informatica U14)
- Docenti Prof. Riganelli e Prof. Arcelli

## Membri

- [Qazim Toska 847361](https://github.com/qazimtoska)
- [Francesco Refolli 865955](https://github.com/frefolli)
- [Alessandro Gilardi 866035](https://github.com/alegil0206)

## DevInf

### Production Build

`mvn clean package` dalla root del repository

### Frontend-only build

`mvn clean package` dalla cartella `frontend`

### Backend-only build

`mvn clean package` dalla cartella `backend`

### Build complete jar

`mvn clean package` dalla cartella root del progetto

### Warning

#### Applicativi Sprint 1,2,3
Per ragioni tecniche gli applicativi integrati compilati e presenti nei tag degli sprint 1,2,3 e' molto probabile che non funzionino a dovere per quanto concerne il visualizzare il frontend tramite l'engine statico di Spring Boot.
Questo e' dovuto al fatto che si e' deciso di utilizzare solo in seguito un MemoryRouter e una strategia full=on-memory per i link, per evitare che sia il server a dover eseguire il routing del frontend. A partire dallo sprint 4 questo errore e' stato corretto.
