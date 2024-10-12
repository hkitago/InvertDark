function show(platform, enabled, useSettingsInsteadOfPreferences) {
  // Localization
  const labelStrings = {
    "ar": {
      "iOS": "يمكنك تفعيل إضافة عكسالظلام على Safari من الإعدادات.",
      "macOn": "إضافة عكسالظلام مفعل حاليًا. يمكنك إيقاف تشغيله في قسم الإضافات في إعدادات Safari.",
      "macOff": "إضافة عكسالظلام غير مفعلة حاليًا. يمكنك تشغيلها في قسم الإضافات في إعدادات Safari.",
      "macUnknown": "يمكنك تفعيل إضافة عكسالظلام في قسم الإضافات في إعدادات Safari.",
      "macPreferences": "قم بالخروج وفتح إعدادات Safari…"
    },
    "ar-SA": {
      "iOS": "يمكنك تفعيل إضافة عكسالظلام على Safari من الإعدادات.",
      "macOn": "إضافة عكسالظلام مفعل حاليًا. يمكنك إيقاف تشغيله من قسم الإضافات في إعدادات Safari.",
      "macOff": "إضافة عكسالظلام غير مفعلة حاليًا. يمكنك تفعيلها من قسم الإضافات في إعدادات Safari.",
      "macUnknown": "يمكنك تفعيل إضافة عكسالظلام في قسم الإضافات ضمن إعدادات Safari.",
      "macPreferences": "خروج وفتح إعدادات Safari…"
    },
    "de": {
      "iOS": "Sie können die InvertDunkel Safari-Erweiterung in den Einstellungen aktivieren.",
      "macOn": "Die InvertDunkel-Erweiterung ist derzeit aktiviert. Sie können sie im Abschnitt Erweiterungen der Safari-Einstellungen deaktivieren.",
      "macOff": "Die InvertDunkel-Erweiterung ist derzeit deaktiviert. Sie können sie im Abschnitt Erweiterungen der Safari-Einstellungen aktivieren.",
      "macUnknown": "Sie können die InvertDunkel-Erweiterung im Abschnitt Erweiterungen der Safari-Einstellungen aktivieren.",
      "macPreferences": "Beenden und Safari-Einstellungen öffnen…"
    },
    "en": {
      "iOS": "You can turn on InvertDark’s Safari extension in Settings.",
      "macOn": "InvertDark’s extension is currently on. You can turn it off in the Extensions section of Safari Settings.",
      "macOff": "InvertDark’s extension is currently off. You can turn it on in the Extensions section of Safari Settings.",
      "macUnknown": "You can turn on InvertDark’s extension in the Extensions section of Safari Settings.",
      "macPreferences": "Quit and Open Safari Settings…"
    },
    "es": {
      "iOS": "Puedes activar la extensión Safari de InvertirOscuro en la Configuración.",
      "macOn": "La extensión de InvertirOscuro está actualmente activada. Puedes desactivarla en la sección de Extensiones de la Configuración de Safari.",
      "macOff": "La extensión de InvertirOscuro está actualmente desactivada. Puedes activarla en la sección de Extensiones de la Configuración de Safari.",
      "macUnknown": "Puedes activar la extensión Safari de InvertirOscuro en la sección de Extensiones de la Configuración de Safari.",
      "macPreferences": "Salir y abrir la Configuración de Safari…"
    },
    "es-MX": {
      "iOS": "Puedes activar la extensión Safari de InvertirOscuro en la Configuración.",
      "macOn": "La extensión de InvertirOscuro está activada. Puedes desactivarla en la sección de Extensiones de la Configuración de Safari.",
      "macOff": "La extensión de InvertirOscuro está desactivada. Puedes activarla en la sección de Extensiones de la Configuración de Safari.",
      "macUnknown": "Puedes activar la extensión Safari de InvertirOscuro en la sección de Extensiones de la Configuración de Safari.",
      "macPreferences": "Salir y abrir la Configuración de Safari…"
    },
    "fr": {
      "iOS": "Vous pouvez activer l'extension Safari de InvertSombre dans les Réglages.",
      "macOn": "L'extension InvertSombre est actuellement activée. Vous pouvez la désactiver dans la section Extensions des Réglages Safari.",
      "macOff": "L'extension InvertSombre est actuellement désactivée. Vous pouvez l'activer dans la section Extensions des Réglages Safari.",
      "macUnknown": "Vous pouvez activer l'extension InvertSombre dans la section Extensions des Réglages Safari.",
      "macPreferences": "Quittez et ouvrez les Réglages Safari…"
    },
    "hi": {
      "iOS": "आप सेटिंग्स में उल्टाअंधेरा की Safari एक्सटेंशन को चालू कर सकते हैं।",
      "macOn": "उल्टाअंधेरा का एक्सटेंशन वर्तमान में चालू है। आप इसे Safari सेटिंग्स के एक्सटेंशन सेक्शन में बंद कर सकते हैं।",
      "macOff": "उल्टाअंधेरा का एक्सटेंशन वर्तमान में बंद है। आप इसे Safari सेटिंग्स के एक्सटेंशन सेक्शन में चालू कर सकते हैं।",
      "macUnknown": "आप Safari सेटिंग्स के एक्सटेंशन सेक्शन में उल्टाअंधेरा का एक्सटेंशन चालू कर सकते हैं।",
      "macPreferences": "बाहर निकलें और Safari सेटिंग्स खोलें…"
    },
    "id": {
      "iOS": "Anda dapat mengaktifkan ekstensi Safari InvertGelap di Pengaturan.",
      "macOn": "Ekstensi InvertGelap saat ini aktif. Anda dapat mematikannya di bagian Ekstensi di Pengaturan Safari.",
      "macOff": "Ekstensi InvertGelap saat ini nonaktif. Anda dapat mengaktifkannya di bagian Ekstensi di Pengaturan Safari.",
      "macUnknown": "Anda dapat mengaktifkan ekstensi InvertGelap di bagian Ekstensi di Pengaturan Safari.",
      "macPreferences": "Keluar dan Buka Pengaturan Safari…"
    },
    "ja": {
      "iOS": "設定で反転ダークモードのSafari拡張機能を有効にすることができます。",
      "macOn": "反転ダークモードの拡張機能は現在オンになっています。Safariの設定の拡張機能セクションでオフにすることができます。",
      "macOff": "反転ダークモードの拡張機能は現在オフになっています。Safariの設定の拡張機能セクションでオンにすることができます。",
      "macUnknown": "Safariの設定の拡張機能セクションで反転ダークモードの拡張機能をオンにすることができます。",
      "macPreferences": "終了してSafari設定を開く…"
    },
    "ko-KR": {
      "iOS": "설정에서 인버트다크의 Safari 확장을 활성화할 수 있습니다.",
      "macOn": "현재 인버트다크 확장이 활성화되어 있습니다. Safari 설정의 확장 프로그램 섹션에서 비활성화할 수 있습니다.",
      "macOff": "현재 인버트다크 확장이 비활성화되어 있습니다. Safari 설정의 확장 프로그램 섹션에서 활성화할 수 있습니다.",
      "macUnknown": "Safari 설정의 확장 프로그램 섹션에서 인버트다크 확장을 활성화할 수 있습니다.",
      "macPreferences": "Safari 설정을 열려면 종료하고 열기…"
    },
    "nl": {
      "iOS": "U kunt de InvertDonker Safari-extensie inschakelen in Instellingen.",
      "macOn": "De InvertDonker-extensie is momenteel ingeschakeld. U kunt deze uitschakelen in de sectie Extensies van Safari Instellingen.",
      "macOff": "De InvertDonker-extensie is momenteel uitgeschakeld. U kunt deze inschakelen in de sectie Extensies van Safari Instellingen.",
      "macUnknown": "U kunt de InvertDonker-extensie inschakelen in de sectie Extensies van Safari Instellingen.",
      "macPreferences": "Stoppen en Safari Instellingen openen…"
    },
    "pt": {
      "iOS": "Você pode ativar a extensão do Safari do InverterEscuro nas Configurações.",
      "macOn": "A extensão do InverterEscuro está atualmente ativada. Você pode desativá-la na seção Extensões das Configurações do Safari.",
      "macOff": "A extensão do InverterEscuro está atualmente desativada. Você pode ativá-la na seção Extensões das Configurações do Safari.",
      "macUnknown": "Você pode ativar a extensão do InverterEscuro na seção Extensões das Configurações do Safari.",
      "macPreferences": "Sair e abrir as Configurações do Safari…"
    },
    "pt-PT": {
      "iOS": "Pode ativar a extensão do Safari do InverterEscuro nas Definições.",
      "macOn": "A extensão do InverterEscuro está atualmente ativada. Pode desativá-la na secção Extensões das Definições do Safari.",
      "macOff": "A extensão do InverterEscuro está atualmente desativada. Pode ativá-la na secção Extensões das Definições do Safari.",
      "macUnknown": "Pode ativar a extensão do InverterEscuro na secção Extensões das Definições do Safari.",
      "macPreferences": "Saia e abra as Definições do Safari…"
    },
    "pt-BR": {
      "iOS": "Você pode ativar a extensão do Safari do InverterEscuro nas Configurações.",
      "macOn": "A extensão do InverterEscuro está atualmente ativada. Você pode desativá-la na seção Extensões das Configurações do Safari.",
      "macOff": "A extensão do InverterEscuro está atualmente desativada. Você pode ativá-la na seção Extensões das Configurações do Safari.",
      "macUnknown": "Você pode ativar a extensão do InverterEscuro na seção Extensões das Configurações do Safari.",
      "macPreferences": "Saia e abra as Configurações do Safari…"
    },
    "th": {
      "iOS": "คุณสามารถเปิดใช้งานส่วนขยาย Safari ของ อินเวิร์ตดาร์ก ได้ในการตั้งค่า",
      "macOn": "ส่วนขยายของ อินเวิร์ตดาร์ก ปัจจุบันเปิดใช้งานอยู่ คุณสามารถปิดการใช้งานได้ในส่วนขยายของการตั้งค่า Safari",
      "macOff": "ส่วนขยายของ อินเวิร์ตดาร์ก ปัจจุบันปิดใช้งานอยู่ คุณสามารถเปิดการใช้งานได้ในส่วนขยายของการตั้งค่า Safari",
      "macUnknown": "คุณสามารถเปิดใช้งานส่วนขยายของ อินเวิร์ตดาร์ก ได้ในส่วนขยายของการตั้งค่า Safari",
      "macPreferences": "ออกและเปิดการตั้งค่า Safari…"
    },
    "tr": {
      "iOS": "TersKaranlık'nın Safari uzantısını Ayarlar'da açabilirsiniz.",
      "macOn": "TersKaranlık'nın uzantısı şu anda açık. Bunu Safari Ayarları'ndaki Uzantılar bölümünde kapatabilirsiniz.",
      "macOff": "TersKaranlık'nın uzantısı şu anda kapalı. Bunu Safari Ayarları'ndaki Uzantılar bölümünde açabilirsiniz.",
      "macUnknown": "TersKaranlık'nın uzantısını Safari Ayarları'ndaki Uzantılar bölümünde açabilirsiniz.",
      "macPreferences": "Çıkış yap ve Safari Ayarları'nı aç…"
    },
    "zh": {
      "iOS": "您可以在设置中启用 反转暗黑 的 Safari 扩展程序。",
      "macOn": "反转暗黑 的扩展程序目前已启用。您可以在 Safari 设置的扩展程序部分将其禁用。",
      "macOff": "反转暗黑 的扩展程序目前已禁用。您可以在 Safari 设置的扩展程序部分将其启用。",
      "macUnknown": "您可以在 Safari 设置的扩展程序部分启用 反转暗黑 的扩展程序。",
      "macPreferences": "退出并打开 Safari 设置…"
    },
    "zh-CN": {
      "iOS": "您可以在设置中启用 反转暗黑 的 Safari 扩展程序。",
      "macOn": "反转暗黑 的扩展程序目前已启用。您可以在 Safari 设置的扩展程序部分将其禁用。",
      "macOff": "反转暗黑 的扩展程序目前已禁用。您可以在 Safari 设置的扩展程序部分将其启用。",
      "macUnknown": "您可以在 Safari 设置的扩展程序部分启用 反转暗黑 的扩展程序。",
      "macPreferences": "退出并打开 Safari 设置…"
    },
    "zh-TW": {
      "iOS": "您可以在設定中啟用 反轉暗黑 的 Safari 擴充功能。",
      "macOn": "反轉暗黑 的擴充功能目前已啟用。您可以在 Safari 設定的擴充功能部分將其停用。",
      "macOff": "反轉暗黑 的擴充功能目前已停用。您可以在 Safari 設定的擴充功能部分將其啟用。",
      "macUnknown": "您可以在 Safari 設定的擴充功能部分啟用 反轉暗黑 的擴充功能。",
      "macPreferences": "退出並打開 Safari 設定…"
    },
    "zh-HK": {
      "iOS": "您可以在設定中啟用 反轉暗黑 的 Safari 擴展程式。",
      "macOn": "反轉暗黑 的擴展程式目前已啟用。您可以在 Safari 設定的擴展程式部分將其禁用。",
      "macOff": "反轉暗黑 的擴展程式目前已禁用。您可以在 Safari 設定的擴展程式部分將其啟用。",
      "macUnknown": "您可以在 Safari 設定的擴展程式部分啟用 反轉暗黑 的擴展程式。",
      "macPreferences": "退出並打開 Safari 設定…"
    },
    "it": {
      "iOS": "Puoi attivare l'estensione Safari di InvertiScuro nelle Impostazioni.",
      "macOn": "L'estensione di InvertiScuro è attualmente attiva. Puoi disattivarla nella sezione Estensioni delle Impostazioni di Safari.",
      "macOff": "L'estensione di InvertiScuro è attualmente disattivata. Puoi attivarla nella sezione Estensioni delle Impostazioni di Safari.",
      "macUnknown": "Puoi attivare l'estensione di InvertiScuro nella sezione Estensioni delle Impostazioni di Safari.",
      "macPreferences": "Esci e apri le Impostazioni di Safari…"
    },
    "uk": {
      "iOS": "Ви можете увімкнути розширення Safari ІнвертТемрява у Налаштуваннях.",
      "macOn": "Розширення ІнвертТемрява наразі увімкнене. Ви можете вимкнути його в розділі Розширення в Налаштуваннях Safari.",
      "macOff": "Розширення ІнвертТемрява наразі вимкнене. Ви можете увімкнути його в розділі Розширення в Налаштуваннях Safari.",
      "macUnknown": "Ви можете увімкнути розширення ІнвертТемрява у розділі Розширення в Налаштуваннях Safari.",
      "macPreferences": "Вийти та відкрити Налаштування Safari…"
    },
    "ca": {
      "iOS": "Podeu activar l’extensió de Safari de InvertFosc a Configuració.",
      "macOn": "L’extensió de InvertFosc està actualment activada. Podeu desactivar-la a la secció Extensions de les Preferències de Safari.",
      "macOff": "L’extensió de InvertFosc està actualment desactivada. Podeu activar-la a la secció Extensions de les Preferències de Safari.",
      "macUnknown": "Podeu activar l’extensió de InvertFosc a la secció Extensions de les Preferències de Safari.",
      "macPreferences": "Sortiu i obriu les Preferències de Safari…"
    },
    "el": {
      "iOS": "Μπορείτε να ενεργοποιήσετε την επέκταση Safari του ΑντίστροφοΣκοτάδι στις Ρυθμίσεις.",
      "macOn": "Η επέκταση του ΑντίστροφοΣκοτάδι είναι αυτή τη στιγμή ενεργή. Μπορείτε να την απενεργοποιήσετε στην ενότητα Επεκτάσεις στις Ρυθμίσεις Safari.",
      "macOff": "Η επέκταση του ΑντίστροφοΣκοτάδι είναι αυτή τη στιγμή απενεργοποιημένη. Μπορείτε να την ενεργοποιήσετε στην ενότητα Επεκτάσεις στις Ρυθμίσεις Safari.",
      "macUnknown": "Μπορείτε να ενεργοποιήσετε την επέκταση του ΑντίστροφοΣκοτάδι στην ενότητα Επεκτάσεις στις Ρυθμίσεις Safari.",
      "macPreferences": "Αποσυνδεθείτε και ανοίξτε τις Ρυθμίσεις Safari…"
    },
    "hr": {
      "iOS": "Možete uključiti InvertDark Safari proširenje u Postavkama.",
      "macOn": "InvertDark proširenje je trenutno uključeno. Možete ga isključiti u odjeljku Proširenja u Safari postavkama.",
      "macOff": "InvertDark proširenje je trenutno isključeno. Možete ga uključiti u odjeljku Proširenja u Safari postavkama.",
      "macUnknown": "Možete uključiti InvertDark proširenje u odjeljku Proširenja u Safari postavkama.",
      "macPreferences": "Zatvori i otvori Safari postavke…"
    },
    "sv": {
      "iOS": "Du kan aktivera Safari-tillägget för InvertMörker i Inställningar.",
      "macOn": "InvertMörker-tillägget är för närvarande aktiverat. Du kan stänga av det i avsnittet Tillägg i Safari-inställningarna.",
      "macOff": "InvertMörker-tillägget är för närvarande avaktiverat. Du kan aktivera det i avsnittet Tillägg i Safari-inställningarna.",
      "macUnknown": "Du kan aktivera InvertMörker-tillägget i avsnittet Tillägg i Safari-inställningarna.",
      "macPreferences": "Avsluta och öppna Safari-inställningarna…"
    },
    "sk": {
      "iOS": "Môžete aktivovať rozšírenie Safari pre InvertTmavý v Nastaveniach.",
      "macOn": "Rozšírenie InvertTmavý je momentálne zapnuté. Môžete ho vypnúť v sekcii Rozšírenia v Nastaveniach Safari.",
      "macOff": "Rozšírenie InvertTmavý je momentálne vypnuté. Môžete ho zapnúť v sekcii Rozšírenia v Nastaveniach Safari.",
      "macUnknown": "Môžete aktivovať rozšírenie InvertTmavý v sekcii Rozšírenia v Nastaveniach Safari.",
      "macPreferences": "Ukončiť a otvoriť Nastavenia Safari…"
    },
    "cs": {
      "iOS": "Můžete zapnout rozšíření Safari pro InvertTmavý v Nastavení.",
      "macOn": "Rozšíření InvertTmavý je aktuálně zapnuto. Můžete jej vypnout v sekci Rozšíření v Nastavení Safari.",
      "macOff": "Rozšíření InvertTmavý je aktuálně vypnuto. Můžete jej zapnout v sekci Rozšíření v Nastavení Safari.",
      "macUnknown": "Můžete zapnout rozšíření InvertTmavý v sekci Rozšíření v Nastavení Safari.",
      "macPreferences": "Ukončit a otevřít Nastavení Safari…"
    },
    "da": {
      "iOS": "Du kan aktivere Safari-udvidelsen for InvertMørk i Indstillinger.",
      "macOn": "InvertMørk-udvidelsen er i øjeblikket aktiveret. Du kan deaktivere den i afsnittet Udvidelser i Safari-Indstillinger.",
      "macOff": "InvertMørk-udvidelsen er i øjeblikket deaktiveret. Du kan aktivere den i afsnittet Udvidelser i Safari-Indstillinger.",
      "macUnknown": "Du kan aktivere InvertMørk-udvidelsen i afsnittet Udvidelser i Safari-Indstillinger.",
      "macPreferences": "Afslut og åbn Safari-Indstillinger…"
    },
    "nb": {
      "iOS": "Du kan aktivere Safari-utvidelsen for InvertMørk i Innstillinger.",
      "macOn": "InvertMørk-utvidelsen er for øyeblikket aktivert. Du kan slå den av i Utvidelser-seksjonen i Safari-innstillingene.",
      "macOff": "InvertMørk-utvidelsen er for øyeblikket deaktivert. Du kan slå den på i Utvidelser-seksjonen i Safari-innstillingene.",
      "macUnknown": "Du kan aktivere InvertMørk-utvidelsen i Utvidelser-seksjonen i Safari-innstillingene.",
      "macPreferences": "Avslutt og åpne Safari-innstillingene…"
    },
    "hu": {
      "iOS": "Az InvertSötét Safari-bővítményét az Beállításokban kapcsolhatja be.",
      "macOn": "Az InvertSötét bővítmény jelenleg be van kapcsolva. Kikapcsolhatja az Safari Beállítások Bővítmények részében.",
      "macOff": "Az InvertSötét bővítmény jelenleg ki van kapcsolva. Bekapcsolhatja az Safari Beállítások Bővítmények részében.",
      "macUnknown": "Az InvertSötét bővítményt az Safari Beállítások Bővítmények részében kapcsolhatja be.",
      "macPreferences": "Kilépés és Safari Beállítások megnyitása…"
    },
    "fi": {
      "iOS": "Voit aktivoida KäännäTummain Safari-laajennuksen Asetuksissa.",
      "macOn": "KäännäTumma-laajennus on tällä hetkellä käytössä. Voit sammuttaa sen Safari Asetusten Laajennukset-osiossa.",
      "macOff": "KäännäTumma-laajennus on tällä hetkellä pois päältä. Voit aktivoida sen Safari Asetusten Laajennukset-osiossa.",
      "macUnknown": "Voit aktivoida KäännäTumma-laajennuksen Safari Asetusten Laajennukset-osiossa.",
      "macPreferences": "Poistu ja avaa Safari Asetukset…"
    },
    "fr-CA": {
      "iOS": "Vous pouvez activer l’extension Safari de InvertSombre dans les Réglages.",
      "macOn": "L’extension InvertSombre est actuellement activée. Vous pouvez la désactiver dans la section Extensions des Réglages Safari.",
      "macOff": "L’extension InvertSombre est actuellement désactivée. Vous pouvez l’activer dans la section Extensions des Réglages Safari.",
      "macUnknown": "Vous pouvez activer l’extension InvertSombre dans la section Extensions des Réglages Safari.",
      "macPreferences": "Quitter et ouvrir les Réglages Safari…"
    },
    "vi": {
      "iOS": "Bạn có thể bật tiện ích mở rộng Safari của ĐảoNgược Tối trong Cài đặt.",
      "macOn": "Tiện ích mở rộng ĐảoNgược Tối hiện đang bật. Bạn có thể tắt nó trong phần Tiện ích mở rộng của Cài đặt Safari.",
      "macOff": "Tiện ích mở rộng ĐảoNgược Tối hiện đang tắt. Bạn có thể bật nó trong phần Tiện ích mở rộng của Cài đặt Safari.",
      "macUnknown": "Bạn có thể bật tiện ích mở rộng ĐảoNgược Tối trong phần Tiện ích mở rộng của Cài đặt Safari.",
      "macPreferences": "Thoát và mở Cài đặt Safari…"
    },
    "he": {
      "iOS": "אתה יכול להפעיל את תוסף Safari של היפוך חושך בהגדרות.",
      "macOn": "התוסף של היפוך חושך פעיל כעת. אתה יכול לכבות אותו בחלק התוספים בהגדרות Safari.",
      "macOff": "התוסף של היפוך חושך כבוי כעת. אתה יכול להפעיל אותו בחלק התוספים בהגדרות Safari.",
      "macUnknown": "אתה יכול להפעיל את תוסף היפוך חושך בחלק התוספים בהגדרות Safari.",
      "macPreferences": "סגור ופתח את הגדרות Safari…"
    },
    "pl": {
      "iOS": "Możesz włączyć rozszerzenie Safari OdwróćCiemność w Ustawieniach.",
      "macOn": "Rozszerzenie OdwróćCiemność jest obecnie włączone. Możesz je wyłączyć w sekcji Rozszerzenia w Ustawieniach Safari.",
      "macOff": "Rozszerzenie OdwróćCiemność jest obecnie wyłączone. Możesz je włączyć w sekcji Rozszerzenia w Ustawieniach Safari.",
      "macUnknown": "Możesz włączyć rozszerzenie OdwróćCiemność w sekcji Rozszerzenia w Ustawieniach Safari.",
      "macPreferences": "Zamknij i otwórz Ustawienia Safari…"
    },
    "ms": {
      "iOS": "Anda boleh mengaktifkan sambungan Safari SongsangGelap dalam Tetapan.",
      "macOn": "Sambungan SongsangGelap kini aktif. Anda boleh mematikannya di bahagian Sambungan dalam Tetapan Safari.",
      "macOff": "Sambungan SongsangGelap kini tidak aktif. Anda boleh mengaktifkannya di bahagian Sambungan dalam Tetapan Safari.",
      "macUnknown": "Anda boleh mengaktifkan sambungan SongsangGelap di bahagian Sambungan dalam Tetapan Safari.",
      "macPreferences": "Tutup dan buka Tetapan Safari…"
    },
    "ro": {
      "iOS": "Puteți activa extensia Safari InvertÎntunecat în Setări.",
      "macOn": "Extensia InvertÎntunecat este activă în prezent. Puteți să o dezactivați în secțiunea Extensii din Setările Safari.",
      "macOff": "Extensia InvertÎntunecat este dezactivată în prezent. Puteți să o activați în secțiunea Extensii din Setările Safari.",
      "macUnknown": "Puteți activa extensia InvertÎntunecat în secțiunea Extensii din Setările Safari.",
      "macPreferences": "Ieșiți și deschideți Setările Safari…"
    },
    "ru": {
      "iOS": "Вы можете включить расширение Safari ИнвертТьма в Настройках.",
      "macOn": "Расширение ИнвертТьма в настоящее время включено. Вы можете отключить его в разделе Расширения Настроек Safari.",
      "macOff": "Расширение ИнвертТьма в настоящее время отключено. Вы можете включить его в разделе Расширения Настроек Safari.",
      "macUnknown": "Вы можете включить расширение ИнвертТьма в разделе Расширения Настроек Safari.",
      "macPreferences": "Закройте и откройте Настройки Safari…"
    },
    "en-GB": {
      "iOS": "You can turn on InvertDark’s Safari extension in Settings.",
      "macOn": "InvertDark’s extension is currently on. You can turn it off in the Extensions section of Safari Settings.",
      "macOff": "InvertDark’s extension is currently off. You can turn it on in the Extensions section of Safari Settings.",
      "macUnknown": "You can turn on InvertDark’s extension in the Extensions section of Safari Settings.",
      "macPreferences": "Quit and open Safari Preferences…"
    },
    "en-AU": {
      "iOS": "You can turn on InvertDark’s Safari extension in Settings.",
      "macOn": "InvertDark’s extension is currently on. You can turn it off in the Extensions section of Safari Settings.",
      "macOff": "InvertDark’s extension is currently off. You can turn it on in the Extensions section of Safari Settings.",
      "macUnknown": "You can turn on InvertDark’s extension in the Extensions section of Safari Settings.",
      "macPreferences": "Quit and open Safari Preferences…"
    },
  };
  
  const langCode = labelStrings[window.navigator.language]
  ? window.navigator.language
  : labelStrings[window.navigator.language.substring(0, 2)]
  ? window.navigator.language.substring(0, 2)
  : 'en';
  
  document.getElementsByClassName('platform-ios')[0].innerText = labelStrings[langCode].iOS;
  
  document.body.classList.add(`platform-${platform}`);

  if (useSettingsInsteadOfPreferences) {
    document.getElementsByClassName('platform-mac state-on')[0].innerText = labelStrings[langCode].macOn;
    document.getElementsByClassName('platform-mac state-off')[0].innerText = labelStrings[langCode].macOff;
    document.getElementsByClassName('platform-mac state-unknown')[0].innerText = labelStrings[langCode].macUnknown;
    document.getElementsByClassName('platform-mac open-preferences')[0].innerText = labelStrings[langCode].macPreferences;
  }

  if (typeof enabled === "boolean") {
      document.body.classList.toggle(`state-on`, enabled);
      document.body.classList.toggle(`state-off`, !enabled);
  } else {
      document.body.classList.remove(`state-on`);
      document.body.classList.remove(`state-off`);
  }
  document.body.classList.add('fadeIn');
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

document.querySelector("button.open-preferences").addEventListener("click", openPreferences);
