# Mehmet Kader - Dijital Portfolyo

Bu proje React, Vite ve Tailwind CSS kullanılarak oluşturulmuştur. Ayrıca Google Gemini API kullanan bir yapay zeka asistanı (Asensio) içerir.

## Vercel'a Yükleme (Deployment) Adımları

1. Bu projeyi GitHub hesabınızda yeni bir repository oluşturup oraya yükleyin.
2. [Vercel](https://vercel.com) hesabınıza giriş yapın ve "Add New Project" diyerek GitHub'daki bu repository'i seçin.
3. Proje ayarlarında **Environment Variables (Çevre Değişkenleri)** bölümüne gelin.
4. Name kısmına `GEMINI_API_KEY`, Value kısmına ise kendi Google Gemini API anahtarınızı yapıştırın.
5. "Deploy" butonuna tıklayın.

**Önemli Not:** Yapay zeka asistanının çalışması için Gemini API anahtarının Vercel'da tanımlanmış olması zorunludur. Aksi takdirde asistan yanıt veremez.

## Geliştirme (Development)

Projeyi bilgisayarınızda çalıştırmak için:

```bash
npm install
npm run dev
```
