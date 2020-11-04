function letsGetMarried() {
    let firstPromise = Promise.resolve('Yes');
    let secondPromise = Promise.resolve('Restaurant booked');
    let thirdPromise = Promise.resolve('Guests are invited');



    return Promise.all([firstPromise, secondPromise, thirdPromise]);
}



letsGetMarried()
.then((res) => {
    console.log(`she said ${res}`);
    return Promise.resolve('wedding is prepared');
})
.then((res) => {
    console.log('prepare wedding');
    console.log(res);
})



