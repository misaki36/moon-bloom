// JSがHTMLにつながったかを確認するための1行（確認できたら、あとで消す）
console.log("JSが読み込まれました");

// ===== アコーディオン（押すと開く・閉じる）=====

// ① 開閉ボタンを全部集める。
//    aria-controls を持つボタン＝お試し・お問い合わせ・FAQの質問（合計6つ）
const triggers = document.querySelectorAll("button[aria-controls]");

// ② 集めたボタンを1つずつ取り出して、「押されたときの動き」を登録する
triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        // 開く箱のid。aria-controls に書いてある名前を取り出す
        const panelId = trigger.getAttribute("aria-controls");
        // そのidを持つ箱（HTMLの要素）を探す
        const panel = document.getElementById(panelId);

        // いま開いているか？ aria-expanded が "true" なら開いている
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        // ボタンの aria-expanded を、反対の状態に切り替える
        trigger.setAttribute("aria-expanded", String(!isOpen));
        // 箱の hidden を切り替える。開いていた→閉じる(hidden=true)、閉じていた→開く(hidden=false)
        panel.hidden = isOpen;

        // 質問ボタンの中にある「＋」マークを探す。
        // お試し・お問い合わせのボタンには無いので、そのときは何も見つからない（null になる）
        const icon = trigger.querySelector(".faq-icon");

        // 「＋」マークがあるボタンだけ、開いたら「－」、閉じたら「＋」に書き換える
        if (icon) {
            icon.textContent = isOpen ? "＋" : "－";
        }
    });
});

// ===== フォームの送信（お試し・お問い合わせ共通）=====

// ページの中の form を全部集める（申し込みフォームと、お問い合わせフォームの2つ）
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
    // 「送信ボタンが押された」ときの動きを登録する
    form.addEventListener("submit", (event) => {
        // 本来の送信（ページの再読み込み）を止める
        event.preventDefault();

        // 前に出したメッセージが残っていたら、先に消す（何回も押されても1つだけにするため）
        const oldMessage = form.querySelector(".form-message");
        if (oldMessage) {
            oldMessage.remove();
        }

        // お礼のメッセージ用の <p> タグを、JSで新しく作る
        const message = document.createElement("p");
        message.className = "form-message";
        // 読み上げソフトに「メッセージが出ました」と伝える目印
        message.setAttribute("role", "status");
        // 文字は textContent で入れる（HTMLとしては読ませない＝安全）
        message.textContent = "送信ありがとうございました。（デモサイトのため、実際には送信されません）";

        // フォームの一番下にメッセージを足す
        form.append(message);

        // 入力欄を空にする
        form.reset();
    });
});