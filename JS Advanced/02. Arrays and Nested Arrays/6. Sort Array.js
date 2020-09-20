function sortArray(arr){
    const twoCriteriaSort = (curr, next) =>
    curr.length - next.length || curr.localeCompare(next);

    arr.sort(twoCriteriaSort);
    console.log(arr.join('\n'));
}

sortArray(['alpha', 'beta', 'gamma']);