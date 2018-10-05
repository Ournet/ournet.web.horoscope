
export function unixTime(date?: Date) {
    date = date || new Date();

    return Math.floor(date.getTime() / 1000);
}

export function startWithUpperCase(text: string) {
    if (text && text.length) {
        return text[0].toUpperCase() + text.substr(1);
    }
    return text;
}

export function isNullOrEmpty(val?: string) {
    return [null, undefined, ''].includes(val);
}

export function toBeaufort(ms: number) {
    if (ms <= 0.2) {
        return 0;
    }
    if (ms <= 1.5) {
        return 1;
    }
    if (ms <= 3.3) {
        return 2;
    }
    if (ms <= 5.4) {
        return 3;
    }
    if (ms <= 7.9) {
        return 4;
    }
    if (ms <= 10.7) {
        return 5;
    }
    if (ms <= 13.8) {
        return 6;
    }
    if (ms <= 17.1) {
        return 7;
    }
    if (ms <= 20.7) {
        return 8;
    }
    if (ms <= 24.4) {
        return 9;
    }
    if (ms <= 28.4) {
        return 10;
    }
    if (ms <= 32.6) {
        return 11;
    }
    return 12;
}
