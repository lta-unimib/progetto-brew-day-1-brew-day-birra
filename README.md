# Progetto Brew Day!

## Università degli studi Milano Bicocca

- Anno 2022/23
- Corso : Ingegneria Del Software (Dipartimento di Informatica U14)
- Docenti Prof. Riganelli e Prof. Arcelli

## Membri

- [Qazim Toska 847361](https://github.com/qazimtoska)
- [Francesco Refolli 865955](https://github.com/frefolli)
- [Alessandro Gilardi 866035](https://github.com/alegil0206)

## Istruzioni di Sviluppo per ambienti POSIX (path con "/" invece di "\")

### Production build

`mvn clean package` dalla root del repository

### Production serve

Dopo aver compilato l'applicativo integrato, eseguire `java -jar backend/target/backend-1.0.0.jar` dalla root del repository

### Frontend-only build

`mvn clean package` o `npm run build` dalla cartella `frontend`

### Frontend-only serve

`npm run build` e poi `serve -s build` (se si ha eseguito in precedenza `npm install serve --global`) o `npm start` dalla cartella `frontend`

### Backend-only build

`mvn clean package` dalla cartella `backend`

Inserire il compilato del frontend nei file statici del backend avra' come effetto la creazione della Production Build.

### Backend-only serve

O usando Eclipse si avvia il progetto come Java Application, o si compila il progetto e poi si esegue il jar:

`mvn clean package` e poi `java -jar target/backend-1.0.0.jar` dalla cartella `backend`

## Warning

### Applicativi Sprint 1,2,3
Per ragioni tecniche gli applicativi integrati compilati e presenti nei tag degli sprint 1,2,3 e' molto probabile che non funzionino a dovere per quanto concerne il visualizzare il frontend tramite l'engine statico di Spring Boot.
Questo e' dovuto al fatto che si e' deciso di utilizzare solo in seguito un MemoryRouter e una strategia full=on-memory per i link, per evitare che sia il server a dover eseguire il routing del frontend. A partire dallo sprint 4 questo errore e' stato corretto.
