const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');

const app = express();
const port = 1994;

// ログファイルに書き込み
fs.appendFileSync('log.txt', 'Server is starting...\n');

// デバッグ用のメッセージ
console.log("Starting server...");
fs.appendFileSync('log.txt', 'Starting server...\n');

// ルートエンドポイント
app.get('/', (req, res) => {
    res.send('QRコード生成サービスへようこそ！ URLに "/generate?text=文字列" を追加してQRコードを生成してください。');
});

// QRコード生成エンドポイント
app.get('/generate', (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).send('QRコードに変換する文字列を指定してください。例: /generate?text=HelloWorld');
    }

    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            return res.status(500).send('QRコードの生成中にエラーが発生しました。');
        }

        // QRコード画像をHTMLに埋め込んで返す
        res.send(`<h1>QRコード</h1><img src="${url}" alt="QR Code"><p>${text}</p>`);
    });
});

app.listen(port, () => {
    console.log(`サーバーが http://localhost:${port} で起動しました`);
    fs.appendFileSync('log.txt', `サーバーが http://localhost:${port} で起動しました\n`);
});
