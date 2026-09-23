// script.js

// DOM要素の取得
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const removeBtn = document.getElementById('removeBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

// 「改行を削除する」ボタンの処理
removeBtn.addEventListener('click', () => {
    const text = inputText.value;
    
    if (text.trim() === "") {
        alert("テキストを入力してください。");
        return;
    }

    // 正規表現で改行（\n, \r\n, \r）をすべて空文字に置換
    const removedText = text.replace(/\r?\n/g, '');
    
    outputText.value = removedText;
});

// 「クリア」ボタンの処理
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    copyMessage.classList.add('hidden');
});

// 「コピーする」ボタンの処理
copyBtn.addEventListener('click', () => {
    const textToCopy = outputText.value;
    
    if (textToCopy === "") {
        alert("コピーする結果がありません。");
        return;
    }

    // クリップボードAPIを使用してコピー
    navigator.clipboard.writeText(textToCopy).then(() => {
        // コピー成功時のメッセージ表示
        copyMessage.classList.remove('hidden');
        
        // 2秒後にメッセージを非表示にする
        setTimeout(() => {
            copyMessage.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('クリップボードへのコピーに失敗しました:', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    });
});