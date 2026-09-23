// script.js

// DOM要素の取得
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const removeBtn = document.getElementById('removeBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

// 「変換する」ボタンの処理
removeBtn.addEventListener('click', () => {
    const text = inputText.value;
    
    if (text.trim() === "") {
        alert("テキストを入力してください。");
        return;
    }

    // 選択されているラジオボタンの値を取得
    const selectedOption = document.querySelector('input[name="replaceOption"]:checked').value;
    
    // 置換後の文字列を設定（removeなら空文字、spaceなら半角スペース）
    const replacement = selectedOption === 'space' ? ' ' : '';

    // 正規表現で改行（\n, \r\n, \r）を置換
    const resultText = text.replace(/\r?\n/g, replacement);
    
    outputText.value = resultText;
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
        copyMessage.classList.remove('hidden');
        
        setTimeout(() => {
            copyMessage.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('クリップボードへのコピーに失敗しました:', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    });
});
