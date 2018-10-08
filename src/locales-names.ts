import { I18nFn } from "./locale";

export enum LocalesNames {
    contact = "contact",
    international = "international",
    weather = "weather",
    weather_in_format = "weather_in_format",
    weather2 = "weather2",
    share_on_format = "share_on_format",
    home = "home",
    news = "news",
    opinia = "opinia",
    exchange = "exchange",
    language_ro = "language_ro",
    language_ru = "language_ru",
    country_md = "country_md",
    today = "today",
    horoscope = "horoscope",
    tomorrow = "tomorrow",
    daily_horoscope = "daily_horoscope",
    daily_horoscope_details = "daily_horoscope_details",
    daily_horoscope_format = "daily_horoscope_format",
    daily_horoscope_details_format = "daily_horoscope_details_format",
    weekly_horoscope = "weekly_horoscope",
    weekly_horoscope_details = "weekly_horoscope_details",
    weekly_horoscope_format = "weekly_horoscope_format",
    weekly_horoscope_details_format = "weekly_horoscope_details_format",
    sign_daily_title_format = "sign_daily_title_format",
    sign_daily_details_format = "sign_daily_details_format",
    sign_weekly_title_format = "sign_weekly_title_format",
    sign_weekly_details_format = "sign_weekly_details_format",
    info = "info",
    useful = "useful",
    exchange_rates = "exchange_rates",
    latest_news = "latest_news",
    daily = "daily",
    weekly = "weekly",
    accept_notifications = "accept_notifications",
    export_horoscope = "export_horoscope",
    api_title = "api_title",
    api_subtitle = "api_subtitle",
    api_body = "api_body",
    subscribe_to_daily_notifications = "subscribe_to_daily_notifications",
    lucky_numbers = "lucky_numbers",
    horoscope_on_your_site = "horoscope_on_your_site",
    horoscope_on_your_site_info = "horoscope_on_your_site_info",
    back_color = "back_color",
    text_color = "text_color",
    generate = "generate",
    preview = "preview",
    html_code = "html_code",
    detailed_horoscope = "detailed_horoscope",
    width = "width",
    heigth = "heigth",
    icon_color = "icon_color",
    notifications_subscribe_for_sign = "notifications_subscribe_for_sign",
    day_format = "day_format",
    date_format = "date_format",
    sign_date_format = "sign_date_format"
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
