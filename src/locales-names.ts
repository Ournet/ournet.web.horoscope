import { I18nFn } from "./locale";

export enum LocalesNames {
    contact = "Contact",
    international = "Internațional",
    weather = "Vremea",
    weather_in_format = "Vremea în %s",
    weather2 = "Meteo",
    share_on_format = "Trimite pe %s",
    home = "Acasă",
    news = "Știri",
    opinia = "Opinia",
    exchange = "Curs valutar",
    language_ro = "Română",
    language_ru = "Русский",
    country_md = "Moldova",
    today = "Astăzi",
    horoscope = "Horoscop",
    tomorrow = "Mâine",
    daily_horoscope = "Horoscopul zilei",
    daily_horoscope_details = "Horoscop zilnic. Horoscopul pentru astazi si maine.",
    daily_horoscope_format = "Horoscop: %s",
    daily_horoscope_details_format = "Horoscopul pentru astăzi %s.",
    weekly_horoscope = "Horoscop săptămânal",
    weekly_horoscope_details = "Horoscop săptămânal. Horoscopul pentru săptămâna curentă.",
    weekly_horoscope_format = "Horoscop săptămânal: %s",
    weekly_horoscope_details_format = "Horoscop săptămânal: %s.",
    sign_daily_title_format = "%s: Horoscopul zilei",
    sign_daily_details_format = "%s. Horoscopul zilei: %s",
    sign_weekly_title_format = "%s: Horoscop săptămânal",
    sign_weekly_details_format = "%s. Horoscopul săptămânii: %s",
    info = "Info",
    useful = "Util",
    exchange_rates = "Curs valutar",
    latest_news = "Ultimele știri",
    daily = "Zilnic",
    weekly = "Săptămânal",
    accept_notifications = "Primește notificări",
    export_horoscope = "Preluare horoscop",
    api_title = "Preluare horoscop",
    api_subtitle = "Horoscop zilnic oferit gratuit de ${project}",
    api_body = "<h3>Horoscop zilnic</h3><p>${project} oferă gratis rapoarte horoscop pentru website-uri și aplicații.</p><p>Raportele sunt oferite în format JSON la următoarea adresă web:</p><p><code>${schema}//${host}/api/reports.json?client=CLIENT&period=PERIOD</code></p><p>Unde <code>PERIOD</code> (opțional) - este data pentru care se solicită rapoartele. Pentru zi: D${currentDate}, săptămânal: W201812.</p><p>Iar <code>CLIENT</code> (obligatoriu) - este adresa site-ului sau ID-ul aplicației Dvs.</p><p>Exemplu: <code>${schema}//${host}/api/reports.json?client=${host}</code></p><h3>Condiții de utilizare</h3><p>Site-urile web se angajează să adauge link spre ${host}, iar aplicațiile vor menționa sursa.</p>",
    subscribe_to_daily_notifications = "Abonează-te la notificări zilnice",
    lucky_numbers = "Numere norocoase",
    horoscope_on_your_site = "Horoscopul pe site-ul tău",
    horoscope_on_your_site_info = "Horoscopul zilnic gratuit pe site-ul tău",
    back_color = "Culoare fundal",
    text_color = "Culoare text",
    generate = "Generează",
    preview = "Previzualizare",
    html_code = "Cod HTML",
    detailed_horoscope = "Horoscop detaliat",
    width = "Lungile",
    heigth = "Înălțime",
    icon_color = "Culoare imagine",
    notifications_subscribe_for_sign = "%s: Primește notificări zilnice",
}

export class LocalesHelper {
    static getCountryName(__: I18nFn, countryCode: string) {
        return __(`country_${countryCode}`);
    }

    static getLanguageName(__: I18nFn, languageCode: string) {
        return __(`language_${languageCode}`);
    }

    static getProjectName(__: I18nFn, project: string) {
        return __(project);
    }
}