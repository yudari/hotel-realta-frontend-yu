# Hotel Realta Backend

List nama username **Github** di Trello untuk diundang sebagai collaborator di project ini.

## Clone Project

Clone project ini dengan menggunakan perintah:

```bash
git clone https://github.com/juliansyahrifqi/hotel-realta-frontend.git
```

Setelah clone project ini, buka di VS Code.

## Instalasi dan Jalankan Project

```bash
npm install

npm run dev
```

## Buat Branch Baru

Setelah itu buat branch baru dengan perintah

```bash
git checkout -b  namamodule_namakamu
```

**Contoh**: `

```
git checkout -b payment_rustam
```

Buat kodingan untuk frontend kalian.

> Semua perubahan kode untuk masing-masing module di `commit` dan di `push` ke `branch` masing-masing (jangan ke `branch master`).
> Setelah itu kalau ada keperluan untuk menyatukan project bisa melakukan `pull request` atau menghubungi Tama atau yang lain.

---

## Aturan-aturan

### Penamaan

> **Jangan menggunakan nama yang kurang memberikan gambaran tentang variabel, nama method/function, isi file atau folder yang dikerjakan agar mudah dikenali atau dibaca oleh orang lain. Contoh:** `let terserah = 'terserah` atau `folderPunyaJajang`.

1. Penamaan variabel menggunakan bahasa inggris dan menggunakan format **camelCase**.
   Contoh: `const hotelName: string`

2. Penamaan method/function menggunakan bahasa inggris dan menggunakan format **camelCase**.
   Contoh: `const getAllUsers() {}`;

3. Penamaan folder menggunakan nama bahasa inggris dan menggunakan format **camelCase**.
   Contoh: `users` atau `humanResources`

4.

### Struktur Folder Models

1. Struktur folder untuk redux:

```
redux/
  ├── namaSchema (contoh: users)
    ├── action
      ├── actionType.ts
      ├── namaAction (contoh: userProfileActionReducer.ts)
    ├── namaSchemaSaga (contoh: usersSaga)
      ├── index.ts
      ├── namaSaga (contoh: userProfileSaga.ts)
    ├── reducer
      ├── namaReducer (contoh: userReducer)
  ├── saga
    ├── index.ts
  ├── store
    ├── index.ts
```

### Struktur Folder Api

```
api/
  ├── namaSchema (contoh: users)
    ├── namaApiMethod (contoh: apiMethodUsers)
```

### Struktur Folder Pages

Folder `pages` disesuaikan dengan url di mockup
Contoh: Mockup URL: /users/signpEmployee

Maka struktur foldernya adalah:

```
pages/
  ├── nama_module (contoh: users)
    ├── signupEmployee
```

### Penggunaan File .env

Untuk file `.env` bisa buat file dengan nama `.env` dan bisa copy isinya dari file `.env.example`
