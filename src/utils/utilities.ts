/**
 * Removes the string from given index
 * @param str string to remove from
 * @param index index to remove
 */
export let removeCharAt = (str: string, index: number) => {
    var tmp = str.split(''); // convert to an array
    tmp.splice(index - 1, 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
};

/**
 * Replaces the string at given index
 * @param str string to replace from
 * @param index index for replacement
 * @param replacement string chunk to replace
 */
export let replaceAt = (str: string, index: number, replacement: string) => {
    return (
        str.substr(0, index) +
        replacement +
        str.substr(index + replacement.length)
    );
};

export let logError = (screen: string, error: any) => {
    console.log(`error in ${screen} :`, error, {response: error.response});
};

/**
 * Formats the price string
 * @param str
 * The value to be formatted
 * @param chunk
 * (OPTIONAL) Number of digits in one chunk
 * @example
 * normlaizePrice("1000000.00") = "1 000 000.00"
 */
export let normalizePrice = (str: string, chunk: number = 3) => {
    if (!str) {
        return '0';
    }
    if (typeof str !== 'string') {
        str = String(str);
    }

    //* Localization check
    if (str.indexOf('.') !== -1) {
        //* Seperate decimal and inregral parts
        let [decimalPart, integralPart] = str.split('.');

        //* Make it easy to append to the result
        let reverseDecimal = decimalPart
            .split('')
            .reverse()
            .join('');

        //* Result to store
        let result = '';
        for (let i = 0; i < reverseDecimal.length; i += chunk) {
            //* Apped three digits
            result += reverseDecimal.slice(i, i + chunk);

            //* Append seperating space only if it is not last chunk
            if (i + chunk < reverseDecimal.length) result += ' ';
        }

        //* The `.` has been removed so we add it
        return (
            result
                .split('')
                .reverse()
                .join('') +
            '.' +
            integralPart
        );
    } else {
        let reverseDecimal = str
            .split('')
            .reverse()
            .join('');

        //* Result to store
        let result = '';
        for (let i = 0; i < reverseDecimal.length; i += chunk) {
            //* Apped three digits
            result += reverseDecimal.slice(i, i + chunk);

            //* Append seperating space only if it is not last chunk
            if (i + chunk < reverseDecimal.length) result += ' ';
        }

        return result
            .split('')
            .reverse()
            .join('');
    }
};

/**
 * Get the
 * @param obj Source object
 * @param path Path to the object inner property
 * Each propert is seperated by  dot (.).
 * @example
 * getObjectProperty({a:{b:c:"dsa"}},"a.b.c")
 * @returns "dsa"
 */
export const getObjectProperty = (obj: object, path: string) => {
    if (!obj || !path) {
        return null;
    }
    let paths = path.split('.');
    let temp = obj;
    for (let key of paths) {
        if (!temp[key]) {
            return null;
        }
        temp = temp[key];
    }
    return temp;
};

/**
 * Generates filters url from giver url
 * @param data Object with keys
 */
export let normalizeFilters = (data: any) => {
    if (!data) {
        return '';
    }
    return Object.keys(data).reduce((prev, key) => {
        return `${prev + key}=${data[key] ? data[key] : ''}&`;
    }, '?');
};
