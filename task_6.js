// Реалізація сортування масиву методом злиття 
function merge_Sorting (array) {

    // Робимо копію масиву, щоб не змінювати існуючий
    let sorted_array = array;

    // Сортуємо масив
    sort(sorted_array, 0, array.length - 1);

    // Повертаємо посортований масив
    return sorted_array;

}

// Допоміжна функція
function sort (A, p, q) {

    if (q - p < 1) { return -1; }

    let c = Math.floor((p + q) / 2);

    if (q - p > 1) { sort(A, p, c);
                     sort(A, c + 1, q); }

    merge(A, p, c, q);

}

// Допоміжна функція
function merge (A, p, c, q) {

    let i = p;
    let j = c + 1;
    let B = new Array();

    for (let k = p; k <= q; k++) {

        if (j > q || (i <= c && A[i] <= A[j])) { B[k] = A[i];
                                                 i++; }
        else { B[k] = A[j];
               j++; }

    }

    for (let k = p; k <= q; k++) {
        A[k] = B[k];
    }

}

let data_1 = [ 9, 2, 7, 4 ];
let data_2 = [ 6, 5, 3, 1, 8, 7, 2, 4 ];
let data_3 = [ 16, 97, -9, 54, 1009, -107, 122, 0, 69 ];

console.log(`(${data_1}) -> (${merge_Sorting(data_1)})`);
console.log(`(${data_2}) -> (${merge_Sorting(data_2)})`);
console.log(`(${data_3}) -> (${merge_Sorting(data_3)})`);

// Посилання на алгоритм у вікіпедії
// https://uk.wikipedia.org/wiki/%D0%A1%D0%BE%D1%80%D1%82%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F_%D0%B7%D0%BB%D0%B8%D1%82%D1%82%D1%8F%D0%BC